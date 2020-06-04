const middleware = {}

middleware['auth'] = require('../client/middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['verify'] = require('../client/middleware/verify.js')
middleware['verify'] = middleware['verify'].default || middleware['verify']

export default middleware
