/**
 * Module dependencies
 */
 
var fs = require("fs");
var stdout = process.stdout;
var stdin = process.stdin;
var currentDir = __dirname;
var filesFound = [];
var fileCount = 0;

/**
 * This function is called everytime a directory
 * is selected.
 * 
 * @param err Used if an error occurs
 * @param files Array of file names in the directory being read
 */
function async(err, files) {
    if (!err) {
        filesFound = files;
        fileCount = filesFound.length;

        if (fileCount > 0) {
                console.log(fileCount + " files found. Please choose a file below:\n");
                checkFile(0);
        }
        else {
                console.log("\nNo files found");
                stdin.pause();
        }
    }
}

/**
 * Recursive function called for all files found in a directory
 * 
 * @param {Number} i key for next file in the filesFound array 
 */
function checkFile(i) {
    f = filesFound[i];
    fs.stat(currentDir + "/" + f, function(err, stat) {
        if (stat.isDirectory()) {
            f = "\033[36m" + f + "\033[39m" + "/";
        }
        else {
            f = "\033[90m" + f + "\033[39m";
        }
        console.log("[" + i + "] " + f);
        i++;

        if (i == fileCount) {
            stdout.write("\nEnter your choice: ");
            stdin.resume();
            stdin.setEncoding("utf8");
        }
        else {
            checkFile(i);
        }
    });
}

/**
 * Check incoming input from stdin
 * 
 * @param {String} data number selection by user
 */
function checkInput(data) {
    if (data.trim() != "") {
        var file = filesFound[Number(data)];
        fs.stat(currentDir + "/" + file, function(err, stat) {
            if (err == null) {
                if (stat.isDirectory()) {
                    currentDir = currentDir + "/" + file;
                    fs.readdir(currentDir, async);
                }
                else {
                    // Stop input
                    stdin.pause();
                    fs.readFile(currentDir + "/" + file, "utf8", function(err, data) {
                            console.log("\n\033[90m" + data + "\033[39m");
                    });
                }
            }
            else {
                stdout.write("Enter your choice: ");
            }
        });
    }
    else {
            stdout.write("Enter your choice: ");
    }
}

fs.readdir(currentDir, async);

stdin.on("data", function(data) {
    // Check input if valid
    checkInput(data);
});