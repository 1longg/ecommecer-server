const StatusError = {
    FORBIDEN: 403,
    CONFLICT: 409,
    NOT_FOUND: 404
}

const ReasonStatusCode = {
    FORBIDEN: 'Bad request error',
    CONFLICT: 'Conflict error',
    NOT_FOUND: 'Not found error'
}

export class ErrorResponse extends Error {
    public status: number
    constructor(message: string, status: number){
        super(message)
        this.status = status
    }
}

export class ConflictError extends ErrorResponse {
    constructor(message: string = ReasonStatusCode.CONFLICT, statusCode: number = StatusError.CONFLICT){
        super(message, statusCode)
    }
}

export class NotFoundError extends ErrorResponse {
    constructor(message: string = ReasonStatusCode.NOT_FOUND, statusCode: number = StatusError.NOT_FOUND){
        super(message, statusCode)
    }
}

export class ForbidenError extends ErrorResponse {
    constructor(message: string = ReasonStatusCode.FORBIDEN, statusCode: number = StatusError.FORBIDEN){
        super(message, statusCode)
    }
}

