const joi = require('joi');

function erorResponse(res, message, status, details = null) {
    res.status(status).json({
        success: false,
        message: message,
        data: null,
        eror: details
    });
}

const komikSchema = joi.object({
    title: joi.string().required().min(1).max(255),
    description: joi.string().trim().allow(null,'').required(),
    author: joi.string().required()
});


