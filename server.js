import Nightmare from 'nightmare'
const nightmare = Nightmare()

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

Date.prototype.today = function () {
  return this.getFullYear() +"-"+ (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"-"+ ((this.getDate() < 10)?"0":"") + this.getDate()
}

Date.prototype.timeNow = function () {
  return ((this.getHours() < 10)?"0":"") + this.getHours() +"-"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +"-"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

const start = async () => {
  await asyncForEach(paths, async (pathObject) => {
    console.log('in first forEach')
    await asyncForEach(urls, async (urlObject) => {
      try {
        await screenshot(urlObject, pathObject)
      } catch(error) {
        console.log('ERRORRRR')
      }
    })
    console.log('after looping through domains')
    // this is where we want to use blink-diff
  })
  console.log('after looping through paths - finished')
}

start()

async function screenshot(urlObject, pathObject) {
  const { url, name: urlName } = urlObject
  const { path, name: pathName } = pathObject

  const nightmare = Nightmare()
  const pageUrl = `${url}/${path}`
  const newDate = new Date()
  const timeStamp = `${newDate.today()}@${newDate.timeNow()}`

  // const screenshotName = `${domain.nickname}_${path.replace(/\//g, '-')}_${timeStamp}`
  const screenshotName = `${urlName}_${pathName}_${timeStamp}`

  console.log('pageUrl', pageUrl)

  const dimensions = await nightmare.goto(pageUrl).evaluate(() => {
    const html = document.querySelector('html')
    return {
      height: html.scrollHeight + 100,
      width: html.scrollWidth,
    }
  })
  await nightmare
    .viewport(dimensions.width, dimensions.height)
    .screenshot(`./screenshots/${screenshotName}.png`)
  await nightmare
    .end(() => console.log('done'))
}