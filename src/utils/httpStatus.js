module.exports = {
    statuses: {
        // TODO: add EVERY status code and message here
    },
    type(status) {
        if (status >= 100 && status <= 199) return "informational";
        if (status >= 200 && status <= 299) return "successful";
        if (status >= 300 && status <= 399) return "redirection";
        if (status >= 400 && status <= 499) return "clienterror";
        if (status >= 500 && status <= 599) return "servererror";
        throw new Error("Invalid status code");
    },
    isInformational(status) {
        (status >= 100 && status <= 199) ? true : false;
    },
    isSuccessful(status) {
        (status >= 200 && status <= 299) ? true : false;
    },
    isRedirection(status) {
        (status >= 300 && status <= 399) ? true : false;
    },
    isClientError(status) {
        (status >= 400 && status <= 499) ? true : false;
    },
    isServerError(status) {
        (status >= 500 && status <= 599) ? true : false;
    },
    isError(status) {
        (status >= 400 && status <= 599) ? true : false;
    }
}