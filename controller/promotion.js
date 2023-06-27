import promotionValidation from '../pages/api/validateReq/promotion'
import { executeQuery } from '../pages/api/db'

export async function getAllPromotion(req, res) {
    try {
        const query = 'SELECT * FROM promotions'
        let promotion = await executeQuery(query)
        res.send(promotion)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getPromotionById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM promotions WHERE id="${id}"`
        let promotion = await executeQuery(query)
        res.send(promotion)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deletePromotionById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from promotions WHERE id="${id}"`
        let promotionDada = await executeQuery(query)
        res.send(promotionDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDatePromotionById(req, res) {
    try {
        let id = req.query.id
        const { promotion_text } = req.body
        let promotionData = await executeQuery(`SELECT * FROM promotions where id="${id}"`)
        let result = promotionValidation(req.body)
        if (result.error && promotionData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE promotions set promotion_text="${promotion_text}" WHERE id="${id}"`
            let promotionDada = await executeQuery(query)
            res.send(promotionDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewPromotion(req, res) {
    try {
        const { promotion_text } = req.body
        let result = promotionValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let promotionDada = await executeQuery(
                `INSERT INTO promotions (promotion_text) VALUES("${promotion_text}")`
            )
            promotionDada = await executeQuery(`SELECT * from promotions WHERE id=${promotionDada.insertId}`)
            res.send(promotionDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
