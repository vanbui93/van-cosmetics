import {
    ADD_CMT_FAIL,
    ADD_CMT_REQUEST,
    ADD_CMT_SUCCESS,
    DELETE_CMT_FAIL,
    DELETE_CMT_REQUEST,
    DELETE_CMT_SUCCESS,
    FETCH_CMT_FAIL,
    FETCH_CMT_REQUEST,
    FETCH_CMT_SUCCESS,
    UPDATE_CMT_FAIL,
    UPDATE_CMT_REQUEST,
    UPDATE_CMT_SUCCESS,
} from '../constants/cmt'

//gọi api firebase
export const getComments = () => async dispatch => {
    try {
        dispatch({ type: FETCH_CMT_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/comment`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_CMT_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_CMT_FAIL,
            message: error,
        })
    }
}

//Thêm cmt
export const addCommentObject = comment => async dispatch => {
    try {
        dispatch({
            type: ADD_CMT_REQUEST,
        })

        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: comment.name,
                position: comment.position,
                image: comment.image,
                content: comment.content,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/comment`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_CMT_SUCCESS,
                comment,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_CMT_FAIL,
            message: error,
        })
    }
}

//Xóa cmt
export const deleteComment = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_CMT_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/comment/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_CMT_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_CMT_FAIL,
            message: error,
        })
    }
}

//Update cmt
export const updateComment = comment => async dispatch => {
    try {
        dispatch({
            type: UPDATE_CMT_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: comment.name,
                position: comment.position,
                image: comment.image,
                content: comment.content,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/comment/${comment.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: UPDATE_CMT_SUCCESS,
                comment,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_CMT_FAIL,
            message: error,
        })
    }
}
