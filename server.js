import webshot from 'webshot'

webshot('google.com', 'google.png', err => {
  // screenshot now saved to google.png
})