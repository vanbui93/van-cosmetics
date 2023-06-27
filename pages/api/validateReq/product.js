import Joi from 'joi'

const productValidation = data => {
    const productSchme = Joi.object({
        id: Joi.number(),
        name: Joi.string().required(),
        images: Joi.string().optional().allow(''),
        collection: Joi.string().optional().allow(''),
        price: Joi.number().optional().allow(''),
        compare_price: Joi.number().optional().allow(''),
        newBox: Joi.number().optional().allow(''),
        fullbox: Joi.number().optional().allow(''),
        promotions: Joi.string().optional().allow(''),
        colors: Joi.string().optional().allow(),
        products: Joi.string().optional().allow(),
        skus: Joi.string().optional().allow(),
        videos: Joi.string().optional().allow(),
        warantys: Joi.string().optional().allow(),
        isDisplay: Joi.number().optional().allow(),
    })
    return productSchme.validate(data)
}

export default productValidation
