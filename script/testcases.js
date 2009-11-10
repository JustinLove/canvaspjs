// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/

CGD.RADIANS = Math.PI * 2;

CGD.TEST.pjs.circle = function(context, f) {
  context.save();
  context.beginPath();
  context.arc(0, 0, 0.4, 0, CGD.RADIANS, CGD.ARC.CLOCKWISE);
  context.closePath();
  f(context);
  context.restore();
};

CGD.TEST.pjs.stroke = function(context) {
  context.lineWidth = 0.1;
  context.stroke();
};

CGD.TEST.pjs.fill = function(context) {
  context.fill();
};

CGD.TEST.pjs.cases = {
  composite: function(context) {
    context.save();
    context.rotate(CGD.RADIANS*0.06);
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, 0.4, 0, CGD.RADIANS*0.75, CGD.ARC.CLOCKWISE);
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
    CGD.TEST.pjs.circle(context, CGD.TEST.pjs.stroke);
  },
  fill: function(context) {
    CGD.TEST.pjs.circle(context, CGD.TEST.pjs.fill);
  },
  scale: function(context) {
    context.save();
    context.scale(0.5, 0.5);
    CGD.TEST.pjs.cases.arc(context);
    context.restore();
  },
  translate: function(context) {
    context.save();
    context.translate(0.2, 0.2);
    CGD.TEST.pjs.cases.arc(context);
    context.restore();
  },
  rotate: function(context) {
    context.save();
    context.rotate(CGD.RADIANS*0.06);
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, 0.4, 0, CGD.RADIANS*0.75, CGD.ARC.CLOCKWISE);
    context.closePath();
    context.lineWidth = 0.1;
    context.stroke();
    context.restore();
  },
  strokeColor: function(context) {
    CGD.TEST.pjs.circle(context, function(context) {
      context.lineWidth = 0.1;
      context.strokeStyle = 'green';
      context.stroke();
    });
  },
  fillColor: function(context) {
    CGD.TEST.pjs.circle(context, function(context) {
      context.fillStyle = 'blue';
      context.fill();
    });
  },
  globalAlpha: function(context) {
    CGD.TEST.pjs.circle(context, function(context) {
      context.globalAlpha = 0.5;
      context.fill();
    });
  },
  image: function(context) {
    context.drawImage(document.getElementById('tiny'), -0.5, -0.5, 1, 1);
  },
  subImage: function(context) {
    context.drawImage(document.getElementById('tiny'), 1, 1, 1, 1, -0.5, -0.5, 1, 1);
  }
};
