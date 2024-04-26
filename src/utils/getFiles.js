const fs = require("fs");
const path = require("path");

function getFiles(dirPath, fileFilter, dirFilter, depth, currDepth = 0) {
    const files = [ ];

    fs.readdirSync(dirPath)
        .filter(typeof dirFilter == "function" ? dirFilter : () => true)
        .forEach(fileName => {
            const joinedPath = path.join(dirPath, fileName);
            if (fs.lstatSync(joinedPath).isDirectory()) {
                if ((typeof depth == "number" && currDepth < depth) || typeof depth != "number")
                    files.push(...getFiles(joinedPath, fileFilter, dirFilter, depth, currDepth+1));
            } else {
                if (typeof fileFilter == "function" ? fileFilter(joinedPath) : true) files.push(joinedPath);
            }
        });

    return files;
}

module.exports = getFiles;