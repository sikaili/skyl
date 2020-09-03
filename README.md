# skyl.fr

Personal portfolio site, a place to showcase what I did, interactive animations, music, drawings and so on.

1er version (on branch p5):
    A minimalist site made with Canvas API.

2nd version (on branch vue):

    Made with Vue, using p5 instance mode and sometimes iframe to host all the sketches within the SPA itself.

    New Features :

        'Play !' - Same as the first version, projects are categorised into 'work', 'music', 'drawings', and this time I added a 'play' page where users can quickly switch between differences projects and test them instantly. Also an introduction page for each project, with photos, descriptions, project contributors etc... 

        'Read more' - a minimalist article page for project infos.

        Dynamic imports and p5 instance mode to open new sketches on the fly, moving the .JS sketches files into the SPA itself makes it possible to add toolbox interface with Vue, easier to store data, also enables communication between sketches


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
