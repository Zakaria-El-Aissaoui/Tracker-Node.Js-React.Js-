const Joi = require('@hapi/joi');

signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(8),
    adjective: {
        individuel: Joi.boolean(),
        agency: Joi.boolean()
    }
});

loginSchema = Joi.object({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(8)
});

const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

module.exports = { signupSchema, loginSchema };
