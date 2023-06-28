import {
    ADD_ORDER_FAIL,
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    FETCH_ORDER_FAIL,
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
} from '../constants/order'

//gọi api firebase
export const getOrder = () => async dispatch => {
    try {
        dispatch({ type: FETCH_ORDER_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/order`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_ORDER_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_ORDER_FAIL,
            message: error,
        })
    }
}

//Thêm đơn hàng
export const addOrderObject = order => async dispatch => {
    try {
        dispatch({
            type: ADD_ORDER_REQUEST,
        })

        const dataAdd = {
            id: order.id,
            customer_name: order.customer_name,
            customer_email: order.customer_email,
            customer_phone: order.customer_phone,
            customer_address: order.customer_address,
            customer_city: order.customer_city,
            customer_notes: order.customer_notes,
            product_name: order.product_name,
            product_image: order.product_image,
            product_price: order.product_price,
            product_newBox: order.product_newBox,
            sku: order.sku,
            color: order.color,
        }

        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(dataAdd),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/order`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_ORDER_SUCCESS,
                order: dataAdd,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_ORDER_FAIL,
            message: error,
        })
    }
}

//Xóa đơn hàng
export const deleteOrder = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_ORDER_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/order/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_ORDER_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_ORDER_FAIL,
            message: error,
        })
    }
}

//Update đơn hàng
export const updateOrder = order => async dispatch => {
    try {
        dispatch({
            type: UPDATE_ORDER_REQUEST,
        })

        const dataUpdate = {
            id: order.id,
            customer_name: order.customer_name,
            customer_email: order.customer_email,
            customer_phone: order.customer_phone,
            customer_address: order.customer_address,
            customer_city: order.customer_city,
            customer_notes: order.customer_notes,
            product_name: order.product_name,
            product_image: order.product_image,
            product_newBox: order.product_newBox,
            product_price: order.product_price,
            sku: order.sku,
            color: order.color,
        }

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(dataUpdate),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/order/${order.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: UPDATE_ORDER_SUCCESS,
                order: dataUpdate,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_ORDER_FAIL,
            message: error,
        })
    }
}
