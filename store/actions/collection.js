import {
    ADD_COLLECTIONS_FAIL,
    ADD_COLLECTIONS_REQUEST,
    ADD_COLLECTIONS_SUCCESS,
    DELETE_COLLECTIONS_FAIL,
    DELETE_COLLECTIONS_REQUEST,
    DELETE_COLLECTIONS_SUCCESS,
    FETCH_COLLECTIONS_FAIL,
    FETCH_COLLECTIONS_REQUEST,
    FETCH_COLLECTIONS_SUCCESS,
    UPDATE_COLLECTIONS_FAIL,
    UPDATE_COLLECTIONS_REQUEST,
    UPDATE_COLLECTIONS_SUCCESS,
} from '../constants/collections'

//gọi api firebase
export const getCollection = () => async dispatch => {
    try {
        dispatch({ type: FETCH_COLLECTIONS_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/collection`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_COLLECTIONS_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        dispatch({
            type: FETCH_COLLECTIONS_FAIL,
            message: error,
        })
    }
}

//Thêm collection
export const addCollectionObject = collect => async dispatch => {
    try {
        dispatch({
            type: ADD_COLLECTIONS_REQUEST,
        })
        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: collect.name,
                collection: collect.collection,
            }),
        }
        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/collection`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_COLLECTIONS_SUCCESS,
                collect,
            })
        }
    } catch (error) {
        dispatch({
            type: ADD_COLLECTIONS_FAIL,
            message: error,
        })
    }
}

//Xóa collection
export const deleteCollection = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_COLLECTIONS_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/collection/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_COLLECTIONS_SUCCESS,
                id,
            })
        }
    } catch (error) {
        dispatch({
            type: DELETE_COLLECTIONS_FAIL,
            message: error,
        })
    }
}

//Update collection
export const updateCollection = collect => async dispatch => {
    try {
        dispatch({
            type: UPDATE_COLLECTIONS_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: collect.name,
                collection: collect.collection,
            }),
        }
        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/collection/${collect.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: UPDATE_COLLECTIONS_SUCCESS,
                collect,
            })
        }
    } catch (error) {
        dispatch({
            type: UPDATE_COLLECTIONS_FAIL,
            message: error,
        })
    }
}
