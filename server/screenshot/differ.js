import util from 'util'
import BlinkDiff from 'blink-diff'
import { compress } from './compressor'

// const diff = util.promisify()

export async function makeAndCompressScreenshotDiff(screenshots) {
  const screenshotDiffName = await makeScreenshotDiff(screenshots)
  console.log('screenshotDiffName in makeAndCompressScreenshotDiff', )
  if (screenshotDiffName) return compress(screenshotDiffName)
  return false
}

async function makeScreenshotDiff(screenshots) {
  const { screenshot1, screenshot2 } = screenshots

  console.log('in makeScreenshotDiff')

  const differ = new BlinkDiff({
    imageAPath: `./screenshots/${screenshot1}.png`,
    imageBPath: `./screenshots/${screenshot2}.png`,

    imageOutputPath: `./screenshots/DIFF-${screenshot1}-${screenshot2}.png`,
    // only create output when images are different
    // imageOutputLimit: BlinkDiff.RESULT_DIFFERENT,
    // thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    // threshold: 0.001 // .1% threshold
  })

  const runDiffer = util.promisify(differ.run)
  console.log('before setting result')
  const result = await runDiffer.call(differ)
  console.log('ran through differ, result -> ', result)

  // if (!result.code) {
    console.log('returning name')
    return `DIFF-${screenshot1}-${screenshot2}`
  // }
  return false

  // differ.run((error, result) => {
  //   console.log('Ran through differ')
  //   if (error) { throw error }

  //   console.log(differ.hasPassed(result.code) ? 'Passed' : 'Failed')
  //   console.log('Found ' + result.differences + ' differences ', screenshot1)

  //   // if a difference was found, compress the image
  //   if (!differ.hasPassed(result.code)) {
  //     return `./screenshots/DIFF-${screenshot1}-${screenshot2}.png`
  //   }
  //   return false
  // })
}

// async function runDiffer() {

// }