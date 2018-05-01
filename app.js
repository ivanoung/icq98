const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const SocketIOConnection = require('./socket/socket-connection');
const ViewRouter = require('./viewRouters');
const session = require('express-session');
const bodyParser = require('body-parser');
const setupPassport = require('./authentication/passport')
const socketIOConnection = new SocketIOConnection(http);

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'supersecret'
}));
app.use(bodyParser.urlencoded());

app.use('/', new ViewRouter(setupPassport(app)).router());
socketIOConnection.router();

http.listen(8080, () => console.log("Server running at port 8080"));