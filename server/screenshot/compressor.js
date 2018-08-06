'use strict'

import imagemin from 'imagemin'
import optipng from 'imagemin-optipng'

export default async function compress(screenshotName) {
  try {
    await imagemin([`./screenshots/${screenshotName}.png`], 'screenshots-opt', {use: [optipng()]})
  } catch (error) {
    return Promise.reject(new Error(`Could not compress the following file: ./screenshots/${screenshotName}.png`))
  }
  return screenshotName
}
