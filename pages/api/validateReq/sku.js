import Joi from 'joi'

const skuValidation = data => {
    const skuSchme = Joi.object({
        data_sku: Joi.string().required(),
        memory: Joi.string().required(),
    })
    return skuSchme.validate(data)
}

export default skuValidation
