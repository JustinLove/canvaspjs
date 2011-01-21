## Capture most Canvas output in a printable, scalable, PostScript file

Apple's OSX uses 'Display PostScript', which derives from the Adobe printer language PostScript.  When it came time to design Dashboard, Apple added a special hook from the HTML based widgets to the Display PostScript system and called it the `canvas` tag.  The JavaScript API and basic programming model of the canvas tag roughly correspond to PostScript.  So, it becomes fairly easy to make a new canvas context type that captures it's output to PostScript file.

Works fully in FireFox (3.0.4).  Safari (3.2.1) runs but doesn't support getImageData for raster images.  Opera (9.52) seems to produce PostScript okay, but it's in-browser canvas is still [broken](http://philip.html5.org/tests/canvas/suite/tests/2d.path.arc.scale.2.html) of course.  IE doesn't even support canvas...

### Running

The rough way to test the output is by copy-pasting the results into a .eps file, and then running ps2pdf to create a PDF, which gets launched in the OSX Preview.app.  Any other use of GhostScript or another PostScript parser should also work, in theory.

There is also a patch queue (BitBucket, which seems to be down at the moment) on Philip Taylor's [canvas tests](http://philip.html5.org/tests/canvas/suite/tests/).  However, this testing process is still in need of documentation.  You'll need at least Python (for the test generation), Firefox to run the tests, and ImageMagick to convert the .eps to .png 

### Differences and Limitations

See `differences.txt`
