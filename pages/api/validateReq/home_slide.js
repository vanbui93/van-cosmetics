import Joi from 'joi'

const slideValidation = data => {
    const slideSchme = Joi.object({
        text: Joi.string().required(),
        image_url: Joi.string().required(),
    })
    return slideSchme.validate(data)
}

export default slideValidation
