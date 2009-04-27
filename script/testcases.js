// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/

CGD.TEST.pjs.cases = {
  composite: function(context) {
    context.save();
    context.rotate(CGD.JS.RADIANS*0.06);
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, 0.4, 0, CGD.JS.RADIANS*0.75, CGD.ARC.CLOCKWISE);
    context.closePath();
    context.fillStyle = 'blue';
    context.fill();
    context.lineWidth = 0.1;
    context.strokeStyle = 'green';
    context.stroke();
    context.save();
    context.translate(0, 0.2);
    context.scale(0.5, 0.5);
    context.drawImage(document.getElementById('tiny'), -0.5, -0.5, 1, 1);
    context.restore();
    context.save();
    context.translate(0.2, -0.2);
    context.scale(0.25, 0.25);
    context.drawImage(document.getElementById('tiny'), 1, 1, 1, 1, -0.5, -0.5, 1, 1);
    context.restore();
    context.restore();
  },
  arc: function(context) {
    context.save();
    context.beginPath();
    context.arc(0, 0, 0.4, 0, CGD.JS.RADIANS, CGD.ARC.CLOCKWISE);
    context.closePath();
    context.lineWidth = 0.1;
    context.stroke();
    context.restore();
  },
  fill: function(context) {
    context.save();
    context.beginPath();
    context.arc(0, 0, 0.4, 0, CGD.JS.RADIANS, CGD.ARC.CLOCKWISE);
    context.closePath();
    context.fill();
    context.restore();
  },
  rotate: function(context) {
    context.save();
    context.rotate(CGD.JS.RADIANS*0.06);
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, 0.4, 0, CGD.JS.RADIANS*0.75, CGD.ARC.CLOCKWISE);
    context.closePath();
    context.lineWidth = 0.1;
    context.stroke();
    context.restore();
  },
  strokeColor: function(context) {
    context.save();
    context.beginPath();
    context.arc(0, 0, 0.4, 0, CGD.JS.RADIANS, CGD.ARC.CLOCKWISE);
    context.closePath();
    context.lineWidth = 0.1;
    context.strokeStyle = 'green';
    context.stroke();
    context.restore();
  },
  fillColor: function(context) {
    context.save();
    context.beginPath();
    context.arc(0, 0, 0.4, 0, CGD.JS.RADIANS, CGD.ARC.CLOCKWISE);
    context.closePath();
    context.fillStyle = 'blue';
    context.fill();
    context.restore();
  }
};
