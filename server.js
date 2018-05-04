import Nightmare from 'nightmare'
import { paths, urls } from './config.js'
import './timestamp.js'

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

;(async () => {
  const newDate = new Date()
  const timestamp = newDate.timeStamp(newDate)

  await asyncForEach(paths, async (pathObject) => {
    console.log('in first forEach')
    await asyncForEach(urls, async (urlObject) => {
      try {
        await screenshot(urlObject, pathObject, timestamp)
      } catch(error) {
        console.log(error)
      }
    })
    console.log('after looping through domains')
    // this is where we want to use blink-diff
  })
  console.log('after looping through paths - finished')
})()

async function screenshot(urlObject, pathObject, timestamp) {
  const nightmare = Nightmare()
  const { url, name: urlName } = urlObject
  const { path, name: pathName } = pathObject
  const pageUrl = `${url}/${path}`

  // const screenshotName = `${domain.nickname}_${path.replace(/\//g, '-')}_${timeStamp}`
  const screenshotName = `${urlName}_${pathName}_${timestamp}`

  console.log('pageUrl', pageUrl)

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
    .end(() => console.log('done'))
}