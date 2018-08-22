'use strict'

import util from 'util'
import BlinkDiff from 'blink-diff'

/**
 * Creates a new image showcasing any differences between two images.
 * @param {Array} screenshotPairNames contains the names of two images for comparison
 * @return {message} result of screenshot comparison
 */
export default async function makeDiff(screenshotPairNames) {
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
    const result = await runDiffer.call(differ)

    // We will want to account for when an image diff is not necessary.

    // const message = differ.hasPassed(result.code) ?
    //   'Passed' : 'Failed - differences between screenshots were found.'

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
