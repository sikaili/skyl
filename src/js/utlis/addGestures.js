import Hammer from 'hammerjs';

const addGestures = (sk) => {
  const canvasDiv = document.querySelector('#canvasContainer');
  console.log(canvasDiv);
  const options = {
    preventDefault: true,
  };
  const hammer = new Hammer(canvasDiv, options);
  console.log(hammer);
  hammer.get('pinch').set({ enable: true });
  hammer.get('rotate').set({ enable: true });
  hammer.on('pinch', sk.handlePinch);
  hammer.on('rotate', sk.handleRotate);
};

export default addGestures;
