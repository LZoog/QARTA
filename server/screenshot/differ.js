'use strict'

import util from 'util'
import BlinkDiff from 'blink-diff'

/**
 * Creates a new image showcasing any differences between two images.
 * @param {Array} screenshotBufferObjectArray array of 2 buffer objects w/ the buffer & screenshot name
 * @return {message} result of screenshot comparison
 */
export default async function makeDiff(screenshotBufferObjectArray) {
  const [ screenshot1, screenshot2 ] = screenshotBufferObjectArray
  const screenshotDiffName = `DIFF-${screenshot1.screenshotName}-${screenshot2.screenshotName}`

  const differ = new BlinkDiff({
    imageA: screenshot1.buffer,
    imageB: screenshot2.buffer,
    imageOutputPath: `./screenshots/${screenshotDiffName}.jpg`,
    // only create output when images are different
    // imageOutputLimit: BlinkDiff.RESULT_DIFFERENT,
    // thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    // threshold: 0.001 // .1% threshold
  })

  // convert callback into a promise
  const runDiffer = util.promisify(differ.run)

  try {
    const result = await runDiffer.call(differ)

    // We will want to account for when an image diff is not necessary.
    const message = differ.hasPassed(result.code) ? 'Passed' : 'Failed - differences between screenshots were found.'
    // eslint-disable-next-line
    console.log(`${screenshotDiffName} -- ${message}`)
    
    // if (differ.hasPassed(result.code)) {
    //   console.log('Passed!')
    //   return
    // } else {
    //   return screenshotDiffName
    // }
    return screenshotDiffName
  } catch (error) {
    return Promise.reject(Error('Failed to run screenshot pair through the differ.'))
  }

}
