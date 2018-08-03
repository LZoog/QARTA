'use strict'

import util from 'util'
import BlinkDiff from 'blink-diff'
// import { compress } from './compressor'

/**
 * Represents a book.
 * @param {array} screenshotPairNames -
 * @param {string} author - The author of the book.
 */
export async function makeDiff(screenshotPairNames) {
  console.log('screenshotPairNames', screenshotPairNames)
  const [ screenshotName1, screenshotName2 ] = screenshotPairNames
  const screenshotDiffName = `DIFF-${screenshotName1}-${screenshotName2}`

  const differ = new BlinkDiff({
    imageAPath: `./screenshots/${screenshotName1}.png`,
    imageBPath: `./screenshots/${screenshotName2}.png`,

    imageOutputPath: `./screenshots/${screenshotDiffName}.png`,
    // only create output when images are different
    // imageOutputLimit: BlinkDiff.RESULT_DIFFERENT,
    // thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    // threshold: 0.001 // .1% threshold
  })

  // convert callback into a promise
  const runDiffer = util.promisify(differ.run)

  try {
    return runDiffer.call(differ)
  } catch (error) {
    return Promise.reject(new Error('Failed to create screenshot diff image'))
  }

}
