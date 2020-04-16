import Hammer from 'hammerjs';

const addGestures = (sk) => {
  const canvasDiv = document.querySelector('#canvasContainer');
  const options = {
    preventDefault: true,
  };
  const hammer = new Hammer(canvasDiv, options);
  hammer.get('pinch').set({ enable: true });
  hammer.get('rotate').set({ enable: true });
  hammer.get('press').set({ time: 600 });
  hammer.on('press', sk.handlePress);
  hammer.on('pinch', sk.handlePinch);
  hammer.on('rotate', sk.handleRotate);
};

export default addGestures;
