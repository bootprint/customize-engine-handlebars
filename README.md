# customize-engine-handlebars 

[![NPM version](https://img.shields.io/npm/v/customize-engine-handlebars.svg)](https://npmjs.com/package/customize-engine-handlebars)
[![Travis Build Status](https://travis-ci.org/bootprint/customize-engine-handlebars.svg?branch=master)](https://travis-ci.org/bootprint/customize-engine-handlebars)
[![Coverage Status](https://img.shields.io/coveralls/bootprint/customize-engine-handlebars.svg)](https://coveralls.io/r/bootprint/customize-engine-handlebars)

> Use handlebars as engine for customize


# Installation

```
npm install customize-engine-handlebars
```

## Usage

The following example demonstrates how to use this module:

<pre><code>
├── config-module.js
├── example-merge.js
├── example-partial-names.js
├── example.js
├── hb-helpers.js
├── hb-preprocessor.js
├─┬ partials/
│ └── footer.hbs
├─┬ partials2/
│ └── footer.hbs
└─┬ templates/
  ├── text1.txt.hbs
  └── text2.txt.hbs
</code></pre>

### Configuration

The following usage example has a configuration for all possible properties
of the Handlebars-engine:

```js
var customize = require('customize')
customize()
  .registerEngine('handlebars', require('customize-engine-handlebars'))
  .load(require('./config-module.js'))
  .run()
  .done(console.log)
```

This example loads its configuration from the module `config-module.js`

```js
module.exports = function (customize) {
  return customize.merge({
    handlebars: {
      // Directory containing templates
      templates: 'templates',
      // Directory containing partials
      partials: 'partials',
      // JS-file exporting Handlebars helper-functions
      helpers: 'hb-helpers.js',
      // JS-file exporting a preprocessor function
      preprocessor: 'hb-preprocessor.js',
      // Input data for Handlebars
      data: {
        name: 'nknapp',
        city: 'Darmstadt'
      }
    }
  })
}

```


*A quick note: If your are really creating a configuration-module, you should always
use `require.resolve` or `__dirname` to determine the correct path to referenced files.*

All the templates in the `templates` directory are called with the provided `data` (name and city).
Each one generates an entry in the result of the engine. The templates call a partial that is 
inserted below the main content. Helper functions from the `hb-helpers.js`-file are registered 
with Handlebars and `text2.txt.hbs` uses the `shout`-helper from `hb-helpers.js` to turn a 
string into upper-case. 

```hbs
I'm {{name}}

I'm living in {{shout city}}.

{{>footer}}
```


The example also includes a preprocessor (`hb-preprocessor.js`) that calls 
[the github API](https://developer.github.com/v3/users/#get-a-single-user)
to retrieve information about the user. 

```js
module.exports = function (data) {
  var url = 'https://api.github.com/users/' + data.name
  console.log(url)
  return {
    name: data.name,
    city: data.city,
    github: require('get-promise')('https://api.github.com/users/nknapp', {
      headers: {
        'User-Agent': 'Node'
      }
    }).get('data').then(JSON.parse)
  }
}

```


The result is injected into the data as `github` property and rendered by 
the `footer.hbs` partial.

```hbs
------
Github-Name: {{{github.name}}}
```


The output of this example is:

```
https://api.github.com/users/nknapp
{ handlebars:
   { 'text1.txt':
      'I\'m nknapp\n\nI\'m living in Darmstadt.\n\n------\nGithub-Name: Nils Knappmeier',
     'text2.txt':
      'I\'m nknapp\n\nI\'m living in DARMSTADT.\n\n------\nGithub-Name: Nils Knappmeier' } }
```


### Customizing configurations

We can use the mechanism of [customize](https://npmjs.com/package/customize) to adapt the configuration.
In the following example, we replace the `footer.hbs`-partial by a different version.
We do this by specifying a new partial directory. Partials with the same name as in 
the previous directory will overwrite the old one.

```js
var customize = require('customize')
customize()
  .registerEngine('handlebars', require('customize-engine-handlebars'))
  .load(require('./config-module.js'))
  .merge({
    handlebars: {
      partials: 'partials2'
    }
  })
  .run()
  .done(console.log)
```

The new `footer.hbs` writes only the current temperature, instead of the weather description

```hbs
------
Blog: {{{github.blog}}}
```


The output of this example is

```
https://api.github.com/users/nknapp
{ handlebars:
   { 'text2.txt':
      'I\'m nknapp\n\nI\'m living in DARMSTADT.\n\n------\nBlog: https://blog.knappi.org',
     'text1.txt':
      'I\'m nknapp\n\nI\'m living in Darmstadt.\n\n------\nBlog: https://blog.knappi.org' } }
```

In a similar fashion, we could replace other parts of the configuration, like templates, helpers
and the pre-processor. If we would provide a new preprocessor, it could call the old one,
by calling `this.parent(args)`

### Which partial generates what?

When we want to overriding parts of the output, we are looking for the correct partial to do so. 
For this purpose, the engine allows to specify a "wrapper function" for partials. This function
is called with the contents and the name of a partial and returns the new content. Programs like
`Thought` can optionally include the partial names into the output to show the user which partial
to override in order to modify a given part of the output.


```js
var customize = require('customize')
customize()
  .registerEngine('handlebars', require('customize-engine-handlebars'))
  .load(require('./config-module.js'))
  .merge({
    handlebars: {
      partials: 'partials2',
      partialWrapper: function (contents, name) {
        return '[BEGIN ' + name + ']\n' + contents + '[END ' + name + ']'
      }
    }
  })
  .run()
  .done(console.log)
```

```
https://api.github.com/users/nknapp
{ handlebars:
   { 'text1.txt':
      'I\'m nknapp\n\nI\'m living in Darmstadt.\n\n[BEGIN footer]\n------\nBlog: https://blog.knappi.org[END footer]',
     'text2.txt':
      'I\'m nknapp\n\nI\'m living in DARMSTADT.\n\n[BEGIN footer]\n------\nBlog: https://blog.knappi.org[END footer]' } }
```

### Accessing engine and configuration helpers

The configuration and the engine itself is passed as additional parameter into each helper call:

```
module.exports = {
    function(value, options, customizeConfig) {
        console.log("handlebars", custOptions.engine)
        console.log("customizeConfig", custOptions.config)
    }
}
```

### Asynchronous helpers

The `customize-engine-handlebars` uses the [promised-handlebars](https://npmjs.com/package/promised-handlebars) package as wrapper around Handlebars.
It allows helpers to return promises instead of real values.






# License

`customize-engine-handlebars` is published under the MIT-license.

See [LICENSE.md](LICENSE.md) for details.


# Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
# Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).