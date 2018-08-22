'use strict'

import { paths } from './config'
import run from './server/controller'
import './server/timestamp'

;(async () => {
  try {
    const newDate = new Date()
    const timestamp = newDate.timestamp(newDate)

    // send each path object through 'run' and catch/log bubbled rejections.
    // Without this .catch, Promise.all would resolve at the first 'run' rejection.
    const results = await Promise.all(paths.map(pathObj =>
      run(pathObj, timestamp).catch(e => console.log(e))))

    results.forEach(result => {
      console.log('result', result)
    })

  } catch (error) {
    console.log('error', error)
  }
})()