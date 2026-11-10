import joi from 'joi';

function erorResponse(res, message, status, details = null) {
    res.status(status).json({
        success: false,
        message: message,
        data: null,
        error: details,
        eror: details
    });
}

const komikSchema = joi.object({
    title: joi.string().required().min(1).max(255),
    description: joi.string().trim().allow(null, '').required(),
    author: joi.string().required()
});

const updateKomikSchema = joi.object({
    title: joi.string().min(1).max(255),
    description: joi.string().trim().allow(null, ''),
    author: joi.string()
}).min(1);

const IdSchema = joi.object({
    id: joi.number().integer().positive().required()
});

function validateBody(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            convert: true,
            allowUnknown: false
        });

        if (error) {
            return erorResponse(
                res,
                'Validation Error',
                400,
                error.details.map((item) => ({
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
                res,
                'Validation Error',
                400,
                error.details.map((item) => ({
                    field: item.path.join('.'),
                    message: item.message
                }))
            );
        }

        Object.assign(req.params, value);
        next();
    };
}

export { komikSchema, updateKomikSchema, IdSchema, validateBody, validateParams };
