import { ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
} from '../constants/products'

//load sản phẩm
export const getProduct = () => async dispatch => {
    try {
        dispatch({ type: FETCH_PRODUCTS_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/product`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_PRODUCTS_FAIL,
            message: error,
        })
    }
}

//Xóa sản phẩm
export const deleteProduct = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_PRODUCT_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            message: error,
        })
    }
}

//Update sản phẩm
export const updateProduct = (product, imgSrc) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST,
        })

        const dataUpdate = {
            id: product.id,
            name: product.name,
            images: JSON.stringify(imgSrc),
            collection: product.collection,
            price: product.price,
            compare_price: product.compare_price,
            newBox: product.newBox,
            colors: JSON.stringify(product.colors),
            warantys: JSON.stringify(product.warantys),
            skus: JSON.stringify(product.skus),
            videos: JSON.stringify(product.videos),
            isDisplay: Number(product.isDisplay),
        }

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(dataUpdate),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/product/${product.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                product: dataUpdate,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            message: error,
        })
    }
}
//Thêm sản phẩm
export const addProductObject = product => async dispatch => {
    try {
        dispatch({
            type: ADD_PRODUCT_REQUEST,
        })
        const dataAdd = {
            name: product.name,
            images: JSON.stringify(product.images),
            collection: product.collection,
            price: product.price ? Number(product.price.toString().replaceAll(',', '')) : '',
            compare_price: product.compare_price ? Number(product.compare_price.toString().replaceAll(',', '')) : '',
            newBox: Number(product.newBox),
            colors: JSON.stringify(product.colors),
            warantys: JSON.stringify(product.warantys),
            skus: JSON.stringify(product.skus),
            videos: JSON.stringify(product.videos),
            isDisplay: Number(product.isDisplay),
        }
        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(dataAdd),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/product`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_PRODUCT_SUCCESS,
                product: dataAdd,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_PRODUCT_FAIL,
            message: error,
        })
    }
}
