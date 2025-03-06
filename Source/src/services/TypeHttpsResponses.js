class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
        this.statusCode = 409; // Código de estado HTTP para conflicto
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404; // Código de estado HTTP para recurso no encontrado
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401; // Código de estado HTTP para no autorizado
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = 403; // Código de estado HTTP para prohibido
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400; // Código de estado HTTP para solicitud incorrecta
    }
}


module.exports = {
    ConflictError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    BadRequestError
};