// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/

(function() {
  CGD.PJS = CGD.PJS || {};
  eval(CGD.JS.explode('CGD'));
  eval(CGD.JS.explode('CGD.JS'));

  function D(str) {
    DEBUG.p(str);
  };
  //DEBUG.addFilter('timestamp');

  PJS.on = function(id, f, options) {
    var canvas = document.getElementById(id);
    if (!canvas) {
      return;
    }
    var context = new PJS.CanvasRenderingContextPostscript(canvas);
    if (!context) {
      return;
    }

    context.save();
    context.scale(canvas.width, canvas.height);
    if (!(options && 'clear' in options && !options.clear)) {
      context.clearRect(0, 0, 1, 1);
    }
    if (options && 'origin' in options && options.origin == 'center') {
      context.translate(0.5, 0.5);
    }

    f(context);

    context.restore();
    return context.getPostscriptData();
  };
  
  PJS.missing = function(name) {
    D('missing ' + name);
  };
  var missing = PJS.missing;
  
  PJS.Postscript = function() {
    if (this == god || this == PJS) {
      return new PJS.Postscript(node);
    }
    return this;
  };
  
  mixSafe(PJS.Postscript.prototype, {
    body: "",
    push: function(x){
      this.body += x + " ";
      return this;
    },
    command: function(x){
      this.body += x + "\n";
      return this;
    },
    comment: function(x){
      this.body += "% " + x + "\n";
      return this;
    },
    text: function(width, height){
      return "%!PS-Adobe-3.0 EPSF-3.0\n" + 
        "%%BoundingBox 0 0 " + 
        width + " " + height + "\n" +
        this.body;
    }
  });
  
  PJS.CanvasRenderingContextPostscript = function(node) {
    if (this == god || this == PJS) {
      return new PJS.CanvasRenderingContextPostscript(node);
    }
    this.canvas = node;
    objectData(this).ps = new PJS.Postscript();
    return this;
  };
  
  mixSafe(PJS.CanvasRenderingContextPostscript.prototype, {
    canvas: null,
    
    //state
    save: function(){
      objectData(this).ps.command("gsave");
    },
    restore: function(){
      objectData(this).ps.command("grestore");
    },
    
    //transformations
    scale: function(x, y){
      objectData(this).ps.push(x).push(y).command('scale');
    },
    rotate: function(angle){
      missing('rotate');
    },
    translate: function(x, y){
      missing('translate');
      
    },
    setTransform: function(m11, m12, m21, m22, dx, dy){
      missing('setTransform');
      
    },
    
    //composting
    globalAlpha: 1.0,
    globalCompositeOperation: "source-over",
    
    //colors and styles
    strokeStyle: 'black',
    fillStyle: 'black',
    createLinearGradient: function(x0, y0, x1, y1){
      missing('createLinearGradient');
      //CanvasGradient
    },
    createRadialGradient: function(x0, y0, r0, x1, y1, r1){
      missing('createRadialGradient');
      //CanvasGradient
    },
    createPattern: function(image, repetition){
      missing('createPattern');
      //CanvasPattern
    },
    
    //shadows
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    shadowColor: 'black',
    
    //rects
    clearRect: function(x, y, w, h){
      // null-op
      objectData(this).ps.comment('clearRect');
    },
    fillRect: function(x, y, w, h){
      missing('fillRect');
      
    },
    strokeRect: function(x, y, w, h){
      missing('strokeRect');
      
    },
    
    //path API
    beginPath: function(){
      objectData(this).ps.command('newpath');
    },
    closePath: function(){
      objectData(this).ps.command('closepath');
    },
    moveTo: function(x, y){
      missing('moveTo');
      
    },
    lineTo: function(x, y){
      missing('lineTo');
      
    },
    quadraticCurveTo: function(cpx, cpy, x, y){
      missing('quadraticCurveTo');
      
    },
    bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y){
      missing('bezierCurveTo');
      
    },
    arcTo: function(x1, y1, x2, y2, radius){
      missing('arcTo');
      
    },
    rect: function(x, y, w, h){
      missing('rect');
      
    },
    arc: function(x, y, radius, startAngle, endAngle, anticlockwise){
      objectData(this).ps.push(x).push(y).
        push(radius).push(startAngle).push(endAngle).
        command(anticlockwise ? 'arc' : 'arcn');
    },
    fill: function(){
      objectData(this).ps.command('fill');
    },
    stroke: function(){
      missing('stroke');
      
    },
    clip: function(){
      missing('clip');
      
    },
    isPointInPath: function(x, y){
      missing('isPointInPath');
      return false;
    },
    
    //text
    font: "10px sans-serif",
    textAlign: "start",
    textBaseline: "alphabetic",
    fillText: function(text, x, y, maxWidth){
      missing('fillText');
      
    },
    strokeText: function(text, x, y, maxWidth){
      missing('strokeText');
      
    },
    measureText: function(text){
      missing('measureText');
      return new PJS.TextMetrics();
    },
    
    //drawing images
    drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh){
      missing('drawImage');
      
    },
    
    //pixel manipulation
    createImageData: function(sw, sh){
      missing('createImageData');
      return new PJS.ImageData();
    },
    getImageData: function(sx, sy, sw, sh){
      missing('getImageData');
      return new PJS.ImageData();
    },
    putImageData: function(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight){
      missing('putImageData');
      
    },
    
    //PJs
    getPostscriptData: function(kind){
      return objectData(this).ps.text();
    }
  });
  
  PJS.CanvasGradient = function() {
    if (this == god || this == PJS) {
      return new PJS.CanvasGradient();
    }
  };
  
  mixSafe(PJS.CanvasGradient.prototype, {
    addColorStep: function(offset, color){
      missing('addColorStep');
      
    }
  });

  PJS.CanvasPattern = function() {
    if (this == god || this == PJS) {
      return new PJS.CanvasPattern();
    }
  };
  
  mixSafe(PJS.CanvasPattern.prototype, {
  });

  PJS.TextMetrics = function() {
    if (this == god || this == PJS) {
      return new PJS.TextMetrics();
    }
  };
  
  mixSafe(PJS.TextMetrics.prototype, {
    width: 0.0
  });

  PJS.ImageData = function() {
    if (this == god || this == PJS) {
      return new PJS.ImageData();
    }
  };
  
  mixSafe(PJS.ImageData.prototype, {
    width: 0,
    height: 0,
    data: null // CanvasPixelArray
  });

  PJS.CanvasPixelArray = function() {
    if (this == god || this == PJS) {
      return new PJS.CanvasPixelArray();
    }
  };
  
  mixSafe(PJS.CanvasPixelArray.prototype, {
    length: 0,
    XXX5: function(index){
      missing('XXX5');
      return 0;
      //octet
    },
    XXX6: function(index, value){
      missing('XXX6');
      
    }
  });
  
})();
