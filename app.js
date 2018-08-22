'use strict'

import { paths } from './config'
import run from './server/controller'
import './server/timestamp'

;(async () => {
  try {
    const newDate = new Date()
    const timestamp = newDate.timestamp(newDate)
    const results = await Promise.all(paths.map(pathObj => run(pathObj, timestamp).catch(e => e)))

    results.forEach(result => {
      console.log('result', result)
    })

  } catch (error) {
    console.log('error', error)
  }
})()