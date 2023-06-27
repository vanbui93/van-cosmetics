import nc from 'next-connect'
import { addNewUser, getAllUser } from '../../../controller/user'

const handler = nc({})

handler.get(getAllUser)
handler.post(addNewUser)
export default handler
