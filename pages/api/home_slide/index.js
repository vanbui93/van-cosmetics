import nc from 'next-connect'
import { addNewSlide, getAllSlide } from '../../../controller/home_slide'

const handler = nc({})

handler.get(getAllSlide)
handler.post(addNewSlide)
export default handler
