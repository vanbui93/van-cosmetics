import Joi from 'joi'

const promotionValidation = data => {
    const promotionSchme = Joi.object({
        promotion_text: Joi.string().required(),
    })
    return promotionSchme.validate(data)
}

export default promotionValidation
