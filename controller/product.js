import productValidation from '../pages/api/validateReq/product'
import { executeQuery } from '../pages/api/db'

export async function getAllProduct(req, res) {
    try {
        const query = `SELECT id,name,images,collection,price,compare_price,newBox,fullbox, JSON_EXTRACT(colors, "$[*]") AS colors, JSON_EXTRACT(warantys, "$[*]") AS warantys, JSON_EXTRACT(skus, "$[*]") AS skus, JSON_EXTRACT(videos, "$[*]") AS videos,create_date,update_date,isDisplay FROM products`
        let product = await executeQuery(query)
        res.json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getProductById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM products WHERE id="${id}"`
        let product = await executeQuery(query)
        res.send(product)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteProductById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from products WHERE id="${id}"`
        let productDada = await executeQuery(query)
        res.send(productDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewProduct(req, res) {
    try {
        const {
            name,
            images,
            collection,
            price,
            compare_price,
            newBox,
            fullbox,
            colors,
            warantys,
            skus,
            videos,
            isDisplay,
        } = req.body
        const ckPrice = price ? price : 'NULL'
        const ckComparePrice = compare_price ? compare_price : 'NULL'
        const ckNewBox = newBox ? newBox : 'NULL'
        const ckFullBox = fullbox ? fullbox : 'NULL'
        const jsonImg = images.length > 2 ? JSON.stringify(images) : '"[]"'
        const jsonColor = colors.length > 2 ? JSON.stringify(colors) : '"[]"'
        const jsonWaranty = warantys.length > 2 ? JSON.stringify(warantys) : '"[]"'
        const jsonSku = skus.length > 2 ? JSON.stringify(skus) : '"[]"'
        const jsonVideo = videos.length > 2 ? JSON.stringify(videos) : '"[]"'

        let result = productValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let productDada = await executeQuery(
                `INSERT INTO products (name,images,collection,price,compare_price,newBox,fullbox,colors,warantys,skus,videos,create_date,isDisplay)
                VALUES("${name}",${jsonImg},"${collection}",${ckPrice},${ckComparePrice},${ckNewBox},${ckFullBox},${jsonColor},${jsonWaranty},${jsonSku},${jsonVideo},CURRENT_TIMESTAMP(),${isDisplay})`
            )
            productDada = await executeQuery(`SELECT * from products WHERE id=${productDada.insertId}`)
            res.send(productDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateProductById(req, res) {
    try {
        let id = req.query.id
        const {
            name,
            images,
            collection,
            price,
            compare_price,
            newBox,
            fullbox,
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
        let productData = await executeQuery(
            `SELECT name,images,collection,price,compare_price,newBox,fullbox, JSON_EXTRACT(colors, "$[*]") AS colors, JSON_EXTRACT(warantys, "$[*]") AS warantys, JSON_EXTRACT(skus, "$[*]") AS skus, JSON_EXTRACT(videos, "$[*]") AS videos,update_date,isDisplay FROM products where id="${id}"`
        )
        let result = productValidation(req.body)
        if (result.error && productData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE products set name="${name}", images=${jsonImg}, collection="${collection}", price="${price}", compare_price="${compare_price}", newBox="${newBox}", fullbox="${fullbox}", colors=${jsonColor}, warantys=${jsonWaranty}, skus=${jsonSku}, videos=${jsonVideo}, update_date=CURRENT_TIMESTAMP(), isDisplay=${isDisplay} WHERE id=${id}`
            let productDada = await executeQuery(query)
            res.json(productDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
