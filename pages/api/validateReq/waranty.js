import Joi from 'joi'

const warantyValidation = data => {
    const warantySchme = Joi.object({
        waranty_text: Joi.string().required(),
    })
    return warantySchme.validate(data)
}

export default warantyValidation
