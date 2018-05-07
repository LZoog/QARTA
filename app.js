
import { paths, urls } from './config'
import { parallelScreenshots } from './server/screenshot'
import { screenshotDiff } from './server/screenshot-diff'
import './server/timestamp'

;(() => {
  const newDate = new Date()
  const timestamp = newDate.timestamp(newDate)

  for (const pathObject of paths) {
    (async () => {
      const screenshots = await parallelScreenshots(urls, pathObject, timestamp)

      screenshotDiff(screenshots)
      console.log(screenshots)
    })()
  }
})()