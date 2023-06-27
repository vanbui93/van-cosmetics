import nc from 'next-connect'
import { addNewWaranty, getAllWaranty } from '../../../controller/waranty'

const handler = nc({})

handler.get(getAllWaranty)
handler.post(addNewWaranty)
export default handler
