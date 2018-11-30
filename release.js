var smartZip = require("smart-zip");
var replace = require("replace");
var newVersionNumber = process.argv[2];

if (!newVersionNumber) return console.error("Version number not specified");
console.log("New version: ", newVersionNumber)

replace({
    regex: /version([\s\S]*?),/,
    replacement: "version\": \"" + newVersionNumber + "\",",
    paths: ['package.json', 'package-lock.json'],
    recursive: true,
    silent: true
});

var regexExcludes = ['README.md', 'node_modules', 'src', 'gulpfile.js', 'release.js', '.gitignore', '.git'];
smartZip.zip('./', 'bitsofcode-ghost.zip', false, regexExcludes, function (error) {
    if (error) {
        throw error;
    }
    console.log('Completed');
});
