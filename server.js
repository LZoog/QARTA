import Nightmare from 'nightmare'
const nightmare = Nightmare()

nightmare
  .goto('')
  .evaluate(() => {
    const html = document.querySelector('html')
    return {
      height: html.scrollHeight + 100,
      width: html.scrollWidth
    }
  })
  .then(dimensions => nightmare
    .viewport(dimensions.width, dimensions.height)
    .screenshot('./test.png')
  )
  .then(() => {
    nightmare.end(() => {
      console.log('done')
    })
  })