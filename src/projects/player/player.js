import p5 from 'p5/lib/p5.min';
import Tone from 'tone';
import PeakDetect from '@/js/utlis/PeakDetect';

export default function (sk) {
  console.log('player setup');
  sk.settings = {
    list: {
      current: '',
      items: ['Amarrage', 'Rotation', 'La-Danse', 'flower', 'saturation-chinoise', '2019-12-YeChe', 'Rain-Addiction', 'Emb', 'c-syn', 'e-minor'],
    },
    red: {
      value: 255,
      type: 'range',
      max: 255,
      min: 0,
      step: 1,
    },
    green: {
      value: 50,
      type: 'range',
      max: 155,
      min: 0,
      step: 1,
    },
    blue: {
      value: 50,
      type: 'range',
      max: 255,
      min: 0,
      step: 1,
    },
    freq1: {
      value: 500,
      // type: 'range',
      max: 950,
      min: 50,
      step: 50,
    },
    freq2: {
      value: 200,
      // type: 'range',
      max: 950,
      min: 50,
      step: 50,
    },
    grey: false,
    get getColor() { return [this.red.value, this.green.value, this.blue.value] || [255, 50, 50]; },
  };
  const divNode = document.querySelector('#canvasContainer');
  const fft = new Tone.FFT();
  const circleCenterR = sk.width > 768 ? 250 : 150;
  let peakDetect;
  let soundIsLoading;
  let state = -1;
  let noParticles = 0;
  let songPlayed = -1;
  let nos = 0;
  let xoff = 0;
  let particles = [];
  let forceDirection = -1;
  sk.settings.list.current = 'Amarrage';
  if (vm.$route.query.id && typeof vm.$route.query.id === 'string') {
    sk.settings.list.current = vm.$route.query.id;
  } else {
    vm.$router.push({ query: { id: sk.settings.list.current } });
  }

  let player;

  sk.setSong = (songId) => {
    sk.settings.list.current = songId;
    songId = songId.toLowerCase();
    const sound = () => import('./sound/' + songId + '.m4a'); //eslint-disable-line
    sound().then((module) => {
      const soundFile = module.default;
      state = -1;
      songPlayed = -1;
      soundIsLoading = true;
      if (player) {
        player.disconnect(fft);
        player.disconnect();
        player.dispose();
      }
      player = new Tone.Player(soundFile, () => { soundIsLoading = false; }).toMaster();
      player.connect(fft);
    });
    switch (songId) {
      case 'rotation':
      case 'amarrage':
        sk.settings.grey = true;
        sk.settings.freq1.vale = 300;
        sk.settings.freq2.vale = 650;
        break;
      default:
        sk.settings.grey = false;
        break;
    }
  };

  sk.setSong(sk.settings.list.current);


  sk.stop = () => {
    sk.stopped = true;
    sk.noLoop();
    player.disconnect();
    player.dispose();
    fft.dispose();
    Tone.context.suspend();
    sk.remove();
    particles = [];
    Object.entries((prop) => delete sk[prop]);
    console.log('player is killed');
  };

  class Particle {
    constructor(x, y, m, r) {
      this.pos = sk.createVector(x, y);
      this.mass = m;
      this.vel = sk.createVector(3, 3);
      this.acc = sk.createVector(0, 0);
      this.r = r * m * (sk.width > 768 ? 1 : 0.5);

      this.maxSpeed = (sk.width > 768 ? 6 : 2.5);
      this.count = 0;
      this.his = [];
    }

    applyForce(force) {
      const f = force.copy();
      this.force = p5.Vector.div(f, this.mass);
      this.acc.add(this.force);
    }

    bord() {
      if (this.pos.x - this.r / 2 > sk.width) {
        this.pos.x = -this.r / 2;
      }
      if (this.pos.y - this.r / 2 > sk.height) {
        this.pos.y = -this.r / 2;
      }
      if (this.pos.x + this.r / 2 < 0) {
        this.pos.x = sk.width + this.r / 2;
      }
      if (this.pos.y + this.r / 2 < 0) {
        this.pos.y = sk.height + this.r / 2;
      }
    }

    steering(p, m, o, _sum1) {
      const distance = p5.Vector.dist(this.pos, p);
      const target = p.copy();
      target.sub(this.pos);
      target.normalize();
      target.mult(this.maxSpeed);
      const steer = p5.Vector.sub(target, this.velocity);
      if (o === -1) {
        if (distance < circleCenterR) {
          steer.mult(circleCenterR / distance * -1 * m);
        } else {
          steer.mult(1);
        }
      }
      if (o === 1) {
        if (distance > 300 + _sum1 * 2 && distance < sk.width / 2) {
          steer.mult(20);
        } else if (distance > (sk.width + sk.height) / 3) {
          steer.mult(-0.5);
        } else {
          steer.mult(-5);
        }
      }
      this.applyForce(steer);
    }

    separation(particles, sum1, sum, _nn) {
      this.disRange = 0;
      const targetAll = sk.createVector();
      let count = 0;
      for (let j = 0; j < particles.length; j += 1) {
        this.disRange = (this.r + particles[j].r) / sk.map(sum1, 0, 255, 0, 5);
        const distance = p5.Vector.dist(this.pos, particles[j].pos);
        const heading = p5.Vector.sub(this.pos, particles[j].pos).heading();
        let angle = sk.map(sum1, 0, 128, -sk.PI / 8, sk.PI / 8);
        if (state === 1) {
          angle = sk.atan2(sk.mouseY - sk.height / 2, sk.mouseX - sk.width / 2);
        }
        // letters
        // if (((distance > 395 && distance < 200 * sk.constrain(this.mass, 0, 6)) || state === 1 || this.mass > 15) && ((heading < 0.03 * sk.PI + angle && heading > -0.03 * sk.PI + angle) || (this.mass > 16 && particles[j].mass > 10))) {
        //   sum1 = sk.constrain(sum1, 50, 250);
        //   sk.stroke(sk.random(400) - sum1, sum1);
        //   if (Math.random() > 0.9) {
        //     sk.stroke(0);
        //   }
        //   sk.strokeWeight(sk.constrain(this.mass * (sk.width > 768 ? 1 : 0.3), 1, 4));
        //   if (state === 1) {
        //     if (Math.random() > 0.2 && distance > 400) {
        //       sk.line(particles[j].pos.x, particles[j].pos.y, this.pos.x, this.pos.y);
        //     }
        //   } else {
        //     sk.line(particles[j].pos.x, particles[j].pos.y, this.pos.x, this.pos.y);
        //   }
        //   if (Math.random() > 0.94) {
        //     sk.strokeWeight(0.5);
        //     sk.stroke(50, sk.random(500), sk.random(500));
        //     sk.fill(0, 0);
        //     sk.bezier(this.pos.x, this.pos.y, sk.width / 2, sk.height / 2, sk.mouseX, sk.mouseY, particles[j].pos.x, particles[j].pos.y);
        //   }
        // }
        if (distance > 0 && distance < this.disRange) {
          const targetS = p5.Vector.sub(particles[j].pos, this.pos);
          targetS.div(distance * -1);
          targetAll.add(targetS);
          count += 1;
        }
        if (count > 0) {
          targetAll.div(count);
          targetAll.normalize();
          targetAll.mult(this.maxSpeed);
          const steer = p5.Vector.sub(targetAll, this.velocity);
          this.applyForce(steer.div(5));
        }
      }
    }

    fluide() {
      const center = sk.createVector(sk.width / 2, sk.height / 2);
      const distanceC = p5.Vector.dist(this.pos, center);
      if (distanceC < (sk.height + sk.width) / 2 * 0.35) {
        const stren = this.vel.mag();
        const strength = stren * stren / 5;
        const force1 = this.vel.copy();
        force1.setMag(strength * 4);
        force1.mult(-1);
        this.applyForce(force1);
      }
    }

    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
      const v = sk.createVector(this.pos.x, this.pos.y);
      this.his.push(v);
      if (this.his.length > 10) {
        this.his.splice(0, 9);
      }
    }

    display(sum, sum1) {
      sk.push();
      const m = sum / 3;
      sum1 = sk.constrain(sum1, 0, 100);
      const theta = this.vel.heading() + 0.5 * sk.PI;
      sk.strokeWeight(sk.width > 768 ? 1 + this.mass : 1);
      sk.stroke((255 - sk.settings.getColor[0]) + 15 + this.mass * 3 + sk.noise(this.pos.y, this.pos.x) * 125 + sum1 / 2, (50 - sk.settings.getColor[1]) + sum1 / 10 + sk.noise(this.vel.mag()) * 220 - this.mass * 35 + sum / 1.2, sum / 1.2 - sum / 2.5 - sum1 / 1.2 + 250 / this.mass + sk.settings.getColor[2] - 20);
      // small ones
      if (Math.random() * sum > 120) {
        sk.fill(-sum1 / 2 + sum + sk.noise(this.pos.y, this.pos.y) * (sk.settings.getColor[0] - 100), sum1 + sk.noise(this.pos.x) * (sk.settings.getColor[1] + 100), sum1 / 3 + (sk.settings.getColor[2] + 100));
        if (Math.random() > 0.7) {
          sk.fill(sk.settings.getColor[0] - 75, sk.settings.getColor[1], sk.settings.getColor[2]);
        }
      } else {
        sk.fill(sk.settings.getColor[0] - 155, sk.noise(this.pos.x) * 255, 255 - sk.noise(this.pos.x) * 255, 30);
      }
      // big ones
      if (this.mass > 4) {
        sk.fill(sk.settings.getColor[0], sk.settings.getColor[1], sk.settings.getColor[2], 180);
        sk.noStroke();
      }
      sk.ellipse(this.pos.x, this.pos.y, this.r + m, this.r + m);
      sk.fill(0, 140);
      sk.stroke(200, 140 / this.mass);
      sk.strokeWeight(1);
      sk.translate(this.pos.x, this.pos.y);
      sk.rotate(theta);
      sk.line(0, (this.r + m / 2) * 0.4, 0, (-this.r - m / 2) * 0.4);
      sk.pop();
      for (let i = 0; i < this.his.length; i += 1) {
        sk.point(this.his[i].x, this.his[i].y);
      }
    }
  }

  const addParticles = (_da) => {
    if (_da) {
      if (_da === 2) {
        sk.background(0, 40);
        for (let m = 0; m < 17; m += 1) {
          const newParticle = new Particle(sk.random(sk.width), sk.random(sk.height), sk.random(0, 3), 20);
          particles.push(newParticle);
        }
      } else {
        for (let m = 0; m < 3; m += 1) {
          const newParticle = new Particle(sk.width / 2, sk.height / 2, sk.random(3, 12), 20);
          particles.push(newParticle);
        }
        noParticles += 1;
        if (noParticles > 24) {
          particles.splice(0, particles.length - 1);
          for (let n = 0; n < 5; n += 1) {
            addParticles(2);
          }
          noParticles = 0;
        }
      }
    } else {
      if (sk.touches.length === 0) {
        for (let m = 0; m < 20; m += 1) {
          const newParticle = new Particle(sk.mouseX, sk.mouseY, sk.random(1, 3), 20);
          particles.push(newParticle);
        }
      }
      for (let e = 0; e < sk.touches.length; e += 1) {
        for (let m = 0; m < 20; m += 1) {
          const newParticle = new Particle(sk.touches[e].x, sk.touches[e].y, sk.random(1, 3), 20);
          particles.push(newParticle);
        }
      }
    }
    if (particles.length > 100) {
      particles.splice(0, 20);
    }
  };

  sk.setup = () => {
    sk.randomSeed(2200);
    peakDetect = new PeakDetect();

    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    if (sk.width > 640)sk.pixelDensity(1.0);
    sk.stroke(255, 255, 255);
    sk.strokeWeight(10);
    sk.textFont('Helvetica');
    sk.textAlign(sk.CENTER);
    sk.textSize(230);
    sk.mouseX = 0.35 * sk.windowWidth;
    sk.mouseY = 0.35 * sk.windowHeight;
    particles[0] = new Particle(sk.random(sk.width), sk.random(sk.height), 1, 20);
    for (let i = 0; i < 50; i += 1) {
      particles[i] = new Particle(sk.random(sk.width), sk.random(sk.height), sk.random(1, 3), 20);
    }
    sk.frameRate(30);
  };

  sk.draw = () => {
    if (!sk.stopped) {
      xoff += 0.05;
      nos = sk.map(sk.noise(xoff), 0, 1, -2, 2);
      const spectrum = fft.getValue().map((value) => Math.abs((value + 100) * 3));
      let sum = 0;
      let sum1 = 0;
      sum = spectrum.filter((freq, i) => (i > sk.settings.freq1.value) && (i < sk.settings.freq1.value + 200));
      sum = sum.reduce((a, b) => a + b);
      sum = sum / 200 * 1.1;
      if (state === 1 || state === 2) {
        sum = 0;
      }
      sum1 = spectrum.filter((freq, i) => (i > sk.settings.freq2.value) && (i < sk.settings.freq2.value + 200));
      sum1 = sum1.reduce((a, b) => a + b) / 200;
      sum1 = sum1 > 1000 ? 100 : sum1;
      sum = sum > 1000 ? 100 : sum;
      peakDetect.update(spectrum);
      if (peakDetect.isDetected) {
        sk.background(255);
        addParticles(1, sum1);
        forceDirection = 1;
        sk.stroke(sk.random(800), 50, 50);
        if (sk.random(0, 1) > 0.5) {
          sk.background(0, 100, 150);
        } else {
          sk.background(0);
        }
      } else {
        forceDirection = -1;
        if (state === 0 && songPlayed === 0) {
          // main background
          const back = sk.constrain(sk.map(sum, 50, 160, 0, 255), 50, 255);
          sk.stroke(3 * back + 20 + sum + sum1 * sk.random(20), 3 * back + 20 - sum, 3 * back + 20 - sum, 50 + back * 3);
          sk.background(sk.settings.getColor[0] - sk.constrain(sum1, 0, 50), sk.settings.getColor[1], sk.settings.getColor[2], back);
        } else {
          // touched background
          const brightness = sk.settings.getColor.reduce((a, b) => +a + +b);
          if (brightness < 150) {
            sk.background(sk.noise(sk.frameCount / 100) * 500, 255 - sum1);
          } else {
            sk.background(280 - sk.settings.getColor[0], sk.settings.getColor[1], 235 - sk.settings.getColor[2], sum1);
          }
          // sk.fill(0, sk.map(sum, 85, 110, 0, 255));
          sk.stroke(sk.random(0, 1600), sk.random(-255, 255), sk.random(-255, 255), 180);
        }
      }
      sk.push();
      for (let i = 0; i < particles.length; i += 1) {
        let e;
        particles[i].separation(particles, sum1, sum, forceDirection);
        const m = sk.createVector(nos / 2, sk.random(-0.5, 0.5));
        const centerForce = sk.createVector(0.5 * sk.windowWidth, 0.5 * sk.windowHeight);
        particles[i].applyForce(m.mult((sum - sum1 / 5) / 40));
        if (particles[i].mass < 3) {
          particles[i].steering(centerForce, sum / 30, forceDirection);
        }
        if (sk.touches.length > 0 || sk.mouseIsPressed) {
          if (sk.touches.length > 1) {
            e = sk.createVector(sk.touches[0].x, sk.touches[0].y);
          } else {
            e = sk.createVector(sk.mouseX, sk.mouseY);
          }
          if (particles[i].mass > 3) {
            particles[i].applyForce(sk.createVector(sk.width / 50, sk.height / 50));
          }
          particles[i].steering(e, 1, 1, sum1);
        }
        particles[i].bord();
        particles[i].fluide();
        particles[i].update();
        particles[i].display(sum1, sum);
      }
      sk.pop();
      if (sk.settings.grey) {
        sk.filter(sk.GRAY);
      }

      sk.push();
      if (state === -1 || songPlayed === -1) {
        sk.background(0, 180);
        sk.noStroke(0);
        sk.fill(200, 100, 100, (Math.sin(sk.frameCount / 100 * 2 * sk.PI) + 1) * 180);
        sk.textSize(sk.width > 768 ? 36 : 24);
        if (soundIsLoading === false) {
          sk.text('Touch to Play', 0.5 * sk.width, sk.windowHeight * 0.6);
        } else {
          sk.text('Loading...', 0.5 * sk.windowWidth, sk.windowHeight * 0.6);
        }
        sk.textSize(20);
        sk.textSize(18);
        sk.fill(150);
        sk.strokeWeight(0);
        // sk.text('Li Sikai', 0.5 * sk.windowWidth, 0.3 * sk.windowHeight);
        // sk.text('2018', 0.5 * sk.windowWidth, 0.3 * sk.windowHeight + 60);
        sk.text(sk.settings.list.current, 0.5 * sk.windowWidth, 0.3 * sk.windowHeight + 130);
        sk.pop();
      }
    }
  };

  sk.handleTouchStart = () => {
    addParticles();
    sk.background(0);
    state = 1;
  };

  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
    sk.mouseX = 0.65 * sk.windowWidth;
    sk.mouseY = 0.35 * sk.windowHeight;
  };

  sk.touchEnded = () => {
    sk.background(0);
    state = 0;
    if (soundIsLoading === false) {
      if (player.state === 'stopped') {
        player.start();
        songPlayed = 0;
        sk.mouseX = 0.5 * sk.width;
        sk.mouseY = 0.4 * sk.height;
      } else {
        noParticles += 1;
      }
    }
  };

  sk.touchMoved = () => {
    state = 1;
  };
  divNode.addEventListener(
    'click',
    async () => {
      await Tone.start();
      sk.soundIsReady = true;
    },
    { once: true, passive: false },
  );
  divNode.addEventListener(
    'touchstart',
    async () => {
      await Tone.start();
      sk.soundIsReady = true;
    },
    { once: true, passive: false },
  );
  divNode.addEventListener(
    'touchstart',
    () => {
      sk.handleTouchStart();
    },
    {
      passive: false,
    },
  );

  divNode.addEventListener(
    'mousedown',
    () => {
      sk.handleTouchStart();
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
}
