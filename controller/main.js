import mainValidation from '../pages/api/validateReq/main'
import { executeQuery } from '../pages/api/db'

export async function getAllMain(req, res) {
    try {
        const query = `SELECT * FROM main`
        let mainJson = await executeQuery(query)
        res.json(mainJson)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getMainById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM main WHERE id="${id}"`
        let mainJson = await executeQuery(query)
        res.json(mainJson)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateMainById(req, res) {
    try {
        let id = req.query.id

        const {
            page_title,
            phone,
            phone_text,
            hotline,
            logo_img,
            logo_alt,
            address,
            core_content_01,
            core_content_02,
            core_content_03,
            core_content_04,
            core_title_01,
            core_title_02,
            core_title_03,
            core_title_04,
            footer_sub,
            footer_title,
            header_content,
            menu_hambuger,
        } = req.body

        const json_page_title = JSON.stringify(page_title)
        const json_phone = JSON.stringify(phone)
        const json_phone_text = JSON.stringify(phone_text)
        const json_hotline = JSON.stringify(hotline)
        const json_logo_img = JSON.stringify(logo_img)
        const json_logo_alt = JSON.stringify(logo_alt)
        const json_address = JSON.stringify(address)
        const json_core_content_01 = JSON.stringify(core_content_01)
        const json_core_content_02 = JSON.stringify(core_content_02)
        const json_core_content_03 = JSON.stringify(core_content_03)
        const json_core_content_04 = JSON.stringify(core_content_04)
        const json_core_title_01 = JSON.stringify(core_title_01)
        const json_core_title_02 = JSON.stringify(core_title_02)
        const json_core_title_03 = JSON.stringify(core_title_03)
        const json_core_title_04 = JSON.stringify(core_title_04)
        const json_footer_sub = JSON.stringify(footer_sub)
        const json_footer_title = JSON.stringify(footer_title)
        const json_header_content = JSON.stringify(header_content)
        const json_menu_hambuger = JSON.stringify(menu_hambuger)

        let mainData = await executeQuery(`SELECT * FROM main where id="${id}"`)
        let result = mainValidation(req.body)
        if (result.error && mainData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE main set page_title=${json_page_title}, phone=${json_phone}, phone_text=${json_phone_text}, hotline=${json_hotline}, logo_img=${json_logo_img}, logo_alt=${json_logo_alt}, address=${json_address}, core_content_01=${json_core_content_01}, core_content_02=${json_core_content_02}, core_content_03=${json_core_content_03}, core_content_04=${json_core_content_04}, core_title_01=${json_core_title_01}, core_title_02=${json_core_title_02}, core_title_03=${json_core_title_03}, core_title_04=${json_core_title_04}, footer_sub=${json_footer_sub}, footer_title=${json_footer_title}, header_content=${json_header_content}, menu_hambuger=${json_menu_hambuger} WHERE id=${id}`
            // const query = `UPDATE main set page_title=${jsonPageTitle} WHERE id=${id}`
            let mainDada = await executeQuery(query)
            res.json(mainDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
