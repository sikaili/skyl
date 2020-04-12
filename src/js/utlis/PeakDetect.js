const PeakDetect = function (freq1, freq2, threshold, _framesPerPeak) {
  this.framesPerPeak = _framesPerPeak || 20;
  this.framesSinceLastPeak = 0;
  this.decayRate = 0.95;

  this.threshold = threshold || 0.1;
  this.cutoff = 0;
  this.cutoffMult = 1.5;

  this.energy = 0;
  this.penergy = 0;

  // TO DO: document this property / figure out how to make it accessible
  this.currentValue = 0;
  this.isDetected = false;

  this.f1 = freq1 || 40;
  this.f2 = freq2 || 20000;

  this._onPeak = () => {};

  this.update = function (spectrum) {
    const nrg = this.energy = [...spectrum].reduce((a, b) => a + b) / 255 / 800;

    if (nrg > this.cutoff && nrg > this.threshold && nrg - this.penergy > 0) {
      this._onPeak();
      this.isDetected = true;
      // debounce
      if (nrg < 1) {
        this.cutoff = nrg * this.cutoffMult;
      }
      this.framesSinceLastPeak = 0;
    } else {
      this.isDetected = false;
      if (this.framesSinceLastPeak <= this.framesPerPeak) {
        this.framesSinceLastPeak += 1;
      } else if (nrg > 0.05) {
        this.cutoff *= this.decayRate;
        this.cutoff = Math.max(this.cutoff, this.threshold);
      }
      if (this.cutoff < 0) {
        this.cutoff = 0;
      }
    }

    this.currentValue = nrg;
    this.penergy = nrg;
  };
};

export default PeakDetect;
