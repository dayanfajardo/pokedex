import * as Joi from "joi";

//joi me sirve para reglas de validacion
export const JoiValidationSchema  = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6),
})



