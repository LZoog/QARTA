import Nightmare from 'nightmare'
import { paths, urls } from './config.js'
import { asyncForEach } from './server/helpers.js'
import './server/timestamp.js'


async function parallel(urlObject1, urlObject2, pathObject, timestamp) {
  const screenshot1 = screenshot(urlObject1, pathObject, timestamp);
  const screenshot2 = screenshot(urlObject2, pathObject, timestamp);

  return {
    screenshot1: await screenshot1,
    screenshot2: await screenshot2,
  }
}

async function awaitParallel(urlObject1, urlObject2, pathObject, timestamp) {
  console.log('in test')
  const screenshots = await parallel(urlObject1, urlObject2, pathObject, timestamp)

  // blink-diff
}

;(async () => {
  const newDate = new Date()
  const timestamp = newDate.timeStamp(newDate)

  for (let pathObject of paths) {

    // at present, only TWO urls are allowed in config
    awaitParallel(urls[0], urls[1], pathObject, timestamp)
    console.log('loopdy loop')
  }
})()

async function screenshot(urlObject, pathObject, timestamp) {
  console.log('screenshot fired')
  const nightmare = Nightmare()
  const { url, name: urlName } = urlObject
  const { path, name: pathName } = pathObject
  const pageUrl = `${url}/${path}`

  // const screenshotName = `${domain.nickname}_${path.replace(/\//g, '-')}_${timeStamp}`
  const screenshotName = `${urlName}_${pathName}_${timestamp}`

  // console.log('pageUrl', pageUrl)

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