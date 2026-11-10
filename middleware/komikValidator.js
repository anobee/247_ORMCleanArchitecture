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
        const (eror, value) = schema.validate(req.body, 
            { abortEarly: false,
                 convert: true,
                 allowUnknown: false
            }); 

        if (eror) {
            return erorResponse(
                res, 'Validation Error',
                400,
                eror.details.map((item) => ({
                    field: item.path.join('.'),
                    message: item.message
                }))
            );
        }

        req.body = value;
        next();
    };
}

function validateParams(schema) {
    return (req, res, next) => {
        const { id } = req.params;
        const { error, value } = schema.validate({ id });

        if (error) {
            return erorResponse(
                res, 'Validation Error',    
                400,
                error.details.map((item) => ({
                field: item.path.join('.'),
                message: item.message
            }))
        );

    }
    req.params = value;
    next();
    }
}
