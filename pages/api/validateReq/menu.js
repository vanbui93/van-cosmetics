import Joi from 'joi'

const menuValidation = data => {
    const menuSchme = Joi.object({
        name: Joi.string().required(),
        link: Joi.string().required(),
    })
    return menuSchme.validate(data)
}

export default menuValidation
