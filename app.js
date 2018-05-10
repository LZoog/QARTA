'use strict'

import { paths, urls } from './config'
import { takeScreenshotPair } from './server/screenshot/taker'
import { makeScreenshotDiff } from './server/screenshot/differ'
import { compress } from './server/screenshot/compressor'
import './server/timestamp'

;(() => {
  const newDate = new Date()
  const timestamp = newDate.timestamp(newDate)

  for (const pathObject of paths) {
    (async () => {
      const screenshots = await takeScreenshotPair(urls, pathObject, timestamp)

      compress(`./screenshots/${screenshots.screenshot1}.png`)

      // makeScreenshotDiff(screenshots)
      // if screenshotDiffer creates an image, run through image optim

      console.log(screenshots)
    })()
  }
})()
