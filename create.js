const child = require('child_process');
const fs = require('fs');
const readline = require('readline');

const SKETCHES_PATH = 'src/assets/JSON/projects.json';
const SKETCHE_JS_PATH = (name) => `src/projects/${name}/${name}.js`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let projectName = '';
rl.question('Choose a project name:', (name) => {
  projectName = name;
  rl.close();
});

rl.on('close', () => {
  const rawdata = fs.readFileSync(SKETCHES_PATH);
  const sketches = JSON.parse(rawdata);
  sketches.unshift({
    id: projectName,
    type: 'sketch',
    beta: 'true',
  });
  fs.writeFileSync(SKETCHES_PATH, JSON.stringify(sketches, null, '\t'));
  child.execSync(`cd src/projects && mkdir ${projectName} && cd ${projectName} && touch ${projectName}.js && cd ../..`);
  fs.writeFileSync(SKETCHE_JS_PATH(projectName), `import setListeners from '@/js/utlis/addEventListeners';
  
console.log('import ${projectName}');

const sketch = (instance) => {
  const sk = instance;

  sk.start = () => {
    sk.loop();
  };

  sk.stop = () => {
    try {
      sk.noLoop();
      sk.remove();
      console.log('${projectName} killed');
    } catch (err) {
      console.log(err);
    }
  };

  sk.setup = () => {
    sk.canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.background(255, 0, 0);
    sk.mouseX = sk.width / 2;
    sk.mouseY = sk.height / 2;
  };

  sk.draw = () => {
  };

  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
  };

  setListeners(sk);
};

export default sketch;
`);
  console.log(`${projectName} is created`);
  process.exit(0);
});
