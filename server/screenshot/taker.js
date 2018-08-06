'use strict'

import Nightmare from 'nightmare'

/**
 * Uses Nightmare to take a screenshot of a webpage, saved as a .png.
 * @param {Object} urlObject - includes the URL and the URL name from config
 * @param {Object} pathObject - includes the path and the path name from config
 * @param {string} timestamp - from initial run
 */
export default async function takeScreenshot(urlObject, pathObject, timestamp) {
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

  const { width, height } = dimensions
  try {
    await nightmare
      .viewport(width, height)
      .screenshot(`./screenshots/${screenshotName}.png`)
    await nightmare.end(() => screenshotName)

  } catch(error) {
    return Promise.reject(new Error(`Failed to take screenshot of URL ${pageUrl} at width ${width} and height ${height}.`))
  }
}
