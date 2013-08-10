//==================================================================
//
// Requires
//
//==================================================================

var fs   = require('fs');
var path = require('path');
var exec = require('child_process').exec;

//==================================================================
//
// Vars
//
//==================================================================

var FORCE_LOG = true;

var pngExtension = 'png';

// Name of pngquant binary. Must be in your path.
var pngquant = 'pngquant';

// List of PNGs to optimize.
var pngs          = [];
var numPngs       = 0;
var currPng       = 0;
var opts          = [];
var cmdOpts       = '';

var options = {
  path:    '.',
  force:   true,
  ext:     '-optim.png',
  verbose: false
};

//==================================================================
//
// Functions
//
//==================================================================

/**
 * Wrapper for log writing.
 *
 * @param string msg Message to write.
 */
function writeLog(msg, force) {
  force = (typeof force === 'undefined') ? false : force;
  if (force) {
    console.log(msg);
  }
}

// From: http://stackoverflow.com/a/6358661/608884
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};


/**
 * Optimize a file.
 *
 * @param string file Path to file to optimize.
 * @param function callback Complete handler.
 */
var optimize = function(file, callback) {
  try {
    var cmd = pngquant + ' ' + cmdOpts + ' ' + file;
    writeLog("Running '" + cmd + "'...", options.verbose);
    exec(cmd, null, callback);
    return;
  } catch (err) {
    writeLog("ERROR: Unable to execute '" + cmd + "' command.", FORCE_LOG);
    writeLog("  " + err.message, FORCE_LOG);
    callback(err);
    return;
  }
};

/**
 * Callback for 'optimize()'.
 */
var onOptimizeComplete = function(err, stdout, stderr) {
  currPng++;
  if (!err) {
    if (currPng < numPngs) {
      optimize(pngs[currPng], onOptimizeComplete);
    } else {
      writeLog("Optimized " + numPngs + " PNGs.", FORCE_LOG);
      writeLog("Done!", FORCE_LOG);
    }
  }
};

/**
 * Filters out anything that doesn't end with 'pngExtension'.
 *
 * @param array files List of files to filter.
 */
var onlyPngs = function(files) {

  var isPng = function(file) {
    var ext = file.substring(file.lastIndexOf('.') + 1).toLowerCase();
    return ext == pngExtension;
  }

  return files.filter(isPng);
};

/**
 * Sets options to pass into 'pngquant'.
 */
var setOpts = function() {
  if (options.force === true) {
    opts.push('--ext .png');
    opts.push('--force');
  } else {
    opts.push('--ext ' + options.ext);
  }
  opts.push('--speed 1');
};

/**
 * Handler called once we've generated our list of files.
 *
 * @param object err Error object.
 * @param array Files list of files to optimize.
 */
var onWalkComplete = function(err, files) {

  if (err) throw err;

  pngs = onlyPngs(files);
  numPngs = pngs.length;
  currPng = 0;

  if (numPngs > 0) {
    setOpts()
    opts.push('--speed 1');
    cmdOpts = opts.join(' ');
    optimize(pngs[currPng], onOptimizeComplete);
  } else {
    writeLog("No PNGs to optimize.", FORCE_LOG);
  }

};

/**
 * Runs the script.
 *
 * @param string path Path to a single PNG (ends with '.png') or folder containing PNGs.
 * @param boolean force Overwrite PNGs in place with optimized version.
 * @param string ext to Use for optimized PNGs. 'force' must be false for this to work. Changes 'my.png' to 'my' + ext.
 * @param boolean verbose Whether to log a bunch of output.
 */
var run = function(path, force, ext, verbose) {

  options.path    = path || '.';
  options.force   = force;
  options.ext     = ext || '-optim.png';
  options.verbose = verbose;

  var dir = process.cwd();
  if (path.substring(0, 1) == '/') {
    // Absolute path
    dir = path;
  } else if (path != '.') {

    if (!path.lastIndexOf('/') != path.length - 1) {
      // Add trailing slash
      dir += '/';
    }
    dir += path;
  }

  var stats = fs.lstatSync(dir);
  if (stats.isDirectory()) {
    walk(path, onWalkComplete);
  } else {
    onWalkComplete(null, [ dir ]);
  }

};

module.exports = run;

