// Reads environmental variables with overrides from .env. Should be placed as early as possible.
import {} from 'dotenv/config';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import logger from './config/winston';
import indexRouter from './routes/index';
import apisRouter from './routes/api';
import userRouter from './routes/client';
import connectionManager from './mos/connectionManager/connectionManager';
import dinaConnectionManager from './dina/dinaConnectionManager';
import config from './config';

// Log initial messages from config initialization.
config.logger.flush(msg=>logger.log(msg));


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan(config.get('log.morganFormat'), { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));
app.use(compression());
app.use(cors());



const mosConnectionManager = connectionManager();
mosConnectionManager.init(config.get('mos.ncsID'), config.get('mos.lowerPort'));



app.use('/connected-clients', userRouter.userRoutes(mosConnectionManager));
app.use('/api', apisRouter);
app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});



dinaConnectionManager(config.get('dina.webSocketEndPoint')).init();

// error handler
app.use((err, req, res) => {
  logger.error(`Application error: ${err}`);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = config.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
