import home_slideValidation from '../pages/api/validateReq/home_slide'
import { executeQuery } from '../pages/api/db'

export async function getAllSlide(req, res) {
    try {
        const query = 'SELECT * FROM home_slides'
        let home_slide = await executeQuery(query)
        res.send(home_slide)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getSlideById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM home_slides WHERE id="${id}"`
        let home_slide = await executeQuery(query)
        res.send(home_slide)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteSlideById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from home_slides WHERE id="${id}"`
        let home_slideDada = await executeQuery(query)
        res.send(home_slideDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateSlideById(req, res) {
    try {
        let id = req.query.id
        const { text, image_url } = req.body
        let home_slideData = await executeQuery(`SELECT * FROM home_slides where id="${id}"`)
        let result = home_slideValidation(req.body)
        if (result.error && home_slideData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE home_slides set text='${text}', image_url='${image_url}' WHERE id="${id}"`
            let home_slideDada = await executeQuery(query)
            res.send(home_slideDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewSlide(req, res) {
    try {
        const { text, image_url } = req.body
        let result = home_slideValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let home_slideDada = await executeQuery(
                `INSERT INTO home_slides (text, image_url) VALUES("${text}","${image_url}")`
            )
            home_slideDada = await executeQuery(`SELECT * from home_slides WHERE id=${home_slideDada.insertId}`)
            res.send(home_slideDada)
        }
    } catch (err) {
        res.status(500).json(err)
    } 
}
