'use strict'

import Nightmare from 'nightmare'

/**
 * Uses Nightmare to take a screenshot of a webpage, saved as a .png.
 * @param {Object} urlObject the URL object from config including the URL and URL name
 * @param {Object} pathObject the path object from config including the path and path name
 * @param {string} timestamp created on program start
 * @return {string} screenshotName
 */
export default async function takeScreenshot(urlObject, pathObject, timestamp) {
  let nightmare, pageUrl, screenshotName, dimensions

  try {
    nightmare = Nightmare()
    const { url, name: urlName } = urlObject
    const { path, name: pathName } = pathObject
    pageUrl = `${url}/${path}`
    screenshotName = `${urlName}_${pathName}_${timestamp}`

    dimensions = await nightmare.goto(pageUrl).evaluate(() => {
      const html = document.querySelector('html')
      return {
        height: html.scrollHeight + 100,
        width: html.scrollWidth,
      }
    })
  } catch (error) {
    return Promise.reject(new Error(`Failed to navigate to the given URL. Please ensure this URL is correct and that you have access in a browser:\n ${pageUrl}`))
  }

  const { width, height } = dimensions
  try {
    await nightmare
      .viewport(width, height)
      .screenshot(`./screenshots/${screenshotName}.png`)
    return nightmare.end(() => screenshotName)

  } catch(error) {
    return Promise.reject(new Error(`Failed to take screenshot of URL ${pageUrl} at width ${width} and height ${height}.`))
  }
}
