function Particle(x,y,mass) {
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.mass = mass;
  this.r = 30 * this.mass;
  this.maxAcc = 0.3;
  this.maxSpeed = 3;

  
  this.applyForce = function(p){
    this.force = p.copy();
    this.force.div(this.mass);
    this.acc.add(this.force);
  }
  this.resistance = function(){
    var C = 0.1;
    var vel = this.vel.mag();
    var res = vel*vel
    this.res = this.vel.copy().mult(-1)
    this.res.mult(res);
    this.res.limit(C);
    this.applyForce(this.res);
  }
  
  this.update = function(){
    // this.acc.limit(this.maxAcc);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.separation = function(particles){
    this.disRange = this.r;
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
      }
      if (count>0){
        targetAll.div(count);
        targetAll.normalize();
        targetAll.mult(this.maxSpeed/6);
        var steer = p5.Vector.sub(targetAll, this.velocity);
        this.applyForce(steer);
      }

    }
  }
  this.steering = function(p){
      var distance = p5.Vector.dist(this.pos,p)
        var target = p.copy()
        target.sub(this.pos)
        target.normalize();
        target.mult(this.maxSpeed);
        var steer = p5.Vector.sub(target, this.velocity);
        this.applyForce(steer);
  }
  
  this.borders = function() {
    if (this.pos.x+this.r/2>width){
      this.vel.x*=-1
    }
    if (this.pos.y+this.r/2>height){
      this.vel.y*=-1
    }
    if (this.pos.x-this.r/2<0){
      this.vel.x*=-1
    }
    if (this.pos.y-this.r/2<0){
      this.vel.y*=-1
    }
  }
  
  
  this.display = function(){
    var theta = this.vel.heading();
    push()
    fill(random(30,60)*this.mass,100)
    translate(this.pos.x,this.pos.y);
    rotate(theta);
    ellipse(0,0,this.r*this.mass/2,this.r)
    fill(0,180)
    ellipse(-this.r/(10-this.mass)+this.r/10*(sin(millis()/1000)),0,this.r/1.8)
    fill(200+this.mass*20,160)
    ellipse(-this.r/(10-this.mass),this.r/8,this.r/6)
    // fill(random(0,50),200)
    // textSize(this.r);
    // text("s",-this.r/1.6,this.r/3);
    pop()
  }
  
  

}