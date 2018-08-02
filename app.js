'use strict';

import { paths, urls } from './config'
import { takeAndCompressScreenshot } from './server/screenshot/taker'
import { makeAndCompressScreenshotDiff } from './server/screenshot/differ'
import './server/timestamp'

;(async () => {
  const newDate = new Date()
  const timestamp = newDate.timestamp(newDate)

  const results = await Promise.all(paths.map(pathObj => run(pathObj, timestamp).catch(e => e)))

  results.forEach(result => {
    console.log('result', result)
  })
})()

async function run(pathObj, timestamp) {
  try {
    const [screenshot1, screenshot2] = await Promise.all([
      takeAndCompressScreenshot(urls[0], pathObj, timestamp),
      takeAndCompressScreenshot(urls[1], pathObj, timestamp)
    ])
    const screenshotDiff = await makeAndCompressScreenshotDiff(screenshot1, screenshot2)

    return 'success'
  } catch (error) {
    return Promise.reject(error)
  }
}