const setListeners = (sk, Tone) => { //eslint-disable-line
  const divNode = document.querySelector('#canvasContainer');
  divNode.addEventListener(
    'click',
    async () => {
      await Tone.start();
      try {
        sk.start();
      } catch (err) {
        //
      }
      sk.soundIsReady = true;
    },
    { once: true, passive: false },
  );
  divNode.addEventListener(
    'touchstart',
    async () => {
      await Tone.start();
      try {
        sk.start();
      } catch (err) {
        //
      } sk.soundIsReady = true;
    },
    { once: true, passive: false },
  );
  divNode.addEventListener(
    'touchstart',
    sk.handleTouchStart,
    {
      passive: false,
    },
  );

  divNode.addEventListener(
    'mousedown',
    sk.handleTouchStart,
    {
      passive: false,
    },
  );

  divNode.addEventListener('touchend', sk.handleTouchEnd, {
    passive: false,
  });

  divNode.addEventListener('mouseup', sk.handleTouchEnd, {
    passive: false,
  });

  divNode.addEventListener(
    'ontouchmove',
    (m) => {
      m.preventDefault();
    },
    { passive: false },
  );

  divNode.addEventListener(
    'touchmove',
    sk.handleTouchMove,
    { passive: false },
  );
  divNode.addEventListener(
    'mousemove',
    sk.handleTouchMove,
    { passive: false },
  );
  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
  };
};
export default setListeners;
