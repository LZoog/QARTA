import imagemin from 'imagemin'
import optipng from 'imagemin-optipng'

export async function compress(screenshotName) {
  console.log('in compress -> screenshot', screenshotName)
  await imagemin([`./screenshots/${screenshotName}.png`], `screenshots-opt`, {use: [optipng()]})
  console.log('finished compressing')

  return screenshotName
}