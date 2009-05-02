// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/

var CGD = window.CGD || {};

CGD.DRAW = CGD.DRAW || {};
// the common 'boilerplate' code for using a canvas.
CGD.DRAW.on = function(id, f, options) {
  var canvas = document.getElementById(id);
  if (!canvas) {
    return;
  }
  try {
    var context = canvas.getContext("2d");
  } catch(e) {
    throw new CGD.JS.UnsupportedFeature("Canvas: " + e.toString());
  }
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
};

CGD.DRAW.image = function(context, image, x, y, w, h) {
  var od = CGD.JS.objectData(image);
  // fix for a Dashboard bug.
  if (!('imageOffset' in od)) {
    od.imageOffset = (window.widget && image.src.substr(-3, 3) == 'pdf') ? 1 : 0;
  }
  context.drawImage(image, x, y + h*od.imageOffset, w, h);
};

CGD.DRAW.save = function(id) {
  if (!CGD.DRAW.saveFile) {
    CGD.DEBUG.p("CGD.DRAW.saveFile is undefined");
    return;
  }
  var canvas = document.getElementById(id);
  if (!canvas) {
    return;
  }
  //CGD.DRAW.saveFile = CGD.DRAW.saveFile || CGD.STRING.serial("~/Desktop/screen000.png");
  var name = CGD.DRAW.saveFile;
  if (typeof(name) != 'string') {
    name = name.next();
  }
  netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
  CGD.FILE.saveDataURL(canvas.toDataURL("image/png", ""), name);
};

// Right now about all we do is color interpolation and support code.
CGD.RGB = CGD.RGB || {};
// Some of the methods are string operations, so they go there.
CGD.STRING = CGD.STRING || {};
(function() {
  // color names are convient, but now we have to deal with them.
  C = CGD.RGB.STRINGS = {
    // W3C
    aqua: '#00FFFF',
    black: '#000000',
    blue: '#0000FF',
    fuchia: '#FF00FF',
    gray: '#808080',
    green: '#008000', // and they are sometimes surprising.
    lime: '#00FF00',
    maroon: '#800000',
    navy: '#000080',
    olive: '#808000',
    purple: '#800080',
    red: '#FF0000',
    silver: '#CCCCCC',
    teal: '#008080',
    white: '#FFFFFF',
    yellow: '#FFFF00',
    
    // misc
    orange: '#FFA500',
    pink: '#FFC0CB',
    grey: '#808080',
    brown: '#802A2A',
    turquoise: '#40E0D0',
    lightgreen: stringFromRgb({r: 51/256, g: 204/256, b: 102/256}),
    wine: '#000040',
    lastEntry: null
  };
  var blend = blendStringColors;
  function dark(c) {
    return blend(c, C.black, 0.4);
  }
  CGD.RGB.dark = dark;
  function light(c) {
    return blend(c, C.white, 0.8);
  }
  CGD.RGB.light = light;
  function mixture(a, b) {
    return C[a + '_' + b] = blend(C[a], C[b], 0.5);
  }
  C.brightgreen = C.lime;
  C.cyan = C.aqua;
  C.magenta = C.violet = C.fuchia;
  C.indigo = dark('blue');
  C.orange = blend(C.red, C.yellow, 0.5);
  mixture('red', 'violet');
  mixture('indigo', 'violet');
  mixture('yellow', 'orange');
  mixture('blue', 'green');
  mixture('red', 'orange');
  C.ultraviolet = light('blue');
  mixture('blue', 'indigo');
  mixture('blue', 'violet');
  mixture('red', 'wine');
  
  function rgbFromHex6(s) {
    function c(s, pos) {
      return parseInt(s.substr(pos,2), 16) / 255;
    }
    return {r: c(s, 1), g: c(s, 3), b: c(s, 5)};
  }

  function rgbFromHex3(s) {
    function c(s, pos) {
      return parseInt(s.substr(pos,1), 16) / 15;
    }
    return {r: c(s, 1), g: c(s, 2), b: c(s, 3)};
  }

  function rgbFromString(s) {
    var m;
    function parse(s) {
      if (s.match('%')) {
        return parseInt(s, 10) * 2.55;
      } else {
        return parseInt(s, 10) / 255;
      }
    }
    function c(s) {
      return Math.max(0, Math.min(255, parse(s)));
    }
    if (!s) {
      return rgbFromString('white');
    } else if (CGD.RGB.STRINGS[s.toLowerCase()]) {
      return rgbFromString(CGD.RGB.STRINGS[s.toLowerCase()]);
    } else if (s.length == 4) {
      return rgbFromHex3(s);
    } else if (s.length == 7) {
      return rgbFromHex6(s);
    } else if ((m = s.match(/rgb\((.*)\)/))) {
      var parts = m[1].split(',');
      return {
        r: c(parts[0]),
        g: c(parts[1]),
        b: c(parts[2]),
        a: 1.0
      };
    } else if ((m = s.match(/rgba\((.*)\)/))) {
      var parts = m[1].split(',');
      return {
        r: c(parts[0]),
        g: c(parts[1]),
        b: c(parts[2]),
        a: parseFloat(parts[3])
      };
    } else {
      throw new TypeError(s + ' is not a color');
    }
  }
  CGD.RGB.fromString = rgbFromString;

  function stringFromRgb(rgb) {
    function c(a) {
      var b = Math.round(a * 255).toString(16);
      return (b.length == 1) ? ('0' + b) : b;
    }
    return '#' + c(rgb.r) + c(rgb.g) + c(rgb.b);
  }
  CGD.STRING.fromRgb = stringFromRgb;
  
  function canonical(s) {
    return stringFromRgb(rgbFromString(s));
  }
  CGD.RGB.canonical = canonical;

  function interpolate(a, b, by) {
    return a + (b-a)*by;
  }

  function blendColors(a, b, by) {
    return {
      r: interpolate(a.r, b.r, by),
      g: interpolate(a.g, b.g, by),
      b: interpolate(a.b, b.b, by)
    };
  }
  
  function interpolateStringColors(a, b, steps) {
    var as = rgbFromString(a);
    var bs = rgbFromString(b);
    // Pass a null through (sometimes used to draw nothing for transparency)
    //   Otherwise remove color names in case the display system 
    //   doesn't support them. (IE/excanvas doesn't do pink)
    var it = [!a ? a : stringFromRgb(as)];
    for (var i = 1;i < steps-1;i++) {
      it.push(stringFromRgb(blendColors(as, bs, i / (steps-1))));
    }
    it.push(!b ? b : stringFromRgb(bs));
    return it;
  }
  CGD.RGB.interpolate = interpolateStringColors;

  function blendStringColors(a, b, by) {
    return stringFromRgb(blendColors(rgbFromString(a), rgbFromString(b), by));
  }
  CGD.RGB.blend = blendStringColors;

}());

CGD.ARC = CGD.ARC || {CLOCKWISE: 0, COUNTERCLOCKWISE: true};
