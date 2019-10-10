import express from 'express';
import config from '../config';

const userRoutes = connectionManager => {
  const router = express.Router();
  router.get('/', (req, res) => {
    const connections = connectionManager.getConnections();
    const keys = Object.keys(connections);

    const clients = [];
    const hearBeatInterval = (config.get('mos.heartbeatInterval') / 2) * 1000;
    keys.forEach(key => {
      const item = connections[key];
      const ipAdd = item.lowerPortClient.address;
      const now = item.lastHeartbeatTime;
      const dateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      const client = {
        ipAddress: ipAdd.substring(ipAdd.length - 14, ipAdd.length),
        id: item.mosId,
        status: item.isConnected === true ? 'Connected' : 'Not Connected',
        lastHeartbeatTime: dateTime,
      };
      clients.push(client);
    });
    res.render('pages/connectedClients', {
      clients,
      hearBeatInterval,
    });
  });
  return router;
};

module.exports.userRoutes = userRoutes;
