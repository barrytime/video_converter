const fs = require('fs');

const list_files = dir => {
    if (fs.existsSync(dir)) {
        return fs.readdirSync(dir);
    } else {
        return false;
    }
};

module.exports = { list_files };
