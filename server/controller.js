
import { urls } from '../config'
import takeScreenshot from './screenshot/taker'
import makeDiff from './screenshot/differ'
import compress from './screenshot/compressor'

const controls = {
  'screenshot': async args => {
    try {
      // console.log('args in screenshot', args)
      // convert to JPG before compression?
      return compress(await takeScreenshot(args))
    } catch (error) {
      return Promise.reject(error)
    }
  },
  'differ': async screenshotPairNames => {
    try {
      // convert to JPG before compression?
      return compress(await makeDiff(screenshotPairNames))
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

async function imageHandler(action, ...args) {

  // console.log('args', ...args)
  for (const control in controls) {
    // console.log('control', control)
    if (action === control) {
      // console.log()
      controls[control](...args)
      break
    }
  }
}

export default async function run(pathObj, timestamp) {
  try {
    /**
    * currently, comparison to 2 (and only 2) URLs is allowed. When
    * functionality is extended, so should the `urls` usage here
    */
    const screenshotPairNames = await Promise.all([
      imageHandler('screenshot', urls[0], pathObj, timestamp),
      imageHandler('screenshot', urls[1], pathObj, timestamp)
    ])
    return imageHandler('differ', screenshotPairNames)

  } catch (error) {
    return Promise.reject(error)
  }
}
