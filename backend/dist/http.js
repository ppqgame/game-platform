export class HttpError extends Error {
    status;
    details;
    constructor(status, message, details) {
        super(message);
        this.status = status;
        this.details = details;
    }
}
export function notFoundHandler(_req, res) {
    res.status(404).json({ error: "Not found" });
}
export function errorHandler(err, _req, res, _next) {
    if (err instanceof HttpError) {
        return res.status(err.status).json({
            error: err.message,
            details: err.details,
        });
    }
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
}
//# sourceMappingURL=http.js.map