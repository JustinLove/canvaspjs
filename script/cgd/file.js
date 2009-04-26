// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/
// though much of this file draws heavily on stated sources

var CGD = window.CGD || {};

CGD.FILE = CGD.FILE || {
  // Correspond to PR_ constants
  // https://developer.mozilla.org/en/PR_Open#Parameters
  RDONLY: 0x01,
  WRONLY: 0x02,
  RDWR: 0x04,
  CREATE_FILE: 0x08,
  APPEND: 0x10,
  TRUNCATE: 0x20,
  SYNC: 0x40,
  EXCL: 0x80,
  
  NEW: 0x02 | 0x08 | 0x20
};

// http://developer.mozilla.org/en/docs/Code_snippets:Canvas
CGD.FILE.saveDataURL = function(dataURL, destFile) {
  CGD.DEBUG.p([dataURL.substr(0, 32), destFile]);
  // convert string filepath to an nsIFile
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var file = Components.classes["@mozilla.org/file/local;1"]
                       .createInstance(Components.interfaces.nsILocalFile);
  file.initWithPath(destFile);

  // create a data url from the canvas and then create URIs of the source and targets  
  var io = Components.classes["@mozilla.org/network/io-service;1"]
                     .getService(Components.interfaces.nsIIOService);
  var source = io.newURI(dataURL, "UTF8", null);
    
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

//https://developer.mozilla.org/en/Code_snippets/File_I%2f%2fO
CGD.FILE.saveString = function(s, destFile) {
  CGD.DEBUG.p([s.substr(0, 32), destFile]);
  // convert string filepath to an nsIFile
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var file = Components.classes["@mozilla.org/file/local;1"]
                       .createInstance(Components.interfaces.nsILocalFile);
  file.initWithPath(destFile);

  var stream = Components.classes["@mozilla.org/network/file-output-stream;1"]
                       .createInstance(Components.interfaces.nsIFileOutputStream);
  stream.init(file, CGD.FILE.NEW, 0666, 0);
  stream.write(s, s.length);
  stream.close();
};
