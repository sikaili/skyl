function Sound(m,p){
  m.pan(constrain(map(p.pos.x,0,width,-0.8,0.8),-0.9,0.9));
  m.freq(midiToFreq(notes[10-p.no]+7)+p.vel.y);
  // m.freq(height/1.1-p.pos.y+p.vel.mag()*10);
  if(p.style == 2){
    m.setType('square');
    m.freq(midiToFreq(notes[10-p.no]-5)+p.vel.y);
    m.amp(0.05+p.vel.mag()/15, 0.5);
  }
  else if (p.style ==1){
    m.amp(0.4+p.vel.mag()/2, 0.1);
    if(p.steer){
      m.amp(0.8+p.vel.mag()/2, 0.5);
    }
  }
  if(p.vel.mag()<0.3){
    m.amp(0, 0.5);
    m.norun = true;
  }
  // delay.process(song,0.99,0.5,1000);
  // song.play();
  delay.process(m,0.99,0.5,300);
}