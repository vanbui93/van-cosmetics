import Joi from 'joi'

const colorValidation = data => {
    const colorSchme = Joi.object({
        data_color: Joi.string().required(),
        color_name: Joi.string().required(),
    })
    return colorSchme.validate(data)
}

export default colorValidation
