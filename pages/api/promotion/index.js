import nc from 'next-connect'
import { addNewPromotion, getAllPromotion } from '../../../controller/promotion'

const handler = nc({})

handler.get(getAllPromotion)
handler.post(addNewPromotion)
export default handler
