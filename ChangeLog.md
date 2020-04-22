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

