import Joi from 'joi'

const videoValidation = data => {
    const videoSchme = Joi.object({
        video_link: Joi.string().required(),
        video_text: Joi.string().required(),
    })
    return videoSchme.validate(data)
}

export default videoValidation
