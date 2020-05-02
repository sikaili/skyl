import { Bodies, Body } from 'matter-js';
import calDistance from '@/js/utlis/calDistance';

export default class Particle {
  constructor(x, y, virus, number) {
    const scale = 200 / number;
    this.r = (10 + Math.random() * 15) * (scale / 1.3);
    this.r = this.r < 5 ? 5 : this.r;
    this.pos = { x, y };
    this.updating = true;
    if (virus) {
      this.virus = true;
      this.fill = virus.color;
      this.r *= 2;
      this.id = virus.id;
    }
    this.body = Bodies.circle(x, y, this.r);
    Body.setMass(this.body, 3 / scale);
    if (virus) {
      Body.applyForce(this.body, this.body.position, {
        x: Math.random() / 1000,
        y: Math.random() / 1000,
      });
    }
  }

  contagion(particles, timeToBeInfected = 1500) {
    particles.forEach((particle) => {
      const distance = calDistance(
        particle.body.position,
        this.body.position,
      );
      // contagion
      if (
        distance < (this.r + particle.r) * 1.1
        && this.virus
        && !particle.virus
        && Math.random() > 0.8
        && !this.updating
        && !particle.immu
      ) {
        if (this.fill[3] > 200 && this.id) {
          try {
            this.samplers[this.id % 3].volume.value = -3 - 100 / (this.r + this.fill[3] / 5);
            this.samplers[this.id % 3].triggerAttack(40 + this.fill[2]);
          } catch (err) {
            //
          }
        }
        setTimeout(() => {
          particle = this.infection(particle);
          setTimeout(() => {
            if (Math.random() > 0.7) {
              particle.virus = false;
              if (Math.random() > 0.5 && particle.fill[3] < 150) {
                particle.immu = true;
              }
              if (Math.random() > 0.3) {
                setTimeout(() => {
                  particle.immu = false;
                }, timeToBeInfected * 2);
              }
            }
            if (Math.random() > 0.97 && particle.fill[3] > 100) {
              particle.died = true;
              if (this.sampler2) {
                try {
                  this.sampler2.triggerAttack(130 + (particle.r - 20) * 2);
                } catch (err) {
                  //
                }
              }
            }
          }, timeToBeInfected * 2);
        }, (timeToBeInfected / this.fill[3]) ** 2);
        // virus vs virus
      } else if (
        distance < (this.r + particle.r) * 1.05
        && this.virus
        && particle.virus
        // && particle.id !== this.id
        // && this.fill[3] > 150
      ) {
        // 不同色传染
        if (particle.fill[3] < this.fill[3] - 100 && this.id !== particle.id) {
          particle = this.infection(particle);
        }
        // 同色染色不染透明度
        if (particle.id === this.id) {
          const colors = particle.fill.map(
            (color, index) => (color + this.fill[index]) / 2,
          );
          particle.fill = [...colors.slice(0, 3), particle.fill[3]];
        // 不同色传染全部
        } else if (Math.abs(particle.fill[3] - this.fill[3]) < 100) {
          particle.fill = particle.fill.map(
            (color, index) => (color + this.fill[index]) / 2,
          );
        }
      }
    });
  }

  infection(particle) {
    particle.id = this.id;
    particle.virus = true;
    particle.mother = { position: this.body.position };
    particle.fill = [
      ...this.fill.slice(0, 3),
      Math.abs(this.fill[3] - 30) + 10,
    ];
    return particle;
  }

  triggerAttack() {
    if (this.sampler2) {
      try {
        this.sampler2.triggerAttack(130 + (this.r - 20) * 2);
      } catch (err) {
        //
      }
    }
  }

  mouseForceTrigger(pos) {
    if (Math.random() > 0.3) {
      this.updating = true;
      let force;
      if (
        calDistance(pos, this.body.position)
        < 50
      ) {
        force = {
          x: (pos.x - this.body.position.x) * -0.0001,
          y: (pos.y - this.body.position.y) * -0.0001,
        };
      } else {
        force = {
          x: Math.random() * 0.003,
          y: Math.random() * 0.003,
        };
      }
      Body.applyForce(this.body, pos, force);
    }
  }

  display(sk) {
    // console.log(this.body.angularVelocity);
    if (this.body.angularVelocity < 0.005) {
      this.updating = false;
    }
    if (this.died) {
      Body.applyForce(this.body, this.body.position, { x: 0, y: 0.01 });
    } else if (this.immu) {
      Body.applyForce(this.body, this.body.position, { x: 0, y: -0.0003 });
    }
    sk.push();
    sk.translate(this.body.position.x, this.body.position.y);
    sk.rotate(this.body.angle);

    if (this.virus) {
      sk.fill(this.fill);
    } else if (this.immu) {
      sk.fill([255, 255, 255, sk.noise(this.body.position.y) * 255]);
    } else {
      sk.fill([255, 255, 255, this.r * 3]);
    }

    if (this.died) {
      sk.fill(0);
      sk.rect(0, 0, this.r * 2, this.r * 2);
    } else {
      sk.ellipse(0, 0, this.r * 2);
    }
    sk.stroke(255, this.r * 3);
    // sk.line(0, 0, 0, this.r);
    sk.pop();
    sk.push();
    if (
      this.mother
      && calDistance(
        this.mother.position,
        this.body.position,
      )
        < this.r * 3
    ) {
      sk.strokeWeight(this.r / 2);
      sk.stroke([...this.fill.slice(0, 4)]);
      sk.line(
        this.body.position.x,
        this.body.position.y,
        this.mother.position.x,
        this.mother.position.y,
      );
    }
    sk.pop();
  }
}
