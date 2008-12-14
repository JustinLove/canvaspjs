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

  PJS.Canvas = {};
  PJS.Canvas.getContext = function(kind) {
    if (kind == "cgd-postscript") {
      return new PJS.CanvasRenderingContextPostscript(this);
    } else {
      return objectData(this).oldGetContext.call(this, kind);
    }
  };

  PJS.hijack = function() {
    var list = document.getElementsByTagName("canvas");
    for (var i = 0;i < list.length;i++) {
      if (list[i].getContext != PJS.Canvas.getContext) {
        objectData(list[i]).oldGetContext = list[i].getContext;
        list[i].getContext = PJS.Canvas.getContext;
      }
    }
  };

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
    radians: function(x){
      return this.push(x * 360 / CGD.JS.RADIANS);
    },
    degrees: function(x){
      return this.push(x);
    },
    n: function(x){
      this.body += "\n";
      return this;
    },
    operator: function(x){
      this.body += x + "\n";
      return this;
    },
    color: function(s){
      var c = CGD.RGB.fromString(s);
      return this.push(c.r).push(c.g).push(c.b).operator('setrgbcolor');
    },
    lineWidth: function(w){
      return this.push(w).operator('setlinewidth');
    },
    comment: function(x){
      this.body += "% " + x + "\n";
      return this;
    },
    dictionary: function(dict){
      this.operator('<<');
      for (var i in dict) {
        this.push('/' + i).smart(dict[i]).n();
      }
      return this.operator('>>');
    },
    array: function(array){
      return this.push('[' + array.join(' ') + ']');
    },
    smart: function(x){
      switch(typeof(x)) {
        case 'number': this.push(x); break;
        case 'string': this.push(x); break;
        case 'object':
          if (CGD.ARRAY.describes(x)) {
            this.array(x);
          } else {
            this.dictionary(x);
          }
          break;
        default: this.push(x); break;
      }
      return this;
    },
    data: function(data){
      return this.push(data).operator('>');
    },
    image: function(data, width, height){
      this.push('/DeviceRGB').operator('setcolorspace');
      var dict = {
        ImageType: 1,
        Width: width,
        Height: height,
        BitsPerComponent: 8,
        ImageMatrix: [width, 0, 0, height, 0, 0]
      };
      var dataDict = object(dict);
      mix(dataDict, {
        Decode: '[0 1 0 1 0 1]',
        DataSource: "currentfile /ASCIIHexDecode filter"
      });
      var maskDict = object(dict);
      maskDict.Decode = '[1 0]';
      
      
      this.dictionary({
        ImageType: 3,
        InterleaveType: 1,
        DataDict: dataDict,
        MaskDict: maskDict
      }).operator('image');
      return this.data(data);
    },
    text: function(width, height){
      return "%!PS-Adobe-3.0 EPSF-3.0\n" + 
        "%%BoundingBox: 0 0 " + 
        width + " " + height + "\n" +
        this.body;
    }
  });
  
  PJS.CanvasRenderingContextPostscript = function(node) {
    if (this == god || this == PJS) {
      return new PJS.CanvasRenderingContextPostscript(node);
    }
    this.canvas = node;
    objectData(this).ps = (new PJS.Postscript());
    this.translate(0, node.height);
    this.scale(1, -1);
    return this;
  };
  
  mixSafe(PJS.CanvasRenderingContextPostscript.prototype, {
    canvas: null,
    
    //state
    save: function(){
      objectData(this).ps.operator("gsave");
    },
    restore: function(){
      objectData(this).ps.operator("grestore");
    },
    
    //transformations
    scale: function(x, y){
      if (x != 1 || y != 1) {
        objectData(this).ps.push(x).push(y).operator('scale');
      }
    },
    rotate: function(angle){
      objectData(this).ps.radians(angle).operator('rotate');
    },
    translate: function(x, y){
      objectData(this).ps.push(x).push(y).operator('translate');
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
    
    //line caps/joins
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    
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
      objectData(this).ps.operator('newpath');
    },
    closePath: function(){
      objectData(this).ps.operator('closepath');
    },
    moveTo: function(x, y){
      objectData(this).ps.push(x).push(y).operator('moveto');
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
        push(radius).radians(startAngle).radians(endAngle).
        operator(anticlockwise ? 'arcn' : 'arc');
    },
    fill: function(){
      objectData(this).ps.color(this.fillStyle).
        operator('gsave').operator('fill').operator('grestore');
    },
    stroke: function(){
      objectData(this).ps.lineWidth(this.lineWidth).
        color(this.strokeStyle).
        operator('gsave').operator('stroke').operator('grestore');
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
      switch (arguments.length) {
        case 3:
          dx = sx;
          dy = sy;
          dw = null;
          dh = null;
          sx = null;
          sy = null;
          sw = null;
          sh = null;
          break;
        case 5:
          dx = sx;
          dy = sy;
          dw = sw;
          dh = sh;
          sx = null;
          sy = null;
          sw = null;
          sh = null;
          break;
        case 9:
          break;
        default:
          throw new Error("invalid number of arguments to drawImage");
      }
      var canvas;
      var context;
      if (image['getContext']) {
        canvas = image;
      } else {
        canvas = this.canvas.ownerDocument.createElement('canvas');
        if (!canvas) {
          throw new Error("couldn't create canvas to wrap image");
        }
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        if (!context) {
          throw new Error("couldn't get context for wrapper canvas");
        }
        if (context.drawImage == this.drawImage) {
          throw new Error("pjs: recrusion in drawImage");
        }
        context.drawImage(image, 0, 0);
      }
      context = canvas.getContext('2d');
      if (!context) {
        throw new Error("couldn't get context for source canvas");
      }
      sx = sx || 0;
      sy = sx || 0;
      sw = sw || canvas.width;
      sh = sh || canvas.height;
      var data;
      try {
        try {
          data = context.getImageData(sx, sy, sw, sh).data;
        } catch (e) {
          netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
          data = context.getImageData(sx, sy, sw, sh).data;
        }
      } catch (e) {
        throw new Error("unable to access image data: " + e);
      }
      var string = "";
      var row = "";
      var i = 0;
      function h(d) {
        var x = d.toString(16);
        return (x.length == 1 ? ('0' + x) : x);
      };
      for (var y = 0;y < sw;y++) {
        row = "";
        for (var x = 0;x < sh * 4;x += 4) {
          row += h(data[i+3]);
          row += h(data[i++]);
          row += h(data[i++]);
          row += h(data[i++]);
          i++;
        }
        string += row + '\n';
      }
      this.save();
      this.translate(dx, dy);
      this.scale(dw || sw, dh || sh);
      objectData(this).ps.image(string, sw, sh);
      this.restore();
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
      return objectData(this).ps.text(this.canvas.width, this.canvas.height);
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
