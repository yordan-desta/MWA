/* This is a helper module to build http response message for mongoose operation callbacks */

/**
 * Builds a response for get requests
 * @param {mongoose error object} err 
 * @param {mongoose document object} doc 
 * @returns response object
 */
module.exports.findDocumentResponse = function(err, doc) {
    const response = {
        status: 200,
        message: doc,
        ok: true
    };

    if (err) {
        response.status = 500;
        response.message = err;
        response.ok = true;
    } else if (!doc) {
        response.status = 404;
        response.message = { "message": "Resource not found!" }
        response.ok = true;
    }

    return response;
};

/**
 * Builds a response for create requests
 * @param {mongoose error object} err 
 * @param {mongoose document object} doc 
 * @returns response object
 */
module.exports.buildCreateResponse = function(err, doc) {
    const response = {
        status: 201,
        message: doc,
        ok: true
    };

    if (err) {
        response.status = 500;
        response.message = err;
        response.ok = false;
    }

    return response;
};

/**
 * Builds a response for update and patch requests
 * @param {mongoose error object} err 
 * @param {mongoose document object} doc 
 * @returns response object
 */

module.exports.buildUpdateResponse = function(err, doc) {
    const response = {
        status: 204,
        message: doc,
        ok: true
    };

    if (err) {
        response.status = 500;
        response.message = err;
        response.ok = false;
    };

    return response;
};

/**
 * Builds a response for delete requests to a docuemnt
 * @param {mongoose error object} err 
 * @param {mongoose document object} doc 
 * @returns response object
 */

module.exports.buildDeleteResponse = function(err, doc) {
    const response = {
        status: 204,
        message: doc,
        ok: true
    };

    if (err) {
        response.status = 500;
        response.message = err;
        response.ok = false;
    }
    return response;
};