// ------------------------------------------------------------------------ core

var path = require('path');

// ------------------------------------------------------------------------- 3rd

var through = require('through2');

// --------------------------------------------------------------- own libraries

var findRequires = require('noder-js/findRequires');
var moduleFunction = String(require('noder-js/context').prototype.jsModuleEval("$CONTENT$"));
var noderPackageJson = require('noder-js/package.json');



/*******************************************************************************
 * Package
 ******************************************************************************/

module.exports.package = function (basePath) {
    return through.obj(function (file, encoding, done) {
        // ---------------------------------------------------------------------

        if (basePath == null) {
            basepath = '';
        }

        // ---------------------------------------------------------------------

        var fileContent = String(file.contents);
        var requires = findRequires(fileContent, true);

        var filePath;
        filePath = __dirname + '/../..' + basePath;
        filepath = path.relative(filePath, file.path);
        filePath = filePath.replace(/\\/g, '/');

        file.contents = new Buffer([
            'define(',
                JSON.stringify(filePath), ', ',
                JSON.stringify(requires), ', ',
                moduleFunction.replace("$CONTENT$", fileContent),
            ');'
        ].join(''));

        // ---------------------------------------------------------------------

        this.push(file);
        done();
    });
};



/*******************************************************************************
 * Wrap
 ******************************************************************************/

module.exports.wrap = function () {
    var header = '(function(define) {\n';
    var footer = '\n})(noder.define);';

    return through.obj(function (file, encoding, done) {
        // ---------------------------------------------------------------------
        file.contents = new Buffer(header + String(file.contents) + footer);
        // ---------------------------------------------------------------------
        this.push(file);
        done();
    });
};



/*******************************************************************************
 * Version
 ******************************************************************************/

module.exports.version = noderPackageJson.version;
