# hsipe [![npm](https://img.shields.io/npm/v/hsipe.svg?maxAge=2592000)](https://www.npmjs.com/package/hsipe) [![AppVeyor Status](https://ci.appveyor.com/api/projects/status/5b1rgrk0fn3kpbfq?svg=true)](https://ci.appveyor.com/project/jokeyrhyme/hsipe-js) [![Travis CI Status](https://travis-ci.org/jokeyrhyme/hsipe.js.svg?branch=master)](https://travis-ci.org/jokeyrhyme/hsipe.js)

Here's Something I Prepared Earlier (via detached child-process)


## Usage

I borrowed this idea by seeing how [update-notifier](https://github.com/yeoman/update-notifier) operates.

The ideal use case is when you have a time-consuming asynchronous task
(e.g. baking a cake, making an HTTP request, scanning a disk, etc),
and you'd like to continue executing,
even when those results are not ready yet.
You assume that during a future execution of your script,
you'll have access to the results of that previous run.


### `putInOven(options: OvenOptions, ...args: any[])`

```flowtype
type OvenOptions = {
  bakePath: string,
  cakeName: string,
  interval?: number
}
```

-   **bakePath** is a path to a module that exports a BakeFunction named "bake"

-   **cakeName** is a unique identifier for the background work,
  and scripts that use the same results can share this

-   **interval** is the milliseconds to wait after a successful baking,
  to throttle your time-consuming task (default = 1 day)


```flowtype
type BakeFunction = (options: BakeOptions, ...args: any[]) => Promise<void>
type BakeOptions = {
  conf: Conf
}
```

-   see upstream [Conf](https://github.com/sindresorhus/conf) for more details

-   when your BakeFunction resolves, we automatically set "lastBaked" value in the cake for you (used when checking **interval**)


### `getCake(options: CakeOptions) => Cake`

```flowtype
type CakeOptions = {
  cakeName: string
}

type Cake = {
  lastBaked?: number,
  [id:string]: any
}
```

-   **cakeName** must be the same cake that you `putInOven()` earlier

-   returns your **Cake** if it's ready (you'll have to check)


### Example

[index.js](./example/index.js) / cli.js (your entry-point):

```js
const path = require('path')

const Conf = require('conf')
const { getCake, putInOven } = require('hsipe')

const cakeName = 'strawberry-shortcake'

// start baking our strawberry-shortcake
putInOven({ bakePath: path.join(__dirname, 'bake.js'), cakeName })

// try to continue on, in case we already started baking last time
const cake = getCake({ cakeName })
const flavour = cake.flavour

if (flavour) {
  // yay, we must have prepared something earlier
  // TODO: eat cake, enjoy flavour
} else {
  // ah, this must be our first time through here
  // better luck next time!
  // TODO: do something that doesn't require eating delicious cake
}
```

[bake.js](./example/bake.js):

```js
function bake ({ conf }, ...args) {
  // e.g. something that can take a while to finish
  return new Promise((resolve) => {
    setTimeout(() => {
      conf.set('flavour', 'delicious')
      resolve()
    }, 5e3)
  })
}

module.exports = { bake }
```


## Contributing

### Development

```sh
npm install --global flow-typed
npm install
flow-typed install
npm test
```


### See Also

-   [conf](https://github.com/sindresorhus/conf)

-   [update-notifier](https://github.com/yeoman/update-notifier)
