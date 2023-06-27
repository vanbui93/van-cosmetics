import Joi from 'joi'

const collectionValidation = data => {
    const collectionSchme = Joi.object({
        name: Joi.string().required(),
        collection: Joi.string().required(),
    })
    return collectionSchme.validate(data)
}

export default collectionValidation
