function Particle(x,y,m,n){
  this.no = n;
  this.pos = createVector(x,y);
  this.mass = m;
  this.r = m*150;
  this.steerstat = -0.2;
  if(this.mass < 1.5){
    this.style = floor(random(1.5,3));
  }
  else{
    this.style = 1;
  }
  var r = 40
  this.chance = random(0,1);
  if (this.chance > 0.7){
    this.vel = createVector(random(-5,5),random(-10,-5));
  }
  else{
    this.vel = createVector(0,0);
  }
  this.acc = createVector(0,0);
  this.maxSpeed = 6;
  this.historyP = [];
  var historyPL = random(3,10);
  this.mass = m;
  this.crash = false;
  this.del = false;
  var e = 0;
  this.steering = function(p,set,radius){
    var distance = p5.Vector.dist(this.pos,p)
    var target = p.copy()
    target.sub(this.pos)
    target.normalize();
    target.mult(this.maxSpeed);
    var steer = p5.Vector.sub(target, this.velocity);
    if (set == -1){
      if (distance<radius){
        if(m.norun){
          m.norun = false;
          this.steer = true;
        }
        steer.mult(distance/radius*-1);
        this.applyForce(steer);
      }
      else{
        this.steer = false;
      }
    }
    // arrival
    else if(set == 1){
        if (distance<radius){
        steer.mult((radius-distance)/radius);
        this.applyForce(steer);
          if (doubleClick){
            doubleClick = false;
            this.del = true;
          }
        }
    }
    else{
      this.applyForce(steer);
    }
  }
  this.separation = function(particles){
    this.disRange = 0;
    var targetAll = createVector();
    var count = 0;
    for (var j=0;j<particles.length;j++){
      this.disRange = (this.r+particles[j].r)/2;
      var distance = p5.Vector.dist(this.pos,particles[j].pos);
      if ((distance > 0) && (distance < this.disRange)){
        var targetS = p5.Vector.sub(particles[j].pos,this.pos);
        targetS.div(distance*-1);
        targetAll.add(targetS);
        count ++;
        this.crash = true;
      }
      else{
        this.crash = false;
      }
      if (count>0){
        targetAll.div(count);
        targetAll.normalize();
        targetAll.mult(this.maxSpeed);
        var steer = p5.Vector.sub(targetAll, this.velocity);
        this.applyForce(steer.div(5));
      }
    }
  }
  this.applyForce = function(force) {
    var f = force.copy()
    this.force = p5.Vector.div(f, this.mass);
    this.acc.add(this.force);
  }
  this.bord = function() {
    if (this.pos.x-this.r/2>width){
      this.pos.x = -this.r/2
    }
    if (this.pos.y-this.r/2>height){
      this.pos.y = -this.r/2
    }
    if (this.pos.x+this.r/2<0){
      this.pos.x = width+this.r/2
    }
    if (this.pos.y+this.r/2<0){
      this.pos.y = height+this.r/2
    }
  }
  this.fluide = function(c) {
        var stren = this.vel.mag()
        var C = c
        var strength = stren * stren * C
        var force1 = this.vel.copy();
        force1.setMag(strength);
        force1.mult(-1);
        this.applyForce(force1);
  }
  this.update = function(){
    this.vel.add(this.acc);
    e = this.acc.mag();
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0,0);
    var his = createVector(this.pos.x,this.pos.y);
    this.historyP.push(his);
    if (this.historyP.length>historyPL){
      this.historyP.splice(0,1)
    }
  }
  this.display = function(x) {
    strokeWeight(2);
    var n = map(noise(x+this.no/5), 0, 1, -0.5, 0.5);
    var m = 0.33 * (sin(frameCount/20) * 0.3 + n / 6);
    // print(amplitude.getLevel());
    if(amplitude.getLevel()<0.01&&state!=-1){
      m = 0.5;
    }
    else if(amplitude.getLevel() > 0.2&&this.r>5){
      m = -0.8;
    }
    if(state == 2 || touches.length>2&&this.r>5){
      m = -0.5
    }
    this.r += m;
    // x += 0.03;
    var theta = this.vel.heading() + 0.5 * PI
    if (this.vel.mag()<0.5){
        if(this.style == 1){
        stroke(200, 125)
        fill(200, 15)
        ellipse(this.pos.x, this.pos.y, this.r, this.r)
        fill(0, 200);
        push();
        stroke(0, 130)
        strokeWeight(2)
        translate(this.pos.x, this.pos.y);
        rotate(theta + n / 3)
        line(0, this.r * 0.4, 0, -this.r * 0.4)
        pop();
        }
        else{
          push();
          translate(this.pos.x, this.pos.y);
          rotate(theta + n);
          stroke(200, 80)
          this.r = r
          fill(100, 15)
          // ellipse(this.pos.x, this.pos.y, this.r, this.r)
          beginShape();
          vertex(0,-this.r);
          vertex(-this.r/2,this.r);
          vertex(this.r/2,this.r);
          vertex(0,-this.r);
          endShape();
          fill(0, 200);
          stroke(200, 130)
          strokeWeight(1)
          line(0, -this.r, 0, this.r * 0.4)
          pop();
        }
    }
    else{
      if (this.style == 1) {
        stroke(200, 100, 125);
        fill(255, 100-25*this.mass,this.vel.mag()*10, 15+2*this.vel.mag());
        ellipse(this.pos.x, this.pos.y, this.r+this.vel.mag()*7, this.r+this.vel.mag()*7);
        fill(0, 200);
        push();
        stroke(0, 130)
        strokeWeight(2)
        translate(this.pos.x, this.pos.y);
        rotate(theta + n / 3)
        line(0, this.r * 0.4, 0, -this.r * 0.4)
        pop();
      }
      if (this.style == 2) {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta + n);
        stroke(100, 100, 200, 80)
        this.r = r+(this.mass * n * 80+this.no)
        fill(0, 180, 100, 15)
        // ellipse(this.pos.x, this.pos.y, this.r, this.r)
        beginShape();
        vertex(0,-this.r);
        vertex(-this.r/2,this.r);
        vertex(this.r/2,this.r);
        endShape();
        fill(0, 200);
        stroke(255, 255)
        strokeWeight(1)
        line(0, -this.r, 0, this.r * 0.4)
        pop();
      }
    }
  }
  
  this.sound = function(m){
    if (m.norun == true && this.vel.mag()>0.05 && this.steer == false){
      m.norun = false;
    }
  }
}