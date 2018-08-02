'use strict';

import { paths, urls } from './config'
import { takeScreenshotPair } from './server/screenshot/taker'
import { makeScreenshotDiff } from './server/screenshot/differ'
import './server/timestamp';

(() => {
  const newDate = new Date()
  const timestamp = newDate.timestamp(newDate)

  for (const pathObject of paths) {
    (async () => {
      const screenshots = await takeScreenshotPair(urls, pathObject, timestamp)

      makeScreenshotDiff(screenshots)
      // if screenshotDiffer creates an image, run through image optim

      console.log(screenshots)
    })()
  }
})()
