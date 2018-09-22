import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import path from 'path'

const app = new Koa()

// logger

app.use(async (ctx, next) => {
  await next()
  const responseTime = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${responseTime}`)
})

// x-response-type

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  const ms = end - start

  ctx.set('X-Response-Time', `${ms}ms`)
})

const router = new Router()
router.get(
  '/*',
  serve(path.resolve(__dirname, '../../public'), {
    maxage: 30 * 100 * 60,
  })
)
// router.use(express.static(
//   path.resolve(__dirname, '..', 'build'),
//   { maxAge: '30d' },
// ));
// router.get('/*', async ctx => {
//   ctx.body = 'Hello World'
// })

app.use(router.routes())
app.listen(4000)
console.log('Server running on port 4000')
