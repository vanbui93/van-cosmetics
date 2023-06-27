import Joi from 'joi'

const userValidation = data => {
    const userSchme = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        pass: Joi.string().required(),
    })
    return userSchme.validate(data)
}

export default userValidation
