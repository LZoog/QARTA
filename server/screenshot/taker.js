'use strict'

import Nightmare from 'nightmare'
import Jimp from 'jimp'

/**
 * Uses Nightmare to take a screenshot of a webpage, saved as a .png.
 * @param {Object} urlObject the URL object from config including the URL and URL name
 * @param {Object} pathObject the path object from config including the path and path name
 * @param {string} timestamp created on program start
 * @return {object} screenshot buffer object {buffer: buffer, screenshotName: string}
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
    const buffer = await nightmare
      .viewport(width, height)
      .screenshot()
      .end()
      .then(buffer => 
        Jimp.read(buffer)
          .then(image => image.scale(.33).getBufferAsync(Jimp.MIME_PNG)))
    
    // optionally save all of the screens as jpgs
    //  Jimp.read(buffer).then( image =>  image.writeAsync(`./screenshots/${screenshotName}.jpg`))
    return { buffer: buffer, screenshotName: screenshotName } 

  } catch(error) {
    return Promise.reject(new Error(`Failed to take screenshot of URL ${pageUrl} at width ${width} and height ${height}.`))
  }
}
