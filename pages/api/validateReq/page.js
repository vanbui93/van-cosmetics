import Joi from 'joi'

const pageValidation = data => {
    const pageSchme = Joi.object({
        name: Joi.string().required(),
        slug: Joi.string().required(),
        content: Joi.string().required(),
        isDisplay: Joi.number().required(),
    })
    return pageSchme.validate(data)
}

export default pageValidation
