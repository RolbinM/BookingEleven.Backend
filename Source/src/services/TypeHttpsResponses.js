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


module.exports = {
    ConflictError,
    NotFoundError
};