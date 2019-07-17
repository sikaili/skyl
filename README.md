# skyl.fr

Personal web site project, a place to showcase what I did, interactive animations, music, drawings and so on.

1er version (on branch p5):

A simple html css page with an interactive canvas background, as the number of projects grows, it becomes kind of tiring to manually do the maintenance and updates, also the need of a presentation page is getting obvious, so I started to design a second version with more features, while keeping the simplicity & geometric feeling of this first version.

2nd version (on branch vue):


Once the conception is down, I began to build the second version. In terms of frameworks I choose Vue for javascript and Tachyons for CSS. This time I store all the informations in a JSON file, images, links, contributors for each project etc, to simplify my life for updating and maintaining the content, also to anticipate the usage of a database and the future transformation to a full-stack site, I’m thinking about a place where users can save what they create with my tools (like 'noise draw'), and do some simple community interactions (comments etc).

Same as the first version, I categorised my projects into 'work', 'music', 'drawings', but this time I added a 'play !' page where users can quickly switch between differences projects and test them. Also an introduction page with photos and descriptions of the selected project, all fetching data from the JSON file so no editing work needed.

As for the showcase of the animations, both in background and in the 'play !' page, I used iframe to go to the archived projects, as they were written in 'global mode' I didn’t find a way to implement them locally in Vue (I’m not planning to re-write thousands lines of code in instance mode). 


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
