
'use strict';

import Nightmare from 'nightmare'
import { compress } from './compressor'

export async function takeAndCompressScreenshot(urlObject, pathObject, timestamp) {
  try {
    const screenshotName = await screenshot(urlObject, pathObject, timestamp)
    return compress(screenshotName)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function screenshot(urlObject, pathObject, timestamp) {
  const nightmare = Nightmare()
  const { url, name: urlName } = urlObject
  const { path, name: pathName } = pathObject
  const pageUrl = `${url}/${path}`
  const screenshotName = `${urlName}_${pathName}_${timestamp}`

  let dimensions
  try {
    dimensions = await nightmare.goto(pageUrl).evaluate(() => {
      const html = document.querySelector('html')
      return {
        height: html.scrollHeight + 100,
        width: html.scrollWidth,
      }
    })
  } catch (error) {
    return Promise.reject(new Error(`Failed to navigate to the given URL. Please ensure this URL is correct and that you have access in a browser: \n${pageUrl} `))
  }

  try {
    const { width, height } = dimensions

    await nightmare
      .viewport(width, height)
      .screenshot(`./screenshots/${screenshotName}.png`)
    await nightmare
      .end(() => console.log('screenshot taken: ', screenshotName))
  } catch(error) {
    return Promise.reject(new Error(`Failed to take screenshot of URL ${pageUrl} at width ${width} and height ${height}.`))
  }

  return screenshotName
}
