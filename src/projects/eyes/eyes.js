import Tone from 'tone';
import F3 from './sound/light.mp3';
import A3 from './sound/chasing.mp3';
import E3 from './sound/bouton_reverb.mp3';
import texts from './assets/hanzi.json';

console.log('import eyes');
const eyes = (instance) => {
  const sk = instance;
  const divNode = document.querySelector('#canvasContainer');
  const sampler0 = new Tone.Sampler(
    { F3, A3 },
    {
      onload: () => {
        sk.soundIsLoaded = true;
      },
    },
  ).chain(new Tone.Volume(-12), Tone.Master);
  const sampler1 = new Tone.Sampler(
    { E3 },
    {
      onload: () => {
        sk.soundIsLoaded = true;
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
      sk.push();
      sk.stroke(eyeS);
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
      sk.translate(this.x, this.y);
      sk.beginShape();
      sk.vertex((-(sk.PI - 0.1) * per) / 2, 0);
      sk.strokeWeight(sk.width < 700 ? 3 : 8);
      // above line
      for (let theta1 = 0.05; theta1 < sk.PI - 0.05; theta1 += 0.1) {
        const n2 = sk.map(Math.sin(sk.frameCount / 40), -1, 1, -3, 3);
        const yy2 = ((-rr * 13) / 12) * Math.sin(theta1)
          + sk.random(-5, 5) / scale1
          - Math.abs(sk.mouseY - sk.height / 2) / 60;
        const yy3 = rr * Math.sin(theta1);
        sk.vertex(theta1 * per - ((sk.PI - 0.1) * per) / 2 + n2, yy2 + n2);
        if (Math.random() > 0.999) {
          sk.vertex(
            theta1 * per - ((sk.PI - 0.1) * per) / 2 + n2,
            yy2 - (Math.random() + 1) * 20,
          );
        }
        if (Math.random() > 0.99) {
          sk.vertex(theta1 * per - ((sk.PI - 0.1) * per) / 2 + n2, yy3);
        }
      }
      sk.fill(eyeF);
      // below line
      for (let theta11 = sk.PI - 0.05; theta11 > 0.05; theta11 -= 0.1) {
        const n21 = sk.map(Math.sin(sk.frameCount / 30), -1, 1, -5, 5);
        const yy21 = ((-rr * 13) / 12) * Math.sin(theta11) + sk.random(-3, 3);
        sk.vertex(theta11 * per - ((sk.PI - 0.1) * per) / 2 + n21, -yy21);
      }
      sk.vertex((-(sk.PI - 0.1) * per) / 2, 0);
      sk.endShape();
      // TEXT +-
      sk.textSize(180 / scale1 + Math.random() * 10);
      sk.strokeWeight(sk.width < 700 ? 10 : 25);
      if (Math.random() > 0.7) {
        sk.stroke(eyeS);
      } else {
        sk.stroke(eyeBS);
      }
      sk.text(
        this.tx,
        -20 - (sk.mouseX - sk.width / 2) / 30,
        -rr - (0.9 * rr) / sk.constrain(scale1, 1.3, 100),
      );
      sk.strokeWeight(1);
      sk.noFill();
      sk.beginShape();
      yoff += 0.1;
      for (let i = 0; i < 2 * sk.PI + 0.01; i += 0.005) {
        sk.stroke(eyeBS);
        // black OUT LINE
        const n1 = sk.noise(xoff, yoff);
        const x1 = r * Math.sin(i)
          + sk.map(n1, 0, 1, -10, 10) / scale1
          + (sk.mouseX - sk.width / 2) / 13;
        const y1 = r * Math.cos(i)
          + sk.map(n1, 0, 1, -20, 10) / scale1
          + (sk.mouseY - sk.height / 2) / 25;
        // y1 = 0;
        xoff += 0.008;
        sk.vertex(x1, y1);
        // EYE LINES, WHITE SPOT MOVING
        if (Math.random() > 0.4) {
          sk.vertex(
            (x1 / 2.5) * ii + (sk.mouseX - sk.width / 2) / 25,
            y1 / 2 + (sk.mouseY - sk.height / 2) / 25,
          );
        }
      }
      sk.endShape();
      sk.pop();
    }
  }
  sk.stop = () => {
    console.log('eyes is killed');
    sk.stopped = true;
    sk.noLoop();
    sk.eyeRight = null;
    sk.eyeLeft = null;
    sampler0.dispose();
    sampler1.dispose();
    Tone.context.suspend();
    sk.remove();
    Object.entries((prop) => delete sk[prop]);
  };

  sk.start = () => {
    sk.loop();
  };

  sk.setup = () => {
    const canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight);
    canvas.id = Math.random().toFixed(2);
    console.log('setup eyes');
    if (sk.width > 768) {
      sk.pixelDensity(1.0);
    }
    if (sk.width < 1500) {
      scale1 = 1500 / sk.width;
    }
    scale2 = ((1334 * 750) / (sk.width * sk.height)) * 1.8;
    if (sk.width > 1600) {
      scale2 = 4;
    }
    sx = 150 / scale2;
    sy = 150 / scale2;
    sk.mouseX = sk.width / 2;
    sk.mouseY = sk.height * 0.3;

    sk.eyeLeft = new Eye(
      sk.width / 2 - 400 / scale1,
      sk.height / 2 - sk.height * 0.1,
      '+',
    );
    sk.eyeRight = new Eye(
      sk.width / 2 + 400 / scale1,
      sk.height / 2 - sk.height * 0.1,
      '-',
    );
  };

  sk.draw = () => {
    if (!sk.stopped) {
      if (loading && loading1 === false && loading2 === false) {
        loading = false;
      }
      if (scale2 > 12 || scale2 < 0.8) {
        scale2 = sk.width > 700 ? 3 : 5;
        sx = 150 / scale2;
        sy = 150 / scale2;
      }

      Color(Math.floor((sk.frameCount / 150) % 3));
      GeneArray();
      if (sk.frameCount % 2 === 0) {
        if (state === 1 && Math.random() > 0.95) {
          sk.background(backR);
        }
        sk.background(back);
        RandomBackground();
      }
      displayHighLightedText();
      // "+""-"
      if (sk.eyeRight) {
        sk.eyeRight.display();
        sk.eyeLeft.display();
      }
    }
  };

  const displayHighLightedText = () => {
    // traite array, draw sk.rect and texts highlight;
    for (let e = 0; e < mp.length; e += 1) {
      sk.push();

      const nx = mp[e].x;
      const ny = mp[e].y;
      sk.translate(nx * sx, ny * sy);
      // text random size +
      if (e === mp.length - 1) {
        sk.scale(sk.random(2, 2.2));
      } else {
        sk.scale(sk.random(1, 1.0 + e / mp.length / 10));
      }
      // rect background
      sk.stroke(recS);
      sk.strokeWeight(2);
      sk.fill(recF);
      sk.rect(0, 0, sx, sy);
      // text high lighted
      sk.fill(letterFR);
      sk.noStroke();
      sk.textSize(140 / scale2);
      sk.text(mp[e].text, 0, sy * 0.85);
      sk.pop();
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
    if (!sk.keyIsPressed && sk.mouseMove) {
      let p;
      p = {
        x: Math.floor(Math.abs(sk.mouseX / sx)),
        y: Math.floor(Math.abs(sk.mouseY / sy)),
      };
      const distance = Math.sqrt(
        (p.x - mp[mp.length - 1].x) * (p.x - mp[mp.length - 1].x)
          + (p.y - mp[mp.length - 1].y) * (p.y - mp[mp.length - 1].y),
      );
      if (distance > 0) {
        p.text = texts[Math.floor((sk.width / scaleX) * p.y + p.x)];
        mp.push(p);
        playSound(p.x, p.y);
      } else {
        p = undefined;
      }
    }

    // Array Length Control
    const eee = ((sk.width * sk.height) / (sx * sy)) * 0.22;
    if (mp.length > Math.floor(eee)) {
      setTimeout(() => {
        if (mp.length > 1) {
          mp.splice(0, 1);
        }
      }, 1500);
    }
    if (mp.length > (sk.width * sk.height) / (sx * sy)) {
      mp.splice((sk.width * sk.height) / (sx * sy) - 5, 5);
    }
    if (sk.touches.length > 1) {
      mp.splice(0, 1 + scale2 * scale2);
    }
  };

  const calculatePosition = (letter) => {
    const no = texts.indexOf(letter);
    const y = Math.floor(no / (sk.width / scaleX));
    const x = Math.ceil(no % (sk.width / scaleX));
    return { x, y };
  };

  const RandomBackground = () => {
    if (!sk.stopped) {
      sk.textSize(140 / scale2);
      sk.fill(letterF);
      for (let x = 0; x < sk.width; x += sx) {
        for (let y = 0; y < sk.height; y += sy) {
          if (Math.random() > 0.6) {
            if (Math.random() > 0.8) {
              sk.fill(letterFS);
              sk.text(
                texts[Math.floor(Math.random() * 1000)],
                x,
                y + sy * 0.85,
              );
            } else {
              sk.fill(letterFSR);
              sk.text(texts[Math.floor(Math.random() * 200)], x, y + sy * 0.85);
            }
          } else {
            if (Math.random() > 0.99 && sk.frameCount % 2 === 0) {
              sk.push();
              sk.noStroke();
              sk.fill(120, 70, 120);
              sk.rect(x, y + sy, sx, sy);
              sk.pop();
            }
            sk.text('我', x, y + sy * 0.85);
          }
        }
      }
    }
  };

  const playSound = (x, y) => {
    if (loading === false) {
      // const num = Math.floor(Math.random() * 5);
      // const pan = sk.constrain(sk.map(x, 0, sk.width / sx, -1, 1), -1, 1);
      const rate = (Math.floor((sk.height / sy - y / 2) / 5) + Math.floor(x / 3))
        * 0.618
        * 0.618
        * 0.618;
      if (sk.soundIsLoaded) {
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
      back = sk.color(8, 61, 169);
      backR = sk.color(255, 255, 100);
      letterF = sk.color(120, 80, 80);
      letterFS = sk.color(120, 80, 80);
      letterFSR = sk.color(40, 50, 30);
      letterFR = sk.color(0);
      eyeF = sk.color(75, 0, 0);
      eyeS = sk.color(215, 120, 30);
      eyeBS = sk.color(200, 200, 250);
      recS = sk.color(0, 0);
      recF = sk.color(218, 65, 103);
      reverse1 = 1;
    } else if (x === 0) {
      back = sk.color(255);
      backR = sk.color(0);
      letterF = sk.color(80, 120, 80);
      letterFS = sk.color(40, 50, 40);
      letterFSR = sk.color(180, 175, 180);
      eyeF = sk.color(255);
      eyeS = sk.color(40, 50, 40);
      eyeBS = sk.color(0);
      letterFR = sk.color(255);
      recS = sk.color(255);
      recF = sk.color(0);
      reverse1 = 0;
    } else if (x === 2) {
      back = sk.color(0);
      backR = sk.color(255);
      letterF = sk.color(80, 120, 80);
      letterFS = sk.color(120, 80, 120);
      letterFSR = sk.color(40, 50, 40);
      letterFR = sk.color(0);
      eyeF = sk.color(0);
      eyeS = sk.color(250, 200, 250);
      eyeBS = sk.color(200, 250, 200);
      recS = sk.color(0, 0);
      recF = sk.color(250, 200, 250);
      reverse1 = 1;
    }
  };

  sk.handleTouchStart = () => {
    if (
      sk.mouseX < sk.width / 2 - 400 / scale1 + 60
      && sk.mouseX > sk.width / 2 - 400 / scale1 - 60
      && sk.mouseY < 0.4 * sk.height + 35
      && sk.mouseY > 0.4 * sk.height - 300 / scale1
    ) {
      scale2 *= 1.2;
      sx /= 1.2;
      sy /= 1.2;
    }
    if (
      sk.mouseX < sk.width / 2 + 400 / scale1 + 60
      && sk.mouseX > sk.width / 2 + 400 / scale1 - 60
      && sk.mouseY < 0.4 * sk.height + 35
      && sk.mouseY > 0.4 * sk.height - 300 / scale1
    ) {
      scale2 /= 1.2;
      sx *= 1.2;
      sy *= 1.2;
    }
    state = 1;
  };

  sk.handleTouchEnd = () => {
    state = 0;
  };

  const setListeners = (divNode, sk) => { //eslint-disable-line
    divNode.addEventListener(
      'click',
      async () => {
        await Tone.start();
        sk.start();
      },
      { once: true, passive: false },
    );
    divNode.addEventListener(
      'touchstart',
      async () => {
        await Tone.start();
        sk.start();
      },
      { once: true, passive: false },
    );
    divNode.addEventListener(
      'touchstart',
      () => {
        sk.handleTouchStart();
        touched = true;
      },
      {
        passive: false,
      },
    );

    divNode.addEventListener(
      'mousedown',
      () => {
        sk.handleTouchStart();
        touched = true;
      },
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
      (ev) => {
        sk.mouseMove = true;
        ev.preventDefault();
      },
      { passive: false },
    );

    divNode.addEventListener(
      'mousemove',
      (ev) => {
        if (sk.timer) clearTimeout(sk.timer);
        sk.timer = setTimeout(() => {
          sk.mouseMove = false;
        }, 100);
        sk.mouseMove = true;
        ev.preventDefault();
      },
      { passive: false },
    );
  };
  setListeners(divNode, sk);
};

export default eyes;
