import moment from 'moment'

import 'moment/locale/zh-cn'

import 'moment-timezone'

export default (ctx, inject) => {
  ctx.$moment = moment
  inject('moment', moment)
}
