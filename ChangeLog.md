## [2.7.4] - 2020-05-09
### Changed
- changelog.js ([4e01d4](https://github.com/sikaili/skyl.fr/commit/4e01d4))

## [2.7.3] - 2020-05-09
### Fixed
- changelog.js ([c09997](https://github.com/sikaili/skyl.fr/commit/c099972a2f54063cef7f95a5b3fc6dd4143837eb))
### Changed
- rename components ([b5abc7](https://github.com/sikaili/skyl.fr/commit/b5abc715557d94c8649373116f249964027876f2))

## [2.7.2] - 2020-05-08
### Added
- changelog.js ([e9d205](https://github.com/sikaili/skyl.fr/commit/e9d205738eba6e3f4125b4cb9bfdc6e83d9c7de6))
- worley noise ([ca1e30](https://github.com/sikaili/skyl.fr/commit/ca1e30eaa59a22e026755a8a441e616a4f38875f))
- reaction-diffusion b value from new text canvas pixel array ([2b9342](https://github.com/sikaili/skyl.fr/commit/2b934289183c867c88d2a9af85b9379edcc4d172))
- [WIP]change scale, vidoe mapping ([1f830a](https://github.com/sikaili/skyl.fr/commit/1f830a5a167accfae538b28ce9714625d5450d18))
- reaction-diffusion video pixels ([805b42](https://github.com/sikaili/skyl.fr/commit/805b42a84a380877f4aca6bdaccec08736d94ef1))
- reaction-diffusion reset default values [CHANGED] save canvas save point & line ([76b674](https://github.com/sikaili/skyl.fr/commit/76b674c02537714e46738add7649de43fe196d19))
- random params [CHANGED] use lines ([547148](https://github.com/sikaili/skyl.fr/commit/5471480feeac3179c2fe6428d8a8c07b2758a4b2))
- reaction-diffusion [CHANGED]canvas settings display value ([309fb1](https://github.com/sikaili/skyl.fr/commit/309fb1a4306360814511dcf0f794ad59a58040c5))
### Changed
- cv ajustement, hide 2 sketches ([bb4ec3](https://github.com/sikaili/skyl.fr/commit/bb4ec368adad15d33593b30d7d55ed074ea67fcc))
- refacto CV page, move data to json ([cb0a07](https://github.com/sikaili/skyl.fr/commit/cb0a0723811271eefa6bbddffa926f72adf11717))
- worley-noise change ([7393fc](https://github.com/sikaili/skyl.fr/commit/7393fc11c8ebffae5112183967da2dc7e0e70bba))
- reaction-diffusiion default value ([c73bfb](https://github.com/sikaili/skyl.fr/commit/c73bfbe456788542300d95a3968d956bbae75d81))
- auto add virus after 2s ([e6f80b](https://github.com/sikaili/skyl.fr/commit/e6f80b806860bfad2eb02083b151596c73415346))
- reaction diffusion random params etc ([c28365](https://github.com/sikaili/skyl.fr/commit/c283653e7fdaccf109ebde23f4092894ffce2519))
- reaction diffusion ajustment ([[ADDED](https://github.com/sikaili/skyl.fr/commit/[ADDED] touch move to show random caracters))
- reaction-diffusion skin tone classification ([9e0b2e](https://github.com/sikaili/skyl.fr/commit/9e0b2e35f352e4b1195a19ffae7b2cf926e5fa9b))

## [2.6.2] - 2019-04-30
### Fixed
- ios safari background freeze, focus, blur, visibilitychange
### Changed
- k means skin tone classification
- noise-draw rename system

## [2.6.1] - 2019-04-25
### Fixed
- share url
- window resize probleme on ios, 505ms delay (b84c32e913aaa8)
### Changed
- k-means selfie sin osc


## [2.6.0] - 2019-04-23
### Fixed
- share url
- k-means vscale
### Added
- k-means selfie

## [2.5.2] - 2019-04-22
### Changed
- entering random only on sketches
### Fixed
- virus sound secure

## [2.5.1] - 2019-04-22
### Changed
- notification to app.vue
- clean public folder
- entering random only on sketches

## [2.5.0] - 2019-04-22
### Changed
- highlight active item side menu
- cave.js compressor (<170)
- custom sw.js, only cover img are precached
### Added
- copy link button, update sw (f8abc77c1791b54f1cfae)
- service work workbox
- notification for version (96b2436d4e)
- display version (120dab6e2e3)
### Fixed
- canvas menu icon css
- window resize p5 windowWidth not refreshing

## [2.4.0] - 2019-04-18
### Changed
- Canvas support 2 players (840dad8ed4992)
- canvas list items (8ad6cbf0351e412e6)
- cave ajustment
- cave add point class (4242732805)
- export addlisteners
- update noise-draw (82451650e59)
- relative position noise-draw (76b0eb585e01178c7b)
### Added
- fullscreen canvas mode (1c83d4d1fb)
- Cave ! (e0c1afe9e702538747)
- Cave draw lines, add two given shapes : rect, circle (840dad8ed4992)
- Cave : mouse tilt view (adb9b7a823a325)
- Noise-draw (8ad6cbf0351e412e6)
- sound for noise-draw (7ce5cae1033)
- noise-draw fit to window, center drawing, other actions (e80dd781214)
- noise-draw => gestures to scale & move (55113f6)
- cripple (7f17baa49de)
- import drawings shape in cave (7f17baa49de)
- noise-draw drawings json (079583b940)
- noise-draw hash to be displayed in cave (d4ea999b84f2)
- cave, import drawings, color mode (6c9e2d44c5)
### Fixed
- visual bug when sample rate 96khz (7f17baa49de)



## [2.3.2] - 2019-04-12
### Changed
- do not show read more when no imgs inside
- add text action to traffic, debug canvas 
### Added
- Traffic (d3a1b7ae4c93b51fa1db2d532e)
- add text action to traffic, debug canvas (19811c2ed75760b22acc314)
- add amarrage, player pixel density when width> 640 (18cf0893f29fe87)

## [2.2.2] - 2019-04-07
### Changed
- virus mouse trace, canvas style boolean input (285b8ab725c)
### Added
- action button & save settings in localstorage (a8c19fd99685)
- set this.r, add actions, set static draw or not (17e8712b72eab29b2)
- virus : detect draw-line(40f2346bf88695b8c8a70a27)

## [2.2.1] - 2019-04-06
### Changed
- player menu apearence (4ea30e4288c29e8)
### Fixed
- iframe grey bug on safari, caused by overflow:hidden


## [2.2.0] - 2019-04-05
### Added
- enable player settings for iframe music (00596a102d556459e5)
### Changed
- close sidemenu when settings is showing
- one toggle for all lists (5f8d405d2bc60)
- Dynamic import songs (9751393c7395601cd)
### Fixed
- play goes to link instead of inner js

## [2.1.0] - 2019-04-04
### Added
- Settings panel, colors for rain-addiction (1983097132206)
- Select song in settings channel
- virus quick settings
- Rain-Addction instance mode (94c2c9305a924)
- p-settings-color (24a65ed29f)
### Changed
- when page is not found, play a random iframe (8249e6b340f)
- sketch at the head of seed.js
### Fixed
- debouce sketch load rain-addction (94c2c9305a924)
- play sound before buffer

## [2.0.1] - 2019-04-02
### Added
- Play view : Random button turns into Restart after 5s 
### Changed
- SetActiveItem accepts id string
- eyes stroke weight, pixel density for desktop (d7116250659b3751530919707d)
- add borders to a composite and reset on windowresize (17f1b96aa0667)
- virus particles size
### Fixed
- Play view JS sketch navigation
- Kill JS sketch when

## [2.0.0] - 2019-04-02
### Added
- Instance mode : virus, p, eyes (MR: https://github.com/sikaili/skyl.fr/pull/6/)

