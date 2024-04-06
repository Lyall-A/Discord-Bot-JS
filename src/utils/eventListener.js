module.exports = {
    create(name, callback, listeners) {
        if (!listeners[name]) listeners[name] = [ ];
        listeners[name].push({ callback });
    },
    createOnce(name, callback, listeners) {
        if (!listeners[name]) listeners[name] = [ ];
        listeners[name].push({ once: true, callback });
    },
    call(name, listeners, args) {
        listeners[name]?.forEach((event, index) => {
            event.callback(...(args || []));
            if (event.once) listeners[name].splice(index, 1);
        });
    },
    delete(name, index, listeners) {
        listeners[name]?.splice(index, 1);
    }
}