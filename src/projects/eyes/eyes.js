import Tone from 'tone';
import F3 from './sound/light.mp3';
import A3 from './sound/chasing.mp3';
import E3 from './sound/bouton_reverb.mp3';
import texts from './assets/hanzi.json';

console.log('import eyes');
const eyes = (dd) => {
  const divNode = document.querySelector('#canvasContainer');
  const sampler0 = new Tone.Sampler(
    { F3, A3 },
    {
      onload: () => {
        dd.soundIsLoaded = true;
      },
    },
  ).chain(new Tone.Volume(-12), Tone.Master);
  const sampler1 = new Tone.Sampler(
    { E3 },
    {
      onload: () => {
        dd.soundIsLoaded = true;
      },
    },
  ).chain(new Tone.Volume(-12), Tone.Master);
  // sampler0.add('A3', '/sound/chasing.mp3');
  // let textReceived = `击洋误钟亡鲜异室异急热助型推包商收王接声东建感像即争爱带光受反任门度报则清未支尽章密兰游沉托舰鱼均销笔亡钟亡肉嘴姆嘴圣择剧楚评皇室异急异皇买靠楚编赶词鲜诗湾误洋读阳若略范款减诗洲防研写供族研笑称列族流飞风兵列选飞风企称难东声做且难东声做权且飞风留施续红网继尼施留网送尼调改深吗响调深吗虽响红连步调功红八调红续武续微哪男效男哪射若值射超啊冲啊哥啊冲超索胡压竟银压竟免啊冷细巴细预止严考巴预脑诉严止冷层刘烈户层刘妈疑脑拿注器注较周消台单却界影器消叫听白今叫今叫白结却切白却院单却反界让院却反识须照罗增防族值千防青族值千防青防千愿落青例九字落愿例九例细严仅照具照仅容影语容语站友树坚善央善拿跟周消视远清听才结反界让识具须落九罗候识达带爱增随族供列写流运笑备飞权做务权企选族防千愿细谁益冲啊洋误洋烈杂误诗鲜词藏吉索供写选供仍男钱破继句竟略若益止诉底器越器照写称备兵飞且权`;
  // textReceived = textReceived.split("");
  // const recentItemNo = 0;
  let touched = false;
  const scaleX = 50;
  let back;
  let backR;
  let letterF;
  let letterFR;
  let letterFSR;
  let letterFS;
  let eyeF;
  let recS;
  let recF;
  let eyeS;
  let eyeBS;
  let xoff = 0;
  let yoff = 0;
  let state = -1;
  let scale1 = 1;
  let scale2 = 1.2;
  const mp = [];
  mp[-1] = { x: -1, y: -1, text: '我' };
  let sx;
  let sy;
  let loading = false;
  const loading1 = true;
  const loading2 = true;
  let reverse1 = 0;

  class Eye {
    constructor(x, y, tx) {
      this.x = x;
      this.y = y;
      this.tx = tx;
    }

    display() {
      dd.push();
      dd.stroke(eyeS);
      let rr = 120 / scale1;
      let r = 100 / scale1;
      const per = 200 / scale1;
      let ii = 1;
      // touched
      if (state === 1) {
        rr *= 1.2;
        r *= 1.15;
        ii *= 1.15;
      }
      dd.translate(this.x, this.y);
      dd.beginShape();
      dd.vertex((-(dd.PI - 0.1) * per) / 2, 0);
      dd.strokeWeight(dd.width < 700 ? 3 : 8);
      // above line
      for (let theta1 = 0.05; theta1 < dd.PI - 0.05; theta1 += 0.1) {
        const n2 = dd.map(Math.sin(dd.frameCount / 40), -1, 1, -3, 3);
        const yy2 = ((-rr * 13) / 12) * Math.sin(theta1)
          + dd.random(-5, 5) / scale1
          - Math.abs(dd.mouseY - dd.height / 2) / 60;
        const yy3 = rr * Math.sin(theta1);
        dd.vertex(theta1 * per - ((dd.PI - 0.1) * per) / 2 + n2, yy2 + n2);
        if (Math.random() > 0.999) {
          dd.vertex(
            theta1 * per - ((dd.PI - 0.1) * per) / 2 + n2,
            yy2 - (Math.random() + 1) * 20,
          );
        }
        if (Math.random() > 0.99) {
          dd.vertex(theta1 * per - ((dd.PI - 0.1) * per) / 2 + n2, yy3);
        }
      }
      dd.fill(eyeF);
      // below line
      for (let theta11 = dd.PI - 0.05; theta11 > 0.05; theta11 -= 0.1) {
        const n21 = dd.map(Math.sin(dd.frameCount / 30), -1, 1, -5, 5);
        const yy21 = ((-rr * 13) / 12) * Math.sin(theta11) + dd.random(-3, 3);
        dd.vertex(theta11 * per - ((dd.PI - 0.1) * per) / 2 + n21, -yy21);
      }
      dd.vertex((-(dd.PI - 0.1) * per) / 2, 0);
      dd.endShape();
      // TEXT +-
      dd.textSize(180 / scale1 + Math.random() * 10);
      dd.strokeWeight(dd.width < 700 ? 10 : 25);
      if (Math.random() > 0.7) {
        dd.stroke(eyeS);
      } else {
        dd.stroke(eyeBS);
      }
      dd.text(
        this.tx,
        -20 - (dd.mouseX - dd.width / 2) / 30,
        -rr - (0.9 * rr) / dd.constrain(scale1, 1.3, 100),
      );
      dd.strokeWeight(1);
      dd.noFill();
      dd.beginShape();
      yoff += 0.1;
      for (let i = 0; i < 2 * dd.PI + 0.01; i += 0.005) {
        dd.stroke(eyeBS);
        // black OUT LINE
        const n1 = dd.noise(xoff, yoff);
        const x1 = r * Math.sin(i)
          + dd.map(n1, 0, 1, -10, 10) / scale1
          + (dd.mouseX - dd.width / 2) / 13;
        const y1 = r * Math.cos(i)
          + dd.map(n1, 0, 1, -20, 10) / scale1
          + (dd.mouseY - dd.height / 2) / 25;
        // y1 = 0;
        xoff += 0.008;
        dd.vertex(x1, y1);
        // EYE LINES, WHITE SPOT MOVING
        if (Math.random() > 0.4) {
          dd.vertex(
            (x1 / 2.5) * ii + (dd.mouseX - dd.width / 2) / 25,
            y1 / 2 + (dd.mouseY - dd.height / 2) / 25,
          );
        }
      }
      dd.endShape();
      dd.pop();
    }
  }
  dd.stop = () => {
    console.log('eyes is killed');
    dd.stopped = true;
    dd.noLoop();
    dd.eyeRight = null;
    texts = [];
    dd.eyeLeft = null;
    sampler0.dispose();
    sampler1.dispose();
    Tone.context.suspend();
    dd.remove();
    Object.entries((prop) => delete dd[prop]);
  };

  dd.start = () => {
    dd.loop();
  };

  dd.setup = () => {
    const canvas = dd.createCanvas(dd.windowWidth, dd.windowHeight);
    canvas.id = Math.random().toFixed(2);
    console.log('setup eyes');
    if (dd.width > 768) {
      dd.pixelDensity(1.0);
    }
    if (dd.width < 1500) {
      scale1 = 1500 / dd.width;
    }
    scale2 = ((1334 * 750) / (dd.width * dd.height)) * 1.8;
    if (dd.width > 1600) {
      scale2 = 4;
    }
    sx = 150 / scale2;
    sy = 150 / scale2;
    dd.mouseX = dd.width / 2;
    dd.mouseY = dd.height * 0.3;

    dd.eyeLeft = new Eye(
      dd.width / 2 - 400 / scale1,
      dd.height / 2 - dd.height * 0.1,
      '+',
    );
    dd.eyeRight = new Eye(
      dd.width / 2 + 400 / scale1,
      dd.height / 2 - dd.height * 0.1,
      '-',
    );
  };

  dd.draw = () => {
    if (!dd.stopped) {
      if (loading && loading1 === false && loading2 === false) {
        loading = false;
      }
      if (scale2 > 12 || scale2 < 0.8) {
        scale2 = dd.width > 700 ? 3 : 5;
        sx = 150 / scale2;
        sy = 150 / scale2;
      }

      Color(Math.floor((dd.frameCount / 150) % 3));
      GeneArray();
      if (dd.frameCount % 2 === 0) {
        if (state === 1 && Math.random() > 0.95) {
          dd.background(backR);
        }
        dd.background(back);
        RandomBackground();
      }
      displayHighLightedText();
      // "+""-"
      if (dd.eyeRight) {
        dd.eyeRight.display();
        dd.eyeLeft.display();
      }
    }
  };

  const displayHighLightedText = () => {
    // traite array, draw dd.rect and texts highlight;
    for (let e = 0; e < mp.length; e += 1) {
      dd.push();

      const nx = mp[e].x;
      const ny = mp[e].y;
      dd.translate(nx * sx, ny * sy);
      // text random size +
      if (e === mp.length - 1) {
        dd.scale(dd.random(2, 2.2));
      } else {
        dd.scale(dd.random(1, 1.0 + e / mp.length / 10));
      }
      // rect background
      dd.stroke(recS);
      dd.strokeWeight(2);
      dd.fill(recF);
      dd.rect(0, 0, sx, sy);
      // text high lighted
      dd.fill(letterFR);
      dd.noStroke();
      dd.textSize(140 / scale2);
      dd.text(mp[e].text, 0, sy * 0.85);
      dd.pop();
    }
  };

  const GeneArray = () => {
    // if (textReceived) {
    //   dump = textReceived.map(txt => {
    //     return {
    //       text: txt,
    //       x: calculatePosition(txt).x,
    //       y: calculatePosition(txt).y
    //     };
    //   });
    // }

    // let p = dump[recentItemNo];
    // if there is a existant array
    // if (mp1) {
    //   mp = mp1;
    // }
    if (!dd.keyIsPressed && dd.mouseMove) {
      let p;
      p = {
        x: Math.floor(Math.abs(dd.mouseX / sx)),
        y: Math.floor(Math.abs(dd.mouseY / sy)),
      };
      const distance = Math.sqrt(
        (p.x - mp[mp.length - 1].x) * (p.x - mp[mp.length - 1].x)
          + (p.y - mp[mp.length - 1].y) * (p.y - mp[mp.length - 1].y),
      );
      if (distance > 0) {
        p.text = texts[Math.floor((dd.width / scaleX) * p.y + p.x)];
        mp.push(p);
        playSound(p.x, p.y);
      } else {
        p = undefined;
      }
    }

    // Array Length Control
    const eee = ((dd.width * dd.height) / (sx * sy)) * 0.22;
    if (mp.length > Math.floor(eee)) {
      setTimeout(() => {
        if (mp.length > 1) {
          mp.splice(0, 1);
        }
      }, 1500);
    }
    if (mp.length > (dd.width * dd.height) / (sx * sy)) {
      mp.splice((dd.width * dd.height) / (sx * sy) - 5, 5);
    }
    if (dd.touches.length > 1) {
      mp.splice(0, 1 + scale2 * scale2);
    }
  };

  const calculatePosition = (letter) => {
    const no = texts.indexOf(letter);
    const y = Math.floor(no / (dd.width / scaleX));
    const x = Math.ceil(no % (dd.width / scaleX));
    return { x, y };
  };

  const RandomBackground = () => {
    if (!dd.stopped) {
      dd.textSize(140 / scale2);
      dd.fill(letterF);
      for (let x = 0; x < dd.width; x += sx) {
        for (let y = 0; y < dd.height; y += sy) {
          if (Math.random() > 0.6) {
            if (Math.random() > 0.8) {
              dd.fill(letterFS);
              dd.text(
                texts[Math.floor(Math.random() * 1000)],
                x,
                y + sy * 0.85,
              );
            } else {
              dd.fill(letterFSR);
              dd.text(texts[Math.floor(Math.random() * 200)], x, y + sy * 0.85);
            }
          } else {
            if (Math.random() > 0.99 && dd.frameCount % 2 === 0) {
              dd.push();
              dd.noStroke();
              dd.fill(120, 70, 120);
              dd.rect(x, y + sy, sx, sy);
              dd.pop();
            }
            dd.text('我', x, y + sy * 0.85);
          }
        }
      }
    }
  };

  const playSound = (x, y) => {
    if (loading === false) {
      // const num = Math.floor(Math.random() * 5);
      // const pan = dd.constrain(dd.map(x, 0, dd.width / sx, -1, 1), -1, 1);
      const rate = (Math.floor((dd.height / sy - y / 2) / 5) + Math.floor(x / 3))
        * 0.618
        * 0.618
        * 0.618;
      if (dd.soundIsLoaded) {
        if (reverse1 === 0) {
          sampler0.triggerAttack(rate * 440 + 10);
        } else if (reverse1 === 1) {
          sampler1.triggerAttack(rate * 440 + 10);
        }
      }
    }
  };

  const Color = (x) => {
    if (x === 1) {
      back = dd.color(8, 61, 169);
      backR = dd.color(255, 255, 100);
      letterF = dd.color(120, 80, 80);
      letterFS = dd.color(120, 80, 80);
      letterFSR = dd.color(40, 50, 30);
      letterFR = dd.color(0);
      eyeF = dd.color(75, 0, 0);
      eyeS = dd.color(215, 120, 30);
      eyeBS = dd.color(200, 200, 250);
      recS = dd.color(0, 0);
      recF = dd.color(218, 65, 103);
      reverse1 = 1;
    } else if (x === 0) {
      back = dd.color(255);
      backR = dd.color(0);
      letterF = dd.color(80, 120, 80);
      letterFS = dd.color(40, 50, 40);
      letterFSR = dd.color(180, 175, 180);
      eyeF = dd.color(255);
      eyeS = dd.color(40, 50, 40);
      eyeBS = dd.color(0);
      letterFR = dd.color(255);
      recS = dd.color(255);
      recF = dd.color(0);
      reverse1 = 0;
    } else if (x === 2) {
      back = dd.color(0);
      backR = dd.color(255);
      letterF = dd.color(80, 120, 80);
      letterFS = dd.color(120, 80, 120);
      letterFSR = dd.color(40, 50, 40);
      letterFR = dd.color(0);
      eyeF = dd.color(0);
      eyeS = dd.color(250, 200, 250);
      eyeBS = dd.color(200, 250, 200);
      recS = dd.color(0, 0);
      recF = dd.color(250, 200, 250);
      reverse1 = 1;
    }
  };

  dd.handleTouchStarted = () => {
    if (
      dd.mouseX < dd.width / 2 - 400 / scale1 + 60
      && dd.mouseX > dd.width / 2 - 400 / scale1 - 60
      && dd.mouseY < 0.4 * dd.height + 35
      && dd.mouseY > 0.4 * dd.height - 300 / scale1
    ) {
      scale2 *= 1.2;
      sx /= 1.2;
      sy /= 1.2;
    }
    if (
      dd.mouseX < dd.width / 2 + 400 / scale1 + 60
      && dd.mouseX > dd.width / 2 + 400 / scale1 - 60
      && dd.mouseY < 0.4 * dd.height + 35
      && dd.mouseY > 0.4 * dd.height - 300 / scale1
    ) {
      scale2 /= 1.2;
      sx *= 1.2;
      sy *= 1.2;
    }
    state = 1;
  };

  dd.handleTouchEnded = () => {
    state = 0;
  };

  dd.windowResized = () => {
    dd.resizeCanvas(dd.windowWidth, dd.windowHeight);
  };

  const setListeners = (divNode, dd) => { //eslint-disable-line
    divNode.addEventListener(
      'click',
      async () => {
        await Tone.start();
        dd.start();
      },
      { once: true, passive: false },
    );
    divNode.addEventListener(
      'touchstart',
      async () => {
        await Tone.start();
        dd.start();
      },
      { once: true, passive: false },
    );
    divNode.addEventListener(
      'touchstart',
      () => {
        dd.handleTouchStarted();
        touched = true;
      },
      {
        passive: false,
      },
    );

    divNode.addEventListener(
      'mousedown',
      () => {
        dd.handleTouchStarted();
        touched = true;
      },
      {
        passive: false,
      },
    );

    divNode.addEventListener('touchend', dd.handleTouchEnded, {
      passive: false,
    });

    divNode.addEventListener('mouseup', dd.handleTouchEnded, {
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
        dd.mouseMove = true;
        ev.preventDefault();
      },
      { passive: false },
    );

    divNode.addEventListener(
      'mousemove',
      (ev) => {
        if (dd.timer) clearTimeout(dd.timer);
        dd.timer = setTimeout(() => {
          dd.mouseMove = false;
        }, 100);
        dd.mouseMove = true;
        ev.preventDefault();
      },
      { passive: false },
    );
  };
  setListeners(divNode, dd);
};

export default eyes;
