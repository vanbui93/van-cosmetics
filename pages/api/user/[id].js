import nc from 'next-connect'
import { deleteUserById, getUserById, upDateUserById } from '../../../controller/user'

const handler = nc({})

handler.get(getUserById)
handler.delete(deleteUserById)
handler.put(upDateUserById)
export default handler
