import * as Router from 'koa-router'

export default (router: Router): Router => {
  router.prefix('/api')

  router.get('/hello', async ctx => {
    ctx.body = 'hello'
  })

  return router
}
