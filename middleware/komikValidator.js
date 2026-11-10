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

function validateKomik(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorDetails = error.details.map(detail => detail.message);
            return erorResponse(res, 'Validation Error', 400, errorDetails);
        }
        next();
    };
