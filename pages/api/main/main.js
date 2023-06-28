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

export async function getmainById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM main WHERE id="${id}"`
        let mainJson = await executeQuery(query)
        res.send(mainJson)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteMainById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from main WHERE id="${id}"`
        let mainDada = await executeQuery(query)
        res.send(mainDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewMain(req, res) {
    try {
        const {
            name,
            images,
            collection,
            price,
            compare_price,
            newBox,
            colors,
            warantys,
            skus,
            videos,
            isDisplay,
        } = req.body
        const ckPrice = price ? price : 'NULL'
        const ckComparePrice = compare_price ? compare_price : 'NULL'
        const ckNewBox = newBox ? newBox : 'NULL'
        const jsonImg = images.length > 2 ? JSON.stringify(images) : '"[]"'
        const jsonColor = colors.length > 2 ? JSON.stringify(colors) : '"[]"'
        const jsonWaranty = warantys.length > 2 ? JSON.stringify(warantys) : '"[]"'
        const jsonSku = skus.length > 2 ? JSON.stringify(skus) : '"[]"'
        const jsonVideo = videos.length > 2 ? JSON.stringify(videos) : '"[]"'

        let result = mainValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let mainDada = await executeQuery(
                `INSERT INTO main (name,images,collection,price,compare_price,newBox,colors,warantys,skus,videos,create_date,isDisplay)
                VALUES("${name}",${jsonImg},"${collection}",${ckPrice},${ckComparePrice},${ckNewBox},${jsonColor},${jsonWaranty},${jsonSku},${jsonVideo},CURRENT_TIMESTAMP(),${isDisplay})`
            )
            mainDada = await executeQuery(`SELECT * from main WHERE id=${mainDada.insertId}`)
            res.send(mainDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateMainById(req, res) {
    try {
        let id = req.query.id
        const {
            name,
            images,
            collection,
            price,
            compare_price,
            newBox,
            colors,
            warantys,
            skus,
            videos,
            isDisplay,
        } = req.body
        const jsonImg = images.length > 2 ? JSON.stringify(images) : '"[]"'
        const jsonColor = colors.length > 2 ? JSON.stringify(colors) : '"[]"'
        const jsonWaranty = warantys.length > 2 ? JSON.stringify(warantys) : '"[]"'
        const jsonSku = skus.length > 2 ? JSON.stringify(skus) : '"[]"'
        const jsonVideo = videos.length > 2 ? JSON.stringify(videos) : '"[]"'
        let mainData = await executeQuery(
            `SELECT name,images,collection,price,compare_price,newBox, JSON_EXTRACT(colors, "$[*]") AS colors, JSON_EXTRACT(warantys, "$[*]") AS warantys, JSON_EXTRACT(skus, "$[*]") AS skus, JSON_EXTRACT(videos, "$[*]") AS videos,update_date,isDisplay FROM main where id="${id}"`
        )
        let result = mainValidation(req.body)
        if (result.error && mainData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE main set name="${name}", images=${jsonImg}, collection="${collection}", price="${price}", compare_price="${compare_price}", newBox="${newBox}", colors=${jsonColor}, warantys=${jsonWaranty}, skus=${jsonSku}, videos=${jsonVideo}, update_date=CURRENT_TIMESTAMP(), isDisplay=${isDisplay} WHERE id=${id}`
            let mainDada = await executeQuery(query)
            res.json(mainDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
