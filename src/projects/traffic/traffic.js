import Tone from 'tone';


const s = (instance) => {
  const sk = instance;

  sk.settings = {
    text: {
      value: '不停止',
      type: 'text',
    },
    notes: {
      value: 'A3,B2,D3,F5,G2',
      // type: 'text',
    },
    bpm: {
      value: 70,
      // type: 'range',
      max: 100,
      min: 30,
      step: 1,
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
  let distortion = new Tone.Distortion(0.1);
  let tremolo = new Tone.Tremolo(5, 0.6).start();
  let synth = new Tone.Synth({
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
    x: 30,
    y: 30,
    r: 10,
    fill: [0, 0, 0, 0],
    get mode() {
      if (Math.floor((this.y / sk.height) * 4) % 2 === 0) {
        return 'rect';
      }
      return 'circle';
    },
  };

  const createRect = (note) => {
    if (Math.random() > 0.3) rect.text = null;
    rect.fill = [
      Math.floor(sk.random(-200, 600)),
      Math.floor(sk.random(-255, 100)),
      Math.floor(sk.random(-500, 500)),
    ];
    rect.r = (Math.floor(Math.random() * 5) * sk.height) / 15;
    rect.x = sk.width / 2;
    rect.y = sk.height / 2 + (330 - note) * 0.6;
  };

  let seq = new Tone.Sequence(
    (time, note) => {
      createRect(note);
      try {
        synth.triggerAttackRelease(note, '16n');
      } catch (err) {
        //
      }
    },
    [440, 220, [440, 220, [440, 220, 440]]],
  );

  const setSeqNotes = () => {
    if (sk.notes !== sk.settings.notes.value) {
      const arr = sk.settings.notes.value.split(',');
      const notes = [arr[0], arr[1], [arr[2], arr[3], [arr[4], arr[5], arr[6]]]];
      notes.map((a, index) => {
        seq.at(index, a);
      });
      sk.notes = sk.settings.notes.value;
    }
  };

  const triggerSynth = (time) => {
    const notes = ['C2', 'A4', 'D3', 'A2', 'E4', 'Eb3', 'A2', 'D4'];
    try {
      synth.triggerAttackRelease(
        notes[Math.floor(Math.random() * notes.length)],
        '16N',
        time,
      );
    } catch (err) {
      //
    }
  };

  sk.stop = () => {
    sk.noLoop();
    seq.stop();
    seq = null;
    synth = null;
    distortion = null;
    tremolo = null;
    Tone.Transport.stop();
    Tone.context.suspend();
    sk.remove();
    console.log('traffic is killed');
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
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.scaleRef = (sk.width + sk.height) / 2;
    sk.background(0);
    createRect(110);
    sk.noStroke();
    sk.rectMode(sk.CENTER);
    sk.textAlign(sk.CENTER, sk.CENTER);
    (async () => {
      await sk.soundReady;
      sk.setupTone();
    })();
  };

  sk.setupTone = () => {
    seq.humanize = true;
    seq.probability = 1;
    seq.start();
    Tone.Transport.schedule(triggerSynth, 0);
    Tone.Transport.schedule(triggerSynth, '16n');
    Tone.Transport.schedule(triggerSynth, '8n');
    Tone.Transport.schedule(triggerSynth, '4n');
    Tone.Transport.loopEnd = '1:0:0';
    Tone.Transport.loop = true;
    Tone.Transport.bpm.value = 70;
    Tone.Transport.start();
  };

  sk.tri = (x, y, r) => {
    sk.beginShape();
    sk.vertex(x, y - r / 1.33);
    sk.vertex(x + r / 2, y + r / 1.66);
    sk.vertex(x - r / 2, y + r / 1.66);
    sk.endShape();
  };

  sk.draw = () => {
    // setSeqNotes();
    Tone.Transport.bpm.value = sk.settings.bpm.value;
    rect.r
      += ((sk.noise(rect.fill[0], rect.fill[3], rect.fill[1]) * sk.scaleRef) / 2
        - rect.r)
      * 0.5;
    sk.fill(rect.fill);
    if (rect.mode === 'rect') {
      sk.smooth();
      sk.rect(rect.x, rect.y, rect.r);
    } else {
      sk.smooth();
      sk.ellipse(rect.x, rect.y, rect.r);
    }
    if (rect.text) {
      sk.fill(0);
      sk.textSize(rect.r / 1.5 + Math.random() * 10);
      sk.text(rect.text, rect.x, rect.y);
    }
  };
  sk.handleTouchStart = () => {
    rect.y = Math.random() > 0.5 ? 0 : sk.height * 0.9;
    rect.r /= 0.5 + Math.random();
    rect.text = sk.settings.text.value[Math.floor(Math.random() * sk.settings.text.value.length)];
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
      sk.soundReady = new Promise((resolve) => {
        resolve(true);
      });
    },
    { once: true, passive: false },
  );

  divNode.addEventListener(
    'touchstart',
    async () => {
      await Tone.start();
      sk.soundReady = new Promise((resolve) => {
        resolve(true);
      });
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
