import nc from 'next-connect'
import { deleteOrderById, getOrderById, upDateOrderById } from '../../../controller/order'

const handler = nc({})

handler.get(getOrderById)
handler.delete(deleteOrderById)
handler.put(upDateOrderById)
export default handler
