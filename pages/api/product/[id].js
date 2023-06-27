import nc from 'next-connect'
import { deleteProductById, getProductById, upDateProductById } from '../../../controller/product'

const handler = nc({})

handler.get(getProductById)
handler.delete(deleteProductById)
handler.put(upDateProductById)
export default handler
