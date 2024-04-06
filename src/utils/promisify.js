module.exports = fn => {
    return function (...args) {
        new Promise((resolve, reject) => {
            try {
                fn(...args, (...params) => {
                    resolve(params);
                });
            } catch (err) { reject(err) };
        });
    }
}