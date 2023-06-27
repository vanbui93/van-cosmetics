import Joi from 'joi'

const productValidation = data => {
    const productSchme = Joi.object({
        page_title: Joi.string().optional().allow(''),
        phone: Joi.string().optional().allow(''),
        phone_text: Joi.string().optional().allow(''),
        hotline: Joi.string().optional().allow(''),
        logo_img: Joi.string().optional().allow(''),
        logo_alt: Joi.string().optional().allow(''),
        address: Joi.string().optional().allow(''),
        core_content_01: Joi.string().optional().allow(''),
        core_content_02: Joi.string().optional().allow(''),
        core_content_03: Joi.string().optional().allow(''),
        core_content_04: Joi.string().optional().allow(''),
        core_title_01: Joi.string().optional().allow(''),
        core_title_02: Joi.string().optional().allow(''),
        core_title_03: Joi.string().optional().allow(''),
        core_title_04: Joi.string().optional().allow(''),
        footer_sub: Joi.string().optional().allow(''),
        footer_title: Joi.string().optional().allow(''),
        header_content: Joi.string().optional().allow(''),
        menu_hambuger: Joi.string().optional().allow(''),
    })
    return productSchme.validate(data)
}

export default productValidation
