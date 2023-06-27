import {
    ADD_SKUS_FAIL,
    ADD_SKUS_REQUEST,
    ADD_SKUS_SUCCESS,
    DELETE_SKUS_FAIL,
    DELETE_SKUS_REQUEST,
    DELETE_SKUS_SUCCESS,
    FETCH_SKUS_FAIL,
    FETCH_SKUS_REQUEST,
    FETCH_SKUS_SUCCESS,
    UPDATE_SKUS_FAIL,
    UPDATE_SKUS_REQUEST,
    UPDATE_SKUS_SUCCESS,
} from '../constants/skus'

//load sản phẩm
export const getSkus = () => async dispatch => {
    try {
        dispatch({ type: FETCH_SKUS_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/sku`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_SKUS_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_SKUS_FAIL,
            message: error,
        })
    }
}

//Thêm sku
export const addSkuObject = sku => async dispatch => {
    try {
        dispatch({
            type: ADD_SKUS_REQUEST,
        })

        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                data_sku: sku.data_sku,
                memory: sku.memory,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/sku`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_SKUS_SUCCESS,
                sku,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_SKUS_FAIL,
            message: error,
        })
    }
}

//Xóa sku
export const deleteSku = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_SKUS_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/sku/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_SKUS_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_SKUS_FAIL,
            message: error,
        })
    }
}

//Update sku
export const updateSku = sku => async dispatch => {
    try {
        dispatch({
            type: UPDATE_SKUS_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                sku_text: sku.sku_text,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/sku/${sku.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: UPDATE_SKUS_SUCCESS,
                sku,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_SKUS_FAIL,
            message: error,
        })
    }
}
