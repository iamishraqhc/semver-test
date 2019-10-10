import express from 'express';
import createError from 'http-errors';

const router = express.Router();

router.post('/rundowns', (req, res) => {
  res.send({
    status: 'OK',
    statusCode: 201,
  });
});

// handles invalid route
router.use('*', (req, res) => {
  const err = new createError.NotFound(`requested path ${req.baseUrl} not found`);
  res.status(err.status).send({
    status: err.status,
    message: err.message,
  });
});

module.exports = router;
