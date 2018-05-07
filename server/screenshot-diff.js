import BlinkDiff from 'blink-diff'

export function screenshotDiff(screenshots) {
  const { screenshot1, screenshot2 } = screenshots

  const diff = new BlinkDiff({
    imageAPath: `./screenshots/${screenshot1}.png`,
    imageBPath: `./screenshots/${screenshot2}.png`,

    imageOutputPath: `./screenshots/DIFF-${screenshot1}-${screenshot2}.png`,
  })

  diff.run(function (error, result) {
    if (error) {
       throw error;
    } else {
      console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
      console.log('Found ' + result.differences + ' differences ', screenshot1);
    }
   });
}