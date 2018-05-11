'use strict'

import { paths, urls } from './config'
import { takeAndCompressScreenshotPair } from './server/screenshot/taker'
import { makeAndCompressScreenshotDiff } from './server/screenshot/differ'
import './server/timestamp'

// this is temporary until errors are better handled
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

;(() => {
  const newDate = new Date()
  const timestamp = newDate.timestamp(newDate)

  for (const pathObject of paths) {
    (async () => {
      const screenshots = await takeAndCompressScreenshotPair(urls, pathObject, timestamp)
      const screenshotDiff = await makeAndCompressScreenshotDiff(screenshots)

      console.log('screenshotDiff in app', screenshotDiff)
    })()
  }
})()
