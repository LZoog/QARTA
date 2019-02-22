
/* The paths to test on the given base urls */
export const paths = [ 
  {
    path: 'path/to/my/page/index.html',
    name: 'my-page' 
  },
  {
    path: 'path/to/my/other/page/index.html',
    name: 'my-other-page'
  } 
]

/* The base urls for each path to test on */
export const urls = [ 
  {
    name: 'qa',
    url: 'http://qa.example.com'
  }, 
  {
    name: 'prod',
    url: 'http://example.com'
  } 
]

/* The number of parallel tasks that can be run at any time */
export const parallel_limit = require('os').cpus().length - 1