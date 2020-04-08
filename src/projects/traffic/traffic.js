import Tone from 'tone';


const s = (instance) => {
  const distortion = new Tone.Distortion(0.1);
  const tremolo = new Tone.Tremolo(5, 0.6).start();
  const synth = new Tone.Synth({
    oscillator: {
      type: 'sine',
      modulationType: 'sawtooth',
      modulationIndex: 6,
      harmonicity: 1,
    },
    envelope: {
      attack: 0.4,
      decay: 0.1,
      sustain: 0.8,
      release: 1,
    },
  }).chain(distortion, tremolo, Tone.Master);
  const divNode = document.querySelector('#canvasContainer');

  const sk = instance;
  // save and get last
  sk.lastKey = localStorage.getItem('last-key') || 'notok';
  sk.thisKey = `OK${Date()}`;
  sk.get = (key = sk.lastKey) => JSON.parse(localStorage.getItem(key)) || [];
  sk.save = (item, key) => {
    localStorage.setItem(key, JSON.stringify(item));
    localStorage.setItem('last-key', key);
  };
  let looping = true;
  const rect = {
    x: 30, y: 30, r: 10, fill: [0, 0, 0, 0],
  };


  const triggerSynth = (time) => {
    const notes = ['C2', 'A4', 'D3', 'A2', 'E4', 'Eb3', 'A2', 'D4'];
    if (synth) {
      synth.triggerAttackRelease(
        notes[Math.floor(Math.random() * notes.length)],
        '16N',
        time,
      );
    }
  };

  const seq = new Tone.Sequence(
    (time, note) => {
      rect.text = null;
      rect.fill = [
        Math.floor(sk.random(-200, 600)),
        Math.floor(sk.random(-255, 100)),
        Math.floor(sk.random(-500, 500)),
      ];
      rect.r = (Math.floor(Math.random() * 5) * sk.height) / 15;
      rect.x = sk.width / 2;
      rect.y = sk.height / 2 + (330 - note) * 0.8;
      if (synth) {
        synth.triggerAttackRelease(note, '16n');
      }
    },
    [440, 220, [440, 220, [440, 220, 440]]],
  );

  sk.stop = () => {
    sk.noLoop();
    synth.dispose();
    Tone.context.suspend();
    sk.remove();
    console.log('traffic is killed');
  };

  sk.settings = {
    // distance: {
    //   value: 0.8,
    //   type: 'range',
    //   max: 2.5,
    //   min: 0,
    //   step: 0.1,
    // },
    text: {
      value: '不停止',
      type: 'text',
    },
    actions: [{
      name: 'saveCapture',
      icon: 'image',
    }, {
      on: true,
      get name() {
        if (this.on) {
          return 'pause';
        }
        return 'play';
      },
      get icon() {
        if (this.on) {
          return 'pause';
        }
        return 'play';
      },
    }],
  };
  sk.pause = () => {
    Tone.Transport.toggle();
    sk.noLoop();
  };
  sk.play = () => {
    Tone.Transport.toggle();
    sk.loop();
  };

  sk.setup = () => {
    // sk.pixelDensity(6);
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.scaleRef = (sk.width + sk.height) / 2;
    sk.background(0);
    sk.noStroke();
    sk.rectMode(sk.CENTER);
    sk.textAlign(sk.CENTER, sk.CENTER);
    seq.humanize = true;
    seq.probability = 1;
  };

  sk.draw = () => {
    rect.r
      += ((sk.noise(rect.fill[0], rect.fill[3], rect.fill[1]) * sk.scaleRef) / 2
        - rect.r)
      * 0.5;
    sk.fill(rect.fill);
    if (rect.y < sk.height / 2) {
      sk.rect(rect.x, rect.y, rect.r);
    } else {
      sk.ellipse(rect.x, rect.y, rect.r);
    }
    if (rect.text) {
      sk.fill(0);
      sk.textSize(rect.r / 1.5 + Math.random() * 10);
      sk.text(rect.text, rect.x, rect.y);
    }
  };
  sk.handleTouchStart = () => {
    rect.y *= Math.floor(Math.random() * 3 - 1) * 1.2;
    if (Math.random() > 0.6) rect.y = sk.mouseY;

    rect.r /= 5;
    rect.text = sk.settings.text.value[Math.floor(Math.random() * sk.settings.text.value.length)];
    if (Math.random() > 0.95) {
      sk.background(0);
    }
  };

  sk.keyPressed = () => {
    switch (sk.keyCode) {
      case 32:
        sk.saveCapture();
        break;
      case 78:
        Tone.Transport.toggle();
        if (looping) {
          sk.noLoop();
          looping = !looping;
        } else {
          sk.loop();
          looping = !looping;
        }
        break;
      case 65:
        Tone.Transport.clear(2);
        break;
      default:
        break;
    }
  };

  sk.saveCapture = () => {
    if (sk.pixelDensity() > 1) {
      sk.saveCanvas(document.querySelector('canvas'), `traffic-${Math.random().toFixed(1)}`, 'png');
    }
  };

  divNode.addEventListener(
    'click',
    async () => {
      await Tone.start();
      seq.start();
      Tone.Transport.schedule(triggerSynth, 0);
      Tone.Transport.schedule(triggerSynth, '16n');
      Tone.Transport.schedule(triggerSynth, '8n');
      Tone.Transport.schedule(triggerSynth, '4n');
      Tone.Transport.loopEnd = '1:0:0';
      Tone.Transport.loop = true;
      Tone.Transport.bpm.value = 70;
      Tone.Transport.start();
    },
    { once: true, passive: false },
  );

  divNode.addEventListener(
    'touchstart',
    async () => {
      await Tone.start();
      seq.start();
      Tone.Transport.schedule(triggerSynth, 0);
      Tone.Transport.schedule(triggerSynth, '16n');
      Tone.Transport.schedule(triggerSynth, '8n');
      Tone.Transport.schedule(triggerSynth, '4n');
      Tone.Transport.loopEnd = '1:0:0';
      Tone.Transport.loop = true;
      Tone.Transport.bpm.value = 70;
      Tone.Transport.start();
    },
    { once: true, passive: false },
  );

  divNode.addEventListener('touchstart', sk.handleTouchStart, {
    passive: false,
  });

  divNode.addEventListener('mousedown', sk.handleTouchStart, {
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
    (ev) => {
      ev.preventDefault();
    },
    { passive: false },
  );
};

export default s;
