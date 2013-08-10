//==================================================================
//
// Requires
//
//==================================================================

var fs       = require('fs');
var path     = require('path');
var exec     = require('child_process').exec;
var pngoptim = require('./pngoptim');

var main = function() {

var desc = {
    path:    'Relative path to folder of PNGs.',
    force:   'Overwrite PNGs in place. Existing files will be overwritten by optimized ones.',
    ext:     'Extension to be used for optimized file, instead of overwritting existing file.',
    verbose: 'Barf extra output to console.'
};

var argv = require('optimist')
            .default('path', '.')
            .alias('path', 'p')
            .default('force', true)
            .alias('force', 'f')
            .default('ext', '-optim.png')
            .alias('ext', 'e')
            .boolean('verbose')
            .alias('verbose', 'v')
            .boolean('help')
            .alias('help', 'h')
            .describe(desc)
            .argv;

var help = function() {
    var s = "\n  pngoptim\n"
          + "\n"
          + "  Basic Usage\n"
          + "  -----------\n"
          + "\n"
          + "    pngoptim\n"
          + "\n"
          + "  Options\n"
          + "  -------\n"
          + "\n"
          + "    -p, --path:     Path to PNG or folder of PNGs.\n"
          + "\n"
          + "    -f, --force:    Overwrite PNGs in place. Existing files will be\n"
          + "                    overwritten by optimized ones. (Default: true).\n"
          + "\n"
          + "    -e, --ext:      Extension to be used for optimized files, instead\n"
          + "                    of overwritting existing files. (Default: '-optim.png')\n"
          + "                    For example, 'my.png' becomes 'my-optim.png'.\n"
          + "\n"
          + "    -v, --verbose:  Print extra output to console.\n"
          + "\n"
          + "    -h, --help:     This help.\n";

    console.log(s);
};


if (argv.help === true) {
    help();
} else {
    pngoptim(argv.path, argv.force, argv.ext, argv.verbose);
}

};

module.exports.main = main;