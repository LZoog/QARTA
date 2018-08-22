
import { urls } from '../config'
import takeScreenshot from './screenshot/taker'
import makeDiff from './screenshot/differ'
import compress from './screenshot/compressor'

const controls = {
  'screenshot': async(...args) => {
    try {
      // convert to JPG before compression?
      return takeScreenshot(...args)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  'differ': async screenshotPairNames => {
    try {
      // convert to JPG before compression?
      return makeDiff(screenshotPairNames)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

/**
 * Matches an action inside of 'controls', executes the corresponding
 * function to generate the image, and returns the compressed image.
 * @param {string} action the name of the action in 'controls' to be taken
 * @param {...object} args arguments to be sent to handling function in 'controls'
 * @return {string} screenshotName from 'compress'
 */
async function processImage(action, ...args) {
  try {
    for (const control in controls) {
      if (action === control) return compress(await controls[control](...args))
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Take screenshots in parallel and then once finished, run them through the differ.
 * @param {object} pathObj the path object from config including the path and path name
 * @param {string} timestamp created on program start
 * @return {string} screenshotName from 'compress'
 */
export default async function run(pathObj, timestamp) {
  try {
    /**
    * currently, comparison to 2 (and only 2) URLs is allowed. When
    * functionality is extended, so should the `urls` usage here
    */
    const screenshotPairNames = await Promise.all([
      processImage('screenshot', urls[0], pathObj, timestamp),
      processImage('screenshot', urls[1], pathObj, timestamp)
    ])
    return processImage('differ', screenshotPairNames)

  } catch (error) {
    return Promise.reject(error)
  }
}
