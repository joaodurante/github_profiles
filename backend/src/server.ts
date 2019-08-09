import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as http from 'http';
import { routes } from './routes';
import { env  } from './common/env';
import errorHandler from './common/error.handler';
import CustomRequest from './common/CustomRequest';

const app = express();
const server = new http.Server(app);
const io = require('socket.io')(server);
const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
});

mongoose.connect(env.db.uri, env.db.options);

app.use((req: CustomRequest, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

server.listen(env.server.port);