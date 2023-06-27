import Joi from 'joi'

const orderValidation = data => {
    const orderSchme = Joi.object({
        id: Joi.number(),
        customer_name: Joi.string().required(),
        customer_email: Joi.string().optional().allow(''),
        customer_phone: Joi.string().required(),
        customer_address: Joi.string().required(),
        customer_city: Joi.string().required(),
        customer_notes: Joi.string().optional().allow(''),
        product_name: Joi.string().required(),
        product_image: Joi.string(),
        product_price: Joi.number().optional().allow(''),
        product_fullbox: Joi.number().optional().allow(''),
        product_newBox: Joi.number().optional().allow(''),
        sku: Joi.string().optional().allow(''),
        color: Joi.string().optional().allow(''),
        promotion: Joi.string().optional().allow(''),
    })
    return orderSchme.validate(data)
}

export default orderValidation
