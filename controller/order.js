import orderValidation from '../pages/api/validateReq/order'
import { executeQuery } from '../pages/api/db'

export async function getAllOrder(req, res) {
    try {
        const query = `SELECT id,customer_name,customer_email,customer_phone,customer_address,customer_city,customer_notes,product_name,product_image,product_newBox,product_fullbox,product_price,sku,color, create_date FROM orders`
        let order = await executeQuery(query)
        res.json(order)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getOrderById(req, res) {
    let id = req.query.id
    try {
        const query = `SELECT * FROM orders WHERE id="${id}"`
        let order = await executeQuery(query)
        res.send(order)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function deleteOrderById(req, res) {
    let id = req.query.id
    try {
        const query = `DELETE from orders WHERE id="${id}"`
        let orderDada = await executeQuery(query)
        res.send(orderDada)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function upDateOrderById(req, res) {
    try {
        let id = req.query.id
        const {
            customer_name,
            customer_email,
            customer_phone,
            customer_address,
            customer_city,
            customer_notes,
            product_name,
            product_image,
            product_newBox,
            product_price,
            product_fullbox,
            sku,
            color,
        } = req.body
        const ckSku = sku ? sku : 'NULL'
        const ckColor = color ? color : 'NULL'
        const ckPrice = product_price ? product_price : 'NULL'
        const ckNewBox = product_newBox ? product_newBox : 'NULL'
        const ckFullBox = product_fullbox ? product_fullbox : 'NULL'
        let orderData = await executeQuery(
            `SELECT id,customer_name,customer_email,customer_phone,customer_address,customer_city,customer_notes,product_name,product_image,product_newBox,product_fullbox,product_price,sku,color,create_date FROM orders where id="${id}"`
        )
        let result = orderValidation(req.body)
        if (result.error && orderData.length > 0) {
            res.status(400).send(result.error.details[0])
        } else {
            const query = `UPDATE orders set customer_name="${customer_name}", customer_email="${customer_email}", customer_phone="${customer_phone}", customer_address="${customer_address}", customer_city="${customer_city}", customer_notes="${customer_notes}", product_name="${product_name}",product_image="${product_image}", product_newBox=${ckNewBox},product_fullbox=${ckFullBox}, product_price=${ckPrice}, sku="${ckSku}", color="${ckColor}" WHERE id=${id}`
            let orderDada = await executeQuery(query)
            res.json(orderDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addNewOrder(req, res) {
    try {
        const {
            id,
            customer_name,
            customer_email,
            customer_phone,
            customer_address,
            customer_city,
            customer_notes,
            product_name,
            product_price,
            product_image,
            product_newBox,
            product_fullbox,
            sku,
            color,
        } = req.body
        const ckPrice = product_price ? product_price : 'NULL'
        const ckNewBox = product_newBox ? product_newBox : 'NULL'
        const ckFullBox = product_fullbox ? product_fullbox : 'NULL'
        let result = orderValidation(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            let orderDada = await executeQuery(
                `INSERT INTO orders (id,customer_name, customer_email,customer_phone,customer_address,customer_city,customer_notes,product_name,product_image,product_price,sku,color,product_newBox,product_fullbox,create_date)
                VALUES(${id},"${customer_name}","${customer_email}","${customer_phone}","${customer_address}","${customer_city}","${customer_notes}","${product_name}","${product_image}",${ckPrice},"${sku}","${color}",${ckNewBox},${ckFullBox}, CURRENT_TIMESTAMP())`
            )
            orderDada = await executeQuery(`SELECT * from orders WHERE id=${orderDada.insertId}`)
            res.send(orderDada)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
