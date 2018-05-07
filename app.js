import Nightmare from 'nightmare'
import { paths, urls } from './config'
import { asyncForEach } from './server/helpers'
import './server/timestamp'


;(() => {
  const newDate = new Date()
  const timestamp = newDate.timeStamp(newDate)

  for (const pathObject of paths) {
    (async () => {
      const screenshots = await parallelScreenshots(pathObject, timestamp)

      console.log(screenshots)
    })()
  }
})()

async function parallelScreenshots(pathObject, timestamp) {
  // at present, only two urls are allowed in config
  const screenshot1 = screenshot(urls[0], pathObject, timestamp);
  const screenshot2 = screenshot(urls[1], pathObject, timestamp);

  return {
    screenshot1: await screenshot1,
    screenshot2: await screenshot2,
  }
}

async function screenshot(urlObject, pathObject, timestamp) {
  console.log('screenshot fired')
  const nightmare = Nightmare()
  const { url, name: urlName } = urlObject
  const { path, name: pathName } = pathObject
  const pageUrl = `${url}/${path}`
  const screenshotName = `${urlName}_${pathName}_${timestamp}`

  const dimensions = await nightmare.goto(pageUrl).evaluate(() => {
    const html = document.querySelector('html')
    return {
      height: html.scrollHeight + 100,
      width: html.scrollWidth,
    }
  })
  await nightmare
  .viewport(dimensions.width, dimensions.height)
  .screenshot(`./screenshots/${screenshotName}.png`)
  await nightmare
    .end(() => { console.log('screenshot finished ', screenshotName) } )

  return screenshotName
}