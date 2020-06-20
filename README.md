# nuxt-multiple-facebook-pixel-module

[![npm (scoped with tag)](https://img.shields.io/npm/v/@dukanify/nuxt-multiple-facebook-pixel-module/latest.svg?style=flat-square)](https://npmjs.com/package/@dukanify/nuxt-multiple-facebook-pixel-module)

> A NuxtJS module thats injects Multiple Facebook Pixel code

## Table of Contents

* [Requirements](#requirements)
* [Install](#install)
* [Getting Started](#getting-started)
* [License](#license)

## Requirements

* npm or yarn
* NuxtJS
* NodeJS

## Install

```bash
$ npm install --save @dukanify/nuxt-multiple-facebook-pixel-module
// or
$ yarn add @dukanify/nuxt-multiple-facebook-pixel-module
```

## Getting Started

Add `@dukanify/nuxt-multiple-facebook-pixel-module` to `modules` section of `nuxt.config.js`.

```js
{
  modules: [
    // Simple usage
    '@dukanify/nuxt-multiple-facebook-pixel-module',

    // With options
    ['@dukanify/nuxt-multiple-facebook-pixel-module', {
      /* module options */
      track: 'PageView',
      pixelId: ['FACEBOOK_PIXEL_ID_1,ID_2'],
      disabled: false
    }],
 ]
}
```

or even

```js
{
  modules: [
    '@dukanify/nuxt-multiple-facebook-pixel-module',
  ],
  facebook: {
    /* module options */
    track: 'PageView',
    pixelId: ['FACEBOOK_PIXEL_ID_1,ID_2'],
    disabled: false
  },
}
```

## Disabling the pixel (for GDPR)

If you'd like to install the pixel disabled, and enable it later after the user has consented to its use, you can do so by setting `disabled: true` in the pixel configuration:

```js
{
  modules: [
    '@dukanify/nuxt-multiple-facebook-pixel-module',
  ],
  facebook: {
    ...
    disabled: true
  },
}
```

Now, in your component, you can call the following in order to start the pixel and track the current page.

```js
this.$fb.enable()
```

## Module options

List of possible options in the module:

| Option   | Default  | Required | Description                                                                               |
|----------|----------|----------|-------------------------------------------------------------------------------------------|
| pixelId  | null     | true     | The unique pixel identifier provided by Facebook.                                         |
| track    | PageView | false    | Default tracking event.                                                                   |
| version  | 2.0      | false    | Tracking version.                                                                         |
| disabled | false    | false    | Disable the Pixel by default when initialized. Can be enabled later through `$fb.enable()`.

## Facebook pixel instance

The tracking pixel instance is available on all vue component instances as $fb. It has the following methods:

| Method            | Purpose                                                                                                  | Equivalent to                  |
|-------------------|----------------------------------------------------------------------------------------------------------|--------------------------------|
| enable()          | If you had previously set `disabled: true` in config, enables the pixel and tracks the current page view | $fb.init(), $fb.track()        |
| init()            | Initialises the pixel                                                                                    | fbq('init', <options.pixelId>) |
| track(event)           | Sends a track event. It's `PageView` by default if the `event` is not defined.                                                                                      | fbq('track', <options.track>)  |
| query(key, value, parameters) | Call the underlying fbq instance with anything else. The `parameters` attribute is optional.                                                      | fbq(key, value, parameters)                |

## License

[MIT License](./LICENSE)

## Thanks

Thanks to [William DASILVA](https://github.com/WilliamDASILVA/nuxt-facebook-pixel-module) for his original Nuxt facebook pixel module which inspired this project.
