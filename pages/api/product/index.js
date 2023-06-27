import nc from 'next-connect'
import { addNewProduct, getAllProduct } from '../../../controller/product'

const handler = nc({})

handler.get(getAllProduct)
handler.post(addNewProduct)
export default handler
