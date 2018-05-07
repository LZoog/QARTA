
import { paths, urls } from './config'
import { parallelScreenshots } from './server/screenshot'
import './server/timestamp'


;(() => {
  const newDate = new Date()
  const timestamp = newDate.timeStamp(newDate)

  for (const pathObject of paths) {
    (async () => {
      const screenshots = await parallelScreenshots(urls, pathObject, timestamp)

      console.log(screenshots)
    })()
  }
})()
