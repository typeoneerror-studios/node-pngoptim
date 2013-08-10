# pngoptim

A utility for optimizing 24-bit PNGs as 8-bit PNGs that can be run from the command line or your node.js programs.

## Installation

### Mac

Install [pngquant](http://pngquant.org/) and add it to your path.

Alternatively, on OSX you can download and install [ImageAlpha](http://pngmini.com/), a GUI app that includes the `pngquant` binary, then symlink the included `pngquant` binary into your path. This is a nice option as a GUI app is great for quickly testing an image or two before batching several dozen up and ensures both your GUI app and command line app use the same binary.

Once you have `pngquant` installed install the `pngoptim` script via [npm](https://npmjs.org/):

    $ npm install -g path/to/git

### Windows

To come?

### Linux

To come?

## Sample Usage

### The Basics

The simplest usage is to `cd` into your folder of PNGs and type:

    $ pngoptim

`pngoptim` will recurse through all folders and build a list of PNGs that live in those folders and optimize them.

### Paths

`pngoptim` will also take a path to a folder of images via the `p` or `path` option:

    $ pngoptim --path relative/path/to/my/pngs

or

    $ pngoptim -p /absolute/path/to/pngs

or

    $ pngoptim -p ../up/one/from/where/i/am

or

    # Current folder, explicitly
    $ pngoptim -p .

If you only want to optimize a single image use pass a path to that image:

    $ pngoptim -p relative/path/to/my.png

Just like with folders you can use relative and absolute paths.

### In-Place Optimization

In-place optimization simply means that the existing source file will be overwritten with the optimized file. This means if you optimize `my.png` it will be overwritten with the optimized version.

In-place optimization is enabled by default and can be toggled with the `f` or `force` option:

    # Use in-place optimization, explicitly
    $ pngoptim -p . --force

    # Use in-place optimization, implicitly
    $ pngoptim -p .

    # Don't use in-place optimization
    $ pngoptim -p . -f false

    # Use in-place optimization, explicity, pt. 2
    $ pngoptim -p . --force true

### Optimized File Extension

If you don't want to use in-place optimization, use extensions instead. Extensions and in-place optimization are mutually exclusive so you can only use one or the other.

To use the default extension, `-optim.png` simply disable in-place optimization:

    # Use default extension '-optim.png'
    $ pngoptim -p . --force false

With the above example, if you optimized a file called `my.png` the optimized file will be called `my-optim.png` and `my.png` will remain unchanged.

You can specifiy the extension you'd like to use:

    # Specify an extension
    $ pngoptim -p . --force false --ext -my-ext.png

With the above example, if you optimized a file called `my.png` the optimized file will be called `my-my-ext.png`.

### Verbosity

Want to keep your finger on the pulse of `pngoptim` while it does its thing? Then the `verbose` (or `v`) option is for you:

    # Talk to me pngoptim
    $ pngoptim -p . --verbose

### Help

Need help?

    $ pngoptim --help

## Use pngoptim in Your Node Programs

Being able to run `pngoptim` from the command line is nice but you might want to hook it into a Node program. Simply `require()` it and you're ready to go:


    var pngoptim = require('pngoptim');

    // pngoptim in node takes the same arguments as the command line version.
    // In fact, the command line version just takes your arguments and passes
    // them into 'pngoptim()'.
    pngoptim(path, force, extension, verbose);

## License

Pngoptim is licensed under the MIT license.
