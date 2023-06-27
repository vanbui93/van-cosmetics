import nc from 'next-connect'
import { addNewCollection, getAllCollection } from '../../../controller/collection'

const handler = nc({})

handler.get(getAllCollection)
handler.post(addNewCollection)
export default handler
