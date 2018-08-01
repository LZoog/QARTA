import util from 'util'
import BlinkDiff from 'blink-diff'
import { compress } from './compressor'

export async function makeAndCompressScreenshotDiff(screenshot1, screenshot2) {
  const screenshotDiffName = `DIFF-${screenshot1}-${screenshot2}`

  const differ = new BlinkDiff({
    imageAPath: `./screenshots/${screenshot1}.png`,
    imageBPath: `./screenshots/${screenshot2}.png`,

    imageOutputPath: `./screenshots/${screenshotDiffName}.png`,
    // only create output when images are different
    // imageOutputLimit: BlinkDiff.RESULT_DIFFERENT,
    // thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    // threshold: 0.001 // .1% threshold
  })

  // convert callback into a promise
  const runDiffer = util.promisify(differ.run)

  try {
    await runDiffer.call(differ)
  } catch (error) {
    return Promise.reject(new Error('Failed to create screenshot diff image'))
  }

  return compress(screenshotDiffName)
}