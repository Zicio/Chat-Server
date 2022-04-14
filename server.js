const data = require('./data');

const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const router = new Router();
const { v4: uuidv4 } = require('uuid');
const WS = require('ws');

const app = new Koa();

const options = {
  origin: '*'
};
app.use(cors(options));

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true
}));

router.post('/login', async ctx => {
  console.log(data.users);
  for (const user of data.users) {
    if (ctx.request.body.nickname === user.nickname && ctx.request.body.password === user.password) {
      ctx.response.body = data.messages;
      ctx.response.status = 200;
      console.log(ctx.response.body);
      return;
    }
  }
  ctx.response.body = 'Неправильный никнейм/пароль!';
  ctx.response.status = 400;
  console.log(ctx.response.body);
});

app.use(router.routes()).use(router.allowedMethods());
const port = process.env.PORT || 7000;
const server = http.createServer(app.callback());
// const wsServer = new WS.Server({ server });

// wsServer.on('connection', ws => {
//   ws.on('message', msg => requestHandler(msg, ws));
//   console.log('OPEN');
//   ws.on('close', () => {
//     const index = sockets.indexOf(ws);
//     console.log(index);
//     sockets.splice(index, 1);
//     const userOffline = users[index];
//     users.splice(index, 1);
//     console.log(userOffline);
//     [...wsServer.clients]
//       .filter(o => o.readyState === WS.OPEN)
//       .forEach(o => o.send(JSON.stringify(userOffline)));
//   });
// });

server.listen(port);
