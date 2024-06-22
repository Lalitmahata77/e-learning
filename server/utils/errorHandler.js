class ErrorHandller extends Error {
    constructor(message, setStatusCode){
        super(message)
        this.setStatusCode = setStatusCode

        Error.captureStackTrace(this, this.constructor)
    }
}
export default ErrorHandller