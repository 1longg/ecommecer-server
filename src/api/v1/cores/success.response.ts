import { Response } from 'express';

const StatusCode = {
    OK: 200,
    CREATED: 201
}

const ReasonStatusCode = {
    OK: 'OK',
    CREATED: 'CREATED'
}


class SuccessResponse {
    message: string;
    statusCode: number;
    metadata: object;
    reasonStatusCode: string;

    constructor({message, metadata = {}, statusCode = StatusCode.OK, reasonStatusCode= ReasonStatusCode.OK}) {
        this.message = !message ? reasonStatusCode : message;
        this.statusCode = statusCode;
        this.metadata = metadata;
        this.reasonStatusCode = reasonStatusCode;
    }

    send(res: Response) {
        return res.status(this.statusCode).json(this);
    }
}

export class OK extends SuccessResponse {
    constructor({message, metadata}) {
        super({message,metadata})
    }
}
export class CREATED extends SuccessResponse {
    constructor({message, metadata, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED}) {
        super({message,metadata})
        this.statusCode = statusCode;
        this.reasonStatusCode = reasonStatusCode;
    }
}
