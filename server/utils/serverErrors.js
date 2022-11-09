class ServerError {
    statusCode;
    message

    ServerError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ServerError;