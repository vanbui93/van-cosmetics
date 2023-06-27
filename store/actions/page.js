import {
    ADD_PAGE_FAIL,
    ADD_PAGE_REQUEST,
    ADD_PAGE_SUCCESS,
    DELETE_PAGE_FAIL,
    DELETE_PAGE_REQUEST,
    DELETE_PAGE_SUCCESS,
    FETCH_PAGE_FAIL,
    FETCH_PAGE_REQUEST,
    FETCH_PAGE_SUCCESS,
    UPDATE_PAGE_FAIL,
    UPDATE_PAGE_REQUEST,
    UPDATE_PAGE_SUCCESS,
} from '../constants/pages'

//gọi api firebase

export const getPageDetail = () => async dispatch => {
    try {
        dispatch({ type: FETCH_PAGE_REQUEST })

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/page`
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json()

        if (res !== null) {
            dispatch({
                type: FETCH_PAGE_SUCCESS,
                data: res,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_PAGE_FAIL,
            message: error,
        })
    }
}

//Thêm page
export const addPageObject = page => async dispatch => {
    try {
        dispatch({
            type: ADD_PAGE_REQUEST,
        })
        const addMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: page.name,
                slug: page.slug,
                content: page.content,
                isDisplay: page.isDisplay,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/page`
        const response = await fetch(apiUrlEndpoint, addMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: ADD_PAGE_SUCCESS,
                page,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_PAGE_FAIL,
            message: error,
        })
    }
}

//Xóa page
export const deletePageDetail = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_PAGE_REQUEST,
        })

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/page/${id}`
        const response = await fetch(apiUrlEndpoint, deleteMethod)
        const res = await response.json()
        if (res !== null) {
            dispatch({
                type: DELETE_PAGE_SUCCESS,
                id,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_PAGE_FAIL,
            message: error,
        })
    }
}

//Update page
export const updatePageDetail = page => async dispatch => {
    try {
        dispatch({
            type: UPDATE_PAGE_REQUEST,
        })

        const updateMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: page.name,
                slug: page.slug,
                content: page.content,
                isDisplay: page.isDisplay,
            }),
        }

        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/page/${page.id}`
        const response = await fetch(apiUrlEndpoint, updateMethod)
        const res = await response.json()

        var tzoffset = new Date().getTimezoneOffset() * 60000
        var localISOTime = new Date(Date.now() - tzoffset).toISOString()
        const dataUpdate = {
            ...page,
            update_date: localISOTime,
        }
        if (res !== null) {
            dispatch({
                type: UPDATE_PAGE_SUCCESS,
                page: dataUpdate,
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_PAGE_FAIL,
            message: error,
        })
    }
}
