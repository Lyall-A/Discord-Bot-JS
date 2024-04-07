const fs = require("fs");
const path = require("path");

function getFiles(dirPath, filter, depth, currDepth = 0) {
    const files = [ ];

    fs.readdirSync(dirPath)
        .filter(typeof filter == "function" ? filter : () => true)
        .forEach(fileName => {
            const joinedPath = path.join(dirPath, fileName);
            if (fs.lstatSync(joinedPath).isDirectory()) {
                if ((depth && currDepth < depth) || !depth)
                    files.push(...getFiles(joinedPath, filter, depth, currDepth+1));
            } else {
                files.push(joinedPath);
            }
        });

    return files;
}

module.exports = getFiles;