'use strict'

import { paths } from './config'
import { run } from './server/controller'
import './server/timestamp'

;(async () => {
  const newDate = new Date()
  const timestamp = newDate.timestamp(newDate)

  console.log('paths', paths)
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

// async function run(pathObj, timestamp) {
//   try {
//     /**
//     * currently, comparison to 2 (and only 2) URLs is allowed. When
//     * functionality is extended, so should the `urls` usage here
//     */
//     const screenshotPairNames = await Promise.all([
//       imageHandler('screenshot', urls[0], pathObj, timestamp),
//       imageHandler('screenshot', urls[1], pathObj, timestamp)
//     ])

//     imageHandler('differ', screenshotPairNames)

//     // const screenshotDiff = await makeAndCompressScreenshotDiff(screenshotPairNames)

//     return 'success'
//   } catch (error) {
//     return Promise.reject(error)
//   }
// }

// const controls = {
//   'screenshot': args => compress(await takeScreenshot(args)),
//   'differ': screenshotPairNames => compress(await makeDiff(screenshotPairNames))
// }

// async function imageHandler(action, ...args) {
//   for (const control in controls) {
//     if (action === control) {
//       controls[control](args)
//       break;
//     }
//   }
// }