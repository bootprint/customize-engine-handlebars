# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

<a name="current-release"></a>
# Version 2.2.0-alpha.3 (Fri, 07 Apr 2017 07:03:09 GMT)

* [7842c50](https://github.com/bootprint/customize-engine-handlebars/commit/7842c50) Fix: Make __customize_target_file__-property non-enumerable - Nils Knappmeier

# Version 2.0.0-alpha.2 (Wed, 05 Apr 2017 21:27:20 GMT)

* [80cf788](https://github.com/bootprint/customize-engine-handlebars/commit/80cf788) Pass name of the targetFile to each helper - Nils Knappmeier

# Version 2.0.0-alpha.1 (Fri, 24 Mar 2017 23:59:41 GMT)

* [1532ef6](https://github.com/bootprint/customize-engine-handlebars/commit/1532ef6) Remove dependency to lodash (reduce size) - Nils Knappmeier

# Version 2.0.0-alpha.0 (Wed, 15 Mar 2017 21:09:52 GMT)

* [f7ce66d](https://github.com/bootprint/customize-engine-handlebars/commit/f7ce66d) BREAKING: Support only node 6 and 7. Updated CI config - Nils Knappmeier
* [f8e1559](https://github.com/bootprint/customize-engine-handlebars/commit/f8e1559) Update depedency versions - Nils Knappmeier
* [3a76089](https://github.com/bootprint/customize-engine-handlebars/commit/3a76089) Add tests to increase coverage - Nils Knappmeier
* [ff8b107](https://github.com/bootprint/customize-engine-handlebars/commit/ff8b107) Add support for source-locators - Nils Knappmeier

# Version 1.0.1 (Tue, 20 Dec 2016 13:26:01 GMT)

* [14a9fa7](https://github.com/bootprint/customize-engine-handlebars/commit/14a9fa7) Travis CI Setup for current node versions - Nils Knappmeier
* [986a470](https://github.com/bootprint/customize-engine-handlebars/commit/986a470) Add missing dependency to "m-io" - Nils Knappmeier

# Version 1.0.0 (Tue, 20 Dec 2016 09:37:25 GMT)

* [3835177](https://github.com/bootprint/customize-engine-handlebars/commit/3835177) Perform protected branch check on push - Nils Knappmeier
* [a378631](https://github.com/bootprint/customize-engine-handlebars/commit/a378631) Bump customize-dependency to ^1.0.0 - Nils Knappmeier
* [0c5da7d](https://github.com/bootprint/customize-engine-handlebars/commit/0c5da7d) Testsetup fixed and improved - Nils Knappmeier
* [919bb90](https://github.com/bootprint/customize-engine-handlebars/commit/919bb90) Pending test implemented - Nils Knappmeier
* [dface1a](https://github.com/bootprint/customize-engine-handlebars/commit/dface1a) Add `partialWrapper`-option to output partial-names (#1) - Nils Knappmeier



# Version 0.7.0 (Fri, 17 Jun 2016 21:32:39 GMT)

* [b9812b9](https://github.com/bootprint/customize-engine-handlebars/commit/b9812b9) Add `partialWrapper`-option to output partial-names - Nils Knappmeier

# Version 0.6.2 (Tue, 15 Mar 2016 13:59:11 GMT)

* [1fdab40](https://github.com/bootprint/customize-engine-handlebars/commit/1fdab40) Fix testcase and do not run mocha recursively - Nils Knappmeier
* [db1b6d4](https://github.com/bootprint/customize-engine-handlebars/commit/db1b6d4) Use mocha to run tests - Nils Knappmeier
* [bccf9ec](https://github.com/bootprint/customize-engine-handlebars/commit/bccf9ec) Adjust travis-configuration - Nils Knappmeier
* [94a70f9](https://github.com/bootprint/customize-engine-handlebars/commit/94a70f9), [612208d](https://github.com/bootprint/customize-engine-handlebars/commit/612208d) Move to bootprint-organization and enable ghook for StandardJS - Nils Knappmeier

## v0.6.1 - 2015-12-20

### Fix

* Added description to `schema.js`

## v0.6.0 - 2015-11-08

### Add

* Possibility to pass a file-path as `data` property to reference a CommonJS-module 
  containing a helper object, or passing function generating the `data`-object.
* File-watcher for `data`, `helpers` and `preprocessor` as long as they are files or functions with a `watch`-property.
  

## v0.5.3 - 2015-11-03 

# Fix

* Add missing dependency on `debug`

## v0.5.2 - 2015-10-19

# Fix

* Add `files`-property to package.json

## v0.5.1 - 2015-10-15

### Fix

* Use release version of `promised-handlebars`

## v0.4.0 - 2015-10-14

### Add

* Added schema for input validation

## v0.3.0 - 2015-10-05 
### Add

* Necessary methods to add support for `customize-watch`

## v0.2.2 - 2015-09-28

### Add

* Append engine and customize-config to each helper-call

## v0.2.1 - 2015-08-12

### Fix

* Errors while loading a preprocessor module are now reported.
  Missing modules are still ignored.

## v0.2.0 - 2015-08-04

### Fix

* Errors while loading a helper module are now reported.
  Missing modules are still ignored.

### Change

- The `promised-handlebars` module is now used to provide support for
  helpers that return promises.

## v0.1.0 - 2015-07-19

### Documentation

- Comprehensive README example

### Added

- Options for `Handlebars#compile()` can be provided via the `hbsOptions`-property 
  in the configuration
- Allow `helpers` to be a function that returns a helper-object (or a promise for 
  a helper object)
- Allow `helpers` to be the path to a Javascript-module

### Change
- If the input configuration of a Customize-engine is a Promise, it is resolved 
  before passing it to the engine's preprocessor. Inner Promises are not resolved.
- Replaced filesystem access via `q-io/fs` by `require`.  Try to avoid browser
  incompatibilities, althought `customize` does not support browsers yet.

## v0.0.1 - 2015-06-29
### Initial version

- Extracted handlebars-engine from `customize`
