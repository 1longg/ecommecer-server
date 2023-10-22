import { IncomingHttpHeaders } from "node:http"

export {}

declare global {
    namespace Express {
        export interface Request {
            headers: IncomingHttpHeaders & {
               'x-client-id' ?: string,
               'x-api-key' ?: string,
            }
        }
    }
}