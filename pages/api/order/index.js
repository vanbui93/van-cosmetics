import nc from 'next-connect'
import { addNewOrder, getAllOrder } from '../../../controller/order'

const handler = nc({})

handler.get(getAllOrder)
handler.post(addNewOrder)
export default handler
