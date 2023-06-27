import nc from 'next-connect'
import { addNewMenu, getAllMenu } from '../../../controller/menu'

const handler = nc({})

handler.get(getAllMenu)
handler.post(addNewMenu)
export default handler
