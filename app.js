'use strict'

import {paths, parallel_limit} from './config'
import run from './server/controller'
import './server/timestamp'
import eachLimit from 'async/eachLimit'

(()=> {
  const newDate = new Date()
  const timestamp = newDate.timestamp(newDate)

  eachLimit(paths, parallel_limit, (path, done) => {
    run(path, timestamp).then(() => {
      done()
    })
  })
})()
