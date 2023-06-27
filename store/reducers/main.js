import { FETCH_MAIN_FAIL, FETCH_MAIN_REQUEST, FETCH_MAIN_SUCCESS, UPDATE_MAIN_SUCCESS } from '../constants/main'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: [],
}

const mainReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_MAIN_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_MAIN_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_MAIN_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case UPDATE_MAIN_SUCCESS:
            //update data sau hành động update
            const newState = [payload.main]
            return {
                ...state,
                data: newState[0],
            }
        default:
            return state
    }
}

export default mainReducer
