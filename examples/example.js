var customize = require('customize')
customize()
  .registerEngine('handlebars', require('../'))
  .load(require('./config-module.js'))
  .run()
  .then(console.log)
