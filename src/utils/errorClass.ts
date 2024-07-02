class ErrorHandlerClass extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, ErrorHandlerClass.prototype);
    }
}

export default ErrorHandlerClass;
