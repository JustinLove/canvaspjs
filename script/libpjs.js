// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/

(function() {
  eval(CGD.JS.explode('CGD'));
  eval(CGD.JS.explode('CGD.JS'));
  eval(CGD.JS.explode('CGD.OBJECT'));
  eval(CGD.JS.explode('CGD.ARRAY'));

  function D(str) {
    DEBUG.p(str);
  };
  //DEBUG.addFilter('timestamp');
  
  CGD.CanvasRenderingContextPostscript = function(node) {
    if (this == god) {
      return new CGD.CanvasRenderingContextPostscript(node);
    }
  };
  
  mixSafe(CGD.CanvasRenderingContextPostscript.prototype, {
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
      
    }
  });
})();
