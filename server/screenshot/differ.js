import BlinkDiff from 'blink-diff'

export function makeScreenshotDiff(screenshots) {
  const { screenshot1, screenshot2 } = screenshots

  const differ = new BlinkDiff({
    imageAPath: `./screenshots/${screenshot1}.png`,
    imageBPath: `./screenshots/${screenshot2}.png`,

    imageOutputPath: `./screenshots/DIFF-${screenshot1}-${screenshot2}.png`,
  })

  differ.run((error, result) => {
    if (error) {
       throw error;
    } else {
      console.log(differ.hasPassed(result.code) ? 'Passed' : 'Failed');
      console.log('Found ' + result.differences + ' differences ', screenshot1);
    }
   });
}