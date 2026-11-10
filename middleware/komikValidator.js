const joi = require('joi');

function erorResponse(res, message, status, details = null) {
    res.status(status).json({
        success: false,
        message: message,
        data: null,
        eror: details
    });
}

