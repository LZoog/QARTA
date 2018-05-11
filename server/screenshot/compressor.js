import imagemin from 'imagemin'
import optipng from 'imagemin-optipng'

export async function compress(screenshotName) {
  // console.log('before screenshot')
  // console.log('screenshot', screenshot)
  // const { name } = screenshot
  console.log('in compress -> screenshot', screenshotName)
  try {
    await imagemin([`./screenshots/${screenshotName}.png`], `screenshots-opt`, {use: [optipng()]})
  } catch(error) { throw error }
  console.log('finished compressing')

  return screenshotName
}