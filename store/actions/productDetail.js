import { onValue, ref } from 'firebase/database'
import { db } from './../../utils/firebase'

import { FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from '../constants/productDetail'

//gọi api firebase

export const getProductDetail = id => async dispatch => {
    try {
        dispatch({ type: FETCH_PRODUCT_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_PRODUCT_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_PRODUCT_FAIL,
            message: error,
        })
    }
}
