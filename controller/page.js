import pageValidation from '../pages/api/validateReq/page'
import { executeQuery } from '../pages/api/db'

export async function getAllPage(req, res) {
    try {
        const query = 'SELECT * FROM pages'
        let page = await executeQuery(query)
        res.send(page)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getPageById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM pages WHERE id="${id}"`
        let page = await executeQuery(query)
        res.send(page)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deletePageById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from pages WHERE id="${id}"`
        let pageDada = await executeQuery(query)
        res.send(pageDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDatePageById(req, res) {
    try {
        let id = req.query.id
        const { name, slug, content, isDisplay } = req.body
        let pageData = await executeQuery(`SELECT * FROM pages where id="${id}"`)
        let result = pageValidation(req.body)
        if (result.error && pageData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE pages set name="${name}", slug="${slug}", content="${content}", isDisplay="${isDisplay}", update_date=CURRENT_TIMESTAMP() WHERE id="${id}"`
            let pageDada = await executeQuery(query)
            res.send(pageDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewPage(req, res) {
    try {
        const { name, slug, content, isDisplay } = req.body
        let result = pageValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let pageDada = await executeQuery(
                `INSERT INTO pages (name, slug, content, isDisplay, create_date) VALUES("${name}","${slug}","${content}","${isDisplay}",CURRENT_TIMESTAMP())`
            )
            pageDada = await executeQuery(`SELECT * from pages WHERE id=${pageDada.insertId}`)
            res.send(pageDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
