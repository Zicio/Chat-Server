const users = require('./data');

const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const router = new Router();
const { v4: uuidv4 } = require('uuid');

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
  for (const user of users) {
    if (ctx.request.body.nickname === user.nickname && ctx.request.body.password === user.password) {
      ctx.response.body = true;
      ctx.response.status = 200;
      console.log(ctx.response.body);
      return;
    }
  }
  ctx.response.body = false;
  ctx.response.status = 200;
  console.log(ctx.response.body);
});

app.use(router.routes()).use(router.allowedMethods());
const port = process.env.PORT || 7000;
const server = http.createServer(app.callback());

server.listen(port);
