import imagemin from 'imagemin'
import optipng from 'imagemin-optipng'

export function compress(imagePath) {
  // from documentation

  imagemin([imagePath], 'screenshots-opt/', {use: [optipng()]}).then(() => {
    console.log('Images optimized');
  });
}