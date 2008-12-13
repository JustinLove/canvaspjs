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
  var context = canvas.getContext("2d");
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
  CGD.DRAW.saveCanvas(canvas, CGD.DRAW.saveFile.next());
};

// http://developer.mozilla.org/en/docs/Code_snippets:Canvas
CGD.DRAW.saveCanvas = function(canvas, destFile) {
  CGD.DEBUG.p([canvas, destFile]);
  // convert string filepath to an nsIFile
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var file = Components.classes["@mozilla.org/file/local;1"]
                       .createInstance(Components.interfaces.nsILocalFile);
  file.initWithPath(destFile);

  // create a data url from the canvas and then create URIs of the source and targets  
  var io = Components.classes["@mozilla.org/network/io-service;1"]
                     .getService(Components.interfaces.nsIIOService);
  var source = io.newURI(canvas.toDataURL("image/png", ""), "UTF8", null);
    
  // prepare to save the canvas data
  var persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"]
                          .createInstance(Components.interfaces.nsIWebBrowserPersist);
  
  persist.persistFlags = Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION;
  persist.persistFlags |= Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_REPLACE_EXISTING_FILES;
  
  // displays a download dialog (remove these 3 lines for silent download)
//  var target = io.newFileURI(file);
//  var xfer = Components.classes["@mozilla.org/transfer;1"]
//                       .createInstance(Components.interfaces.nsITransfer);
//  xfer.init(source, target, "", null, null, null, persist);
//  persist.progressListener = xfer;
  
  // save the canvas data to the file
  persist.saveURI(source, null, null, null, null, file);
};

// Right now about all we do is color interpolation and support code.
CGD.RGB = CGD.RGB || {};
// Some of the methods are string operations, so they go there.
CGD.STRING = CGD.STRING || {};
(function() {
  // color names are convient, but now we have to deal with them.
  CGD.RGB.STRINGS = {
    red: '#F00',
    green: '#080', // and they are sometimes surprising.
    blue: '#00F',
    orange: '#FFA500',
    yellow: '#FF0',
    purple: '#808',
    pink: '#FFC0CB',
    cyan: '#0FF',
    white: '#FFF',
    black: '#000',
    grey: '#888',
    gray: '#888',
    brown: '#802A2A',
    lastEntry: null
  };
  
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
    if (!s) {
      return rgbFromString('white');
    } else if (CGD.RGB.STRINGS[s]) {
      return rgbFromString(CGD.RGB.STRINGS[s]);
    } else if (s.length == 4) {
      return rgbFromHex3(s);
    } else if (s.length == 7) {
      return rgbFromHex6(s);
    } else {
      throw s + ' is not a color';
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
