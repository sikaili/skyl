import Tone from "tone";
import D3 from "../../sound/light.mp3";
const sampler2 = new Tone.Sampler(
  { D3 },
  {
    onload: () => {
      this.isLoaded = true;
    }
  }
).chain(new Tone.Volume(-12), Tone.Master);
let delegate;
let callback;
let textReceived = `击洋误钟亡鲜异室异急热助型推包商收王接声东建感像即争爱带光受反任门度报则清未支尽章密兰游沉托舰鱼均销笔亡钟亡肉嘴姆嘴圣择剧楚评皇室异急异皇买靠楚编赶词鲜诗湾误洋读阳若略范款减诗洲防研写供族研笑称列族流飞风兵列选飞风企称难东声做且难东声做权且飞风留施续红网继尼施留网送尼调改深吗响调深吗虽响红连步调功红八调红续武续微哪男效男哪射若值射超啊冲啊哥啊冲超索胡压竟银压竟免啊冷细巴细预止严考巴预脑诉严止冷层刘烈户层刘妈疑脑拿注器注较周消台单却界影器消叫听白今叫今叫白结却切白却院单却反界让院却反识须照罗增防族值千防青族值千防青防千愿落青例九字落愿例九例细严仅照具照仅容影语容语站友树坚善央善拿跟周消视远清听才结反界让识具须落九罗候识达带爱增随族供列写流运笑备飞权做务权企选族防千愿细谁益冲啊洋误洋烈杂误诗鲜词藏吉索供写选供仍男钱破继句竟略若益止诉底器越器照写称备兵飞且权`;
textReceived = textReceived.split("");

export function setDelegate(_delegate) {
  delegate = _delegate;
}

export function getCallback(_callback) {
  callback = _callback;
}

export function main(_p5) {
  _p5.stop = () => {
    Tone.context.suspend();
    _p5.remove();
  };

  let recentItemNo = 0;
  let scaleX = 50;
  let back,
    backR,
    letterF,
    letterFR,
    letterFSR,
    letterFS,
    eyeF,
    recS,
    recF,
    eyeS,
    eyeBS;
  let xoff = 0;
  let yoff = 0;
  let state = -1;
  let scale1 = 1;
  let scale2 = 1.2;
  let texts = [];
  let mp = [];
  mp[-1] = { x: -1, y: -1, text: "我" };
  let sx, sy;
  let count1 = -1;
  let count0 = -1;
  let sound = [];
  let soundR = [];
  let loading = true;
  let loading1 = true;
  let loading2 = true;
  let reverse1 = 0;
  let table;

  _p5.preload = () => {
    table = _p5.loadTable("assets/hanziDB.csv", "csv", "header");
  };

  _p5.setup = () => {
    // (function myLoop(i) {
    //   setTimeout(function() {
    //     recentItemNo++;
    //     if (--i) myLoop(i);
    //   }, 100);
    // })(textReceived.length - 1);
    for (var mm = 0; mm < 6; mm++) {
      // _p5.loadSound("assets/A" + mm + ".m4a", songLoad);
    }
    for (let t = 6; t < 12; t++) {
      // _p5.loadSound("assets/A" + mm + ".m4a", songLoadR);
    }
    for (let e = 0; e < 5000; e++) {
      let m = _p5.split(table.getString(e, 0), ";");
      texts[e] = m[1];
    }
    // _p5.frameRate(30);
    _p5.pixelDensity(1);
    _p5.createCanvas(_p5.windowWidth, _p5.windowHeight);

    if (_p5.width < 1500) {
      scale1 = 1500 / _p5.width;
    }
    scale2 = ((1334 * 750) / (_p5.width * _p5.height)) * 1.8;
    if (_p5.width > 1600) {
      scale2 = 4;
    }
    sx = 150 / scale2;
    sy = 150 / scale2;
    _p5.mouseX = _p5.width / 2;
    _p5.mouseY = _p5.height * 0.3;
  };

  _p5.draw = () => {
    if (loading && loading1 == false && loading2 == false) {
      loading = false;
    }
    if (scale2 > 9 || scale2 < 0.3) {
      scale2 = 2;
      sx = 150 / scale2;
      sy = 150 / scale2;
    }

    Color(Math.floor((_p5.frameCount / 150) % 3));
    GeneArray();
    if (_p5.frameCount % 2 == 0) {
      if (state == 1 && Math.random() > 0.95) {
        _p5.background(backR);
      }
      _p5.background(back);
      RandomBackground();
    }
    displayHighLightedText();
    // "+""-"
    Eye(_p5.width / 2 - 400 / scale1, _p5.height / 2 - _p5.height * 0.1, "+");
    Eye(_p5.width / 2 + 400 / scale1, _p5.height / 2 - _p5.height * 0.1, "-");
    if (delegate === 5) {
      callback(sx);
      _p5.clear();
      _p5.remove();
    }
    if (delegate === 3 && _p5.frameCount % 2 == 0) {
      let text = mp.map(a => a.text);
      text = text.join("");
      callback(text);
    }
  };

  const displayHighLightedText = () => {
    // traite array, draw _p5.rect and texts highlight;
    for (let e = 0; e < mp.length; e++) {
      _p5.push();

      let nx = mp[e].x;
      let ny = mp[e].y;
      _p5.translate(nx * sx, ny * sy);
      // text random size +
      if (e == mp.length - 1) {
        _p5.scale(_p5.random(2, 2.2));
      } else {
        _p5.scale(_p5.random(1, 1.0 + e / mp.length / 10));
      }
      // rect background
      _p5.stroke(recS);
      _p5.strokeWeight(2);
      _p5.fill(recF);
      _p5.rect(0, 0, sx, sy);
      // text high lighted
      _p5.fill(letterFR);
      _p5.noStroke();
      _p5.textSize(140 / scale2);
      _p5.text(mp[e].text, 0, sy * 0.85);
      _p5.pop();
    }
  };

  const GeneArray = () => {
    let dump = textReceived.map(txt => {
      return {
        text: txt,
        x: calculatePosition(txt).x,
        y: calculatePosition(txt).y
      };
    });

    let p = dump[recentItemNo];
    // if there is a existant array
    // if (mp1) {
    //   mp = mp1;
    // }
    if (!_p5.keyIsPressed) {
      p = {
        x: Math.floor(Math.abs(_p5.mouseX / sx)),
        y: Math.floor(Math.abs(_p5.mouseY / sy))
      };
      let distance = Math.sqrt(
        (p.x - mp[mp.length - 1].x) * (p.x - mp[mp.length - 1].x) +
          (p.y - mp[mp.length - 1].y) * (p.y - mp[mp.length - 1].y)
      );
      if (distance > 0) {
        p.text = texts[Math.floor((_p5.width / scaleX) * p.y + p.x)];
        mp.push(p);
        // _p5.mouseX = _p5.constrain(p.x * sx, 0, _p5.width);
        // _p5.mouseY = _p5.constrain(p.y * sy, 0, _p5.height);
        // Select & Play Sound
        playSound(p.x, p.y);
      }
    }

    // Array Length Control
    let eee = ((_p5.width * _p5.height) / (sx * sy)) * 0.22;
    if (mp.length > Math.floor(eee)) {
      setTimeout(function() {
        if (mp.length > 1) {
          mp.splice(0, 1);
        }
      }, 1500);
    }
    if (mp.length > (_p5.width * _p5.height) / (sx * sy)) {
      mp.splice((_p5.width * _p5.height) / (sx * sy) - 5, 5);
    }
    if (_p5.touches.length > 1) {
      mp.splice(0, 1 + scale2 * scale2);
    }
  };

  const calculatePosition = letter => {
    let no = texts.indexOf(letter);
    let y = Math.floor(no / (_p5.width / scaleX));
    let x = Math.ceil(no % (_p5.width / scaleX));
    return { x, y };
  };

  const RandomBackground = () => {
    _p5.textSize(140 / scale2);
    _p5.fill(letterF);
    for (let x = 0; x < _p5.width; x += sx) {
      for (let y = 0; y < _p5.height; y += sy) {
        if (Math.random() > 0.6) {
          if (Math.random() > 0.8) {
            _p5.fill(letterFS);
            _p5.text(texts[Math.floor(Math.random() * 1000)], x, y + sy * 0.85);
          } else {
            _p5.fill(letterFSR);
            _p5.text(texts[Math.floor(Math.random() * 200)], x, y + sy * 0.85);
          }
        } else {
          if (Math.random() > 0.99) {
            _p5.push();
            _p5.noStroke();
            _p5.fill(120, 70, 120);
            _p5.rect(x, y + sy, sx, sy);
            _p5.pop();
          }
          _p5.text("我", x, y + sy * 0.85);
        }
      }
    }
  };

  const playSound = (x, y) => {
    if (loading == false) {
      let num = Math.floor(Math.random() * 5);
      let pan = _p5.constrain(_p5.map(x, 0, _p5.width / sx, -1, 1), -1, 1);
      if (reverse1 == 0) {
        sound[num].pan(pan);
        let rate =
          (Math.floor((_p5.height / sy - y / 2) / 5) + Math.floor(x / 3)) *
          0.618 *
          0.618 *
          0.618;
        sampler2.triggerAttack(rate);
      } else if (reverse1 == 1) {
        soundR[num].pan(pan);
        soundR[num].rate(
          (Math.floor((_p5.height / sy - 1 - y / 2) / 5) + Math.floor(x / 3)) *
            0.618 *
            0.618 *
            0.618
        );
        soundR[num].play();
      }
    }
  };

  const Color = x => {
    if (x == 1) {
      back = _p5.color(8, 61, 169);
      backR = _p5.color(255, 255, 100);
      letterF = _p5.color(120, 80, 80);
      letterFS = _p5.color(120, 80, 80);
      letterFSR = _p5.color(40, 50, 30);
      letterFR = _p5.color(0);
      eyeF = _p5.color(75, 0, 0);
      eyeS = _p5.color(215, 120, 30);
      eyeBS = _p5.color(200, 200, 250);
      recS = _p5.color(0, 0);
      recF = _p5.color(218, 65, 103);
      reverse1 = 1;
    } else if (x == 0) {
      back = _p5.color(255);
      backR = _p5.color(0);
      letterF = _p5.color(80, 120, 80);
      letterFS = _p5.color(40, 50, 40);
      letterFSR = _p5.color(180, 175, 180);
      eyeF = _p5.color(255);
      eyeS = _p5.color(40, 50, 40);
      eyeBS = _p5.color(0);
      letterFR = _p5.color(255);
      recS = _p5.color(255);
      recF = _p5.color(0);
      reverse1 = 0;
    } else if (x == 2) {
      back = _p5.color(0);
      backR = _p5.color(255);
      letterF = _p5.color(80, 120, 80);
      letterFS = _p5.color(120, 80, 120);
      letterFSR = _p5.color(40, 50, 40);
      letterFR = _p5.color(0);
      eyeF = _p5.color(0);
      eyeS = _p5.color(250, 200, 250);
      eyeBS = _p5.color(200, 250, 200);
      recS = _p5.color(0, 0);
      recF = _p5.color(250, 200, 250);
      reverse1 = 1;
    }
  };

  function Eye(x, y, tx) {
    _p5.push();
    _p5.stroke(eyeS);
    let rr = 120 / scale1;
    let r = 100 / scale1;
    let per = 200 / scale1;
    let ii = 1;
    //touched
    if (state == 1) {
      rr = rr * 1.2;
      r = r * 1.15;
      ii = ii * 1.15;
    }
    _p5.translate(x, y);
    _p5.beginShape();
    _p5.vertex((-(_p5.PI - 0.1) * per) / 2, 0);
    _p5.strokeWeight(7);
    //above line
    for (let theta1 = 0.05; theta1 < _p5.PI - 0.05; theta1 += 0.1) {
      let n2 = _p5.map(Math.sin(_p5.frameCount / 20), -1, 1, -5, 5);
      let yy2 =
        ((-rr * 13) / 12) * Math.sin(theta1) +
        _p5.random(-5, 5) / scale1 -
        Math.abs(_p5.mouseY - _p5.height / 2) / 200;
      let yy3 = rr * Math.sin(theta1);
      _p5.vertex(theta1 * per - ((_p5.PI - 0.1) * per) / 2 + n2, yy2 + n2);
      if (Math.random() > 0.999) {
        _p5.vertex(
          theta1 * per - ((_p5.PI - 0.1) * per) / 2 + n2,
          yy2 - (Math.random() + 1) * 20
        );
      }
      if (Math.random() > 0.98) {
        _p5.vertex(theta1 * per - ((_p5.PI - 0.1) * per) / 2 + n2, yy3);
      }
    }
    _p5.fill(eyeF);
    // below line
    for (let theta11 = _p5.PI - 0.05; theta11 > 0.05; theta11 -= 0.1) {
      let n21 = _p5.map(Math.sin(_p5.frameCount / 20), -1, 1, -5, 5);
      let yy21 = ((-rr * 13) / 12) * Math.sin(theta11) + _p5.random(-5, 5);
      _p5.vertex(theta11 * per - ((_p5.PI - 0.1) * per) / 2 + n21, -yy21);
    }
    _p5.vertex((-(_p5.PI - 0.1) * per) / 2, 0);
    _p5.endShape();
    // TEXT +-
    _p5.textSize(180 / scale1 + Math.random() * 20);
    _p5.strokeWeight(20);
    if (Math.random() > 0.7) {
      _p5.stroke(eyeS);
    } else {
      _p5.stroke(eyeBS);
    }
    _p5.text(
      tx,
      -20 - (_p5.mouseX - _p5.width / 2) / 30,
      -rr - (0.9 * rr) / _p5.constrain(scale1, 1.3, 100)
    );
    _p5.strokeWeight(1);
    _p5.noFill();
    _p5.beginShape();
    yoff += 0.1;
    for (let i = 0; i < 2 * _p5.PI + 0.01; i += 0.005) {
      _p5.stroke(eyeBS);
      //black OUT LINE
      let n1 = _p5.noise(xoff, yoff);
      let x1 =
        r * Math.sin(i) +
        _p5.map(n1, 0, 1, -10, 10) / scale1 +
        (_p5.mouseX - _p5.width / 2) / 13;
      let y1 =
        r * Math.cos(i) +
        _p5.map(n1, 0, 1, -20, 10) / scale1 +
        (_p5.mouseY - _p5.height / 2) / 25;
      // y1 = 0;
      xoff += 0.008;
      _p5.vertex(x1, y1);
      // EYE LINES, WHITE SPOT MOVING
      if (Math.random() > 0.4) {
        _p5.vertex(
          (x1 / 2.5) * ii + (_p5.mouseX - _p5.width / 2) / 25,
          y1 / 2 + (_p5.mouseY - _p5.height / 2) / 25
        );
      }
    }
    _p5.endShape();
    _p5.pop();
  }

  function songLoad(song) {
    count1 += 1;
    sound[count1] = song;
    sound[count1].setVolume(1.0);
    if (count1 == 5) {
      loading1 = false;
    }
  }

  function songLoadR(song) {
    count0 += 1;
    soundR[count0] = song;
    soundR[count0].setVolume(1.0);
    if (count0 == 5) {
      loading2 = false;
    }
  }
  _p5.touchStarted = () => {
    if (
      _p5.mouseX < _p5.width / 2 - 400 / scale1 + 60 &&
      _p5.mouseX > _p5.width / 2 - 400 / scale1 - 60 &&
      _p5.mouseY < 0.4 * _p5.height + 35 &&
      _p5.mouseY > 0.4 * _p5.height - 300 / scale1
    ) {
      scale2 *= 1.5;
      sx = sx / 1.5;
      sy = sy / 1.5;
    }
    if (
      _p5.mouseX < _p5.width / 2 + 400 / scale1 + 60 &&
      _p5.mouseX > _p5.width / 2 + 400 / scale1 - 60 &&
      _p5.mouseY < 0.4 * _p5.height + 35 &&
      _p5.mouseY > 0.4 * _p5.height - 300 / scale1
    ) {
      scale2 /= 1.5;
      sx = sx * 1.5;
      sy = sy * 1.5;
    }
    state = 1;
  };

  _p5.touchEnded = () => {
    state = 0;
  };

  _p5.windowResized = () => {
    _p5.resizeCanvas(_p5.windowWidth, _p5.windowHeight);
  };
}

document.addEventListener(
  "ontouchmove",
  function(e) {
    e.preventDefault();
  },
  {
    passive: false
  }
);
document.addEventListener(
  "touchmove",
  function(n) {
    n.preventDefault();
  },
  {
    passive: false
  }
);
