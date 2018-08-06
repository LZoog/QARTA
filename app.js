'use strict'

import { paths } from './config'
import run from './server/controller'
import './server/timestamp'

;(async () => {
  const newDate = new Date()
  const timestamp = newDate.timestamp(newDate)

  // console.log('paths', paths)
  let results
  try {
    results = await Promise.all(paths.map(pathObj => run(pathObj, timestamp).catch(e => e)))
  } catch (error) {
    console.log('error', error)
  }

  results.forEach(result => {
    console.log('result', result)
  })
})()