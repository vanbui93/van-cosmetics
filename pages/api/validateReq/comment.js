import Joi from 'joi'

const commentValidation = data => {
    const commentSchme = Joi.object({
        name: Joi.string().required(),
        position: Joi.string().required(),
        position: Joi.string().required(),
        image: Joi.string().required(),
        content: Joi.string().required(),
    })
    return commentSchme.validate(data)
}

export default commentValidation
