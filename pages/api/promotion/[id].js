import nc from 'next-connect'
import { deletePromotionById, getPromotionById, upDatePromotionById } from '../../../controller/promotion'

const handler = nc({})

handler.get(getPromotionById)
handler.delete(deletePromotionById)
handler.put(upDatePromotionById)
export default handler
