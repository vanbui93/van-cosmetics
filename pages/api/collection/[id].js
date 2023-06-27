import nc from 'next-connect'
import {
    deleteCollectionById,
    getCollectionById,
    upDateCollectionById,
} from '../../../controller/collection'

const handler = nc({})

handler.get(getCollectionById)
handler.delete(deleteCollectionById)
handler.put(upDateCollectionById)
export default handler
