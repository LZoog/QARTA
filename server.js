import Nightmare from 'nightmare'
const nightmare = Nightmare()

takeScreenshot().catch(console.error)

async function takeScreenshot() {
  const nightmare = Nightmare()

  const dimensions = await nightmare.goto('').evaluate(() => {
    const html = document.querySelector('html')
    return {
      height: html.scrollHeight + 100,
      width: html.scrollWidth
    }
  })
  await nightmare
    .viewport(dimensions.width, dimensions.height)
    .screenshot('./test.png')
  await nightmare
    .end(() => console.log('done'))
}