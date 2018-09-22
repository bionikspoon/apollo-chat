import Koa from "koa";
import Router from "koa-router";

const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const responseTime = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${responseTime}`);
});

// x-response-type

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  const ms = end - start;

  ctx.set("X-Response-Time", `${ms}ms`);
});

const router = new Router();
router.get("/*", async ctx => {
  ctx.body = "Hello World";
});

app.use(router.routes());
app.listen(3000);
console.log("Server running on port 3000");
