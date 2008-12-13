// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/

(function() {
  CGD.PJS = CGD.PJS || {};
  eval(CGD.JS.explode('CGD'));
  eval(CGD.JS.explode('CGD.JS'));
  eval(CGD.JS.explode('CGD.OBJECT'));
  eval(CGD.JS.explode('CGD.ARRAY'));

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
  
  PJS.CanvasRenderingContextPostscript = function(node) {
    if (this == god || this == PJS) {
      return new PJS.CanvasRenderingContextPostscript(node);
    }
    this.canvas = node;
    return this;
  };
  
  mixSafe(PJS.CanvasRenderingContextPostscript.prototype, {
    canvas: null,
    
    //state
    save: function(){
      
    },
    restore: function(){
      
    },
    
    //transformations
    scale: function(x, y){
      
    },
    rotate: function(angle){
      
    },
    translate: function(x, y){
      
    },
    setTransform: function(m11, m12, m21, m22, dx, dy){
      
    },
    
    //composting
    globalAlpha: 1.0,
    globalCompositeOperation: "source-over",
    
    //colors and styles
    strokeStyle: 'black',
    fillStyle: 'black',
    createLinearGradient: function(x0, y0, x1, y1){
      //CanvasGradient
    },
    createRadialGradient: function(x0, y0, r0, x1, y1, r1){
      //CanvasGradient
    },
    createPattern: function(image, repetition){
      //CanvasPattern
    },
    
    //shadows
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    shadowColor: 'black',
    
    //rects
    clearRect: function(x, y, w, h){
      
    },
    fillRect: function(x, y, w, h){
      
    },
    strokeRect: function(x, y, w, h){
      
    },
    
    //path API
    beginPath: function(){
      
    },
    closePath: function(){
      
    },
    moveTo: function(x, y){
      
    },
    lineTo: function(x, y){
      
    },
    quadraticCurveTo: function(cpx, cpy, x, y){
      
    },
    bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y){
      
    },
    arcTo: function(x1, y1, x2, y2, radius){
      
    },
    rect: function(x, y, w, h){
      
    },
    arc: function(x, y, radius, startAngle, endAngle, anticlockwise){
      
    },
    fill: function(){
      
    },
    stroke: function(){
      
    },
    clip: function(){
      
    },
    isPointInPath: function(x, y){
      //bool
    },
    
    //text
    font: "10px sans-serif",
    textAlign: "start",
    textBaseline: "alphabetic",
    fillText: function(text, x, y, maxWidth){
      
    },
    strokeText: function(text, x, y, maxWidth){
      
    },
    measureText: function(text){
      //TextMetrics
    },
    
    //drawing images
    drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh){
      
    },
    
    //pixel manipulation
    createImageData: function(sw, sh){
      //ImageData
    },
    getImageData: function(sx, sy, sw, sh){
      //ImageData
    },
    putImageData: function(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight){
      
    },
    
    //PJs
    getPostscriptData: function(kind){
      return "%!PS-Adobe-3.0 EPSF-3.0\n" + 
        "%%BoundingBox 0 0 " + 
        this.canvas.width + " " + this.canvas.height + "\n";
    }
  });
  
  PJS.CanvasGradient = function() {
    if (this == god || this == PJS) {
      return new PJS.CanvasGradient();
    }
  };
  
  mixSafe(PJS.CanvasGradient.prototype, {
    addColorStep: function(offset, color){
      
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
      //octet
    },
    XXX6: function(index, value){
      
    }
  });
  
})();
