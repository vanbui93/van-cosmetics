import {
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAIL,
    DELETE_ORDER_OBJECT,
    UPDATE_ORDER_SUCCESS,
    ADD_ORDER_SUCCESS,
    DELETE_ORDER_SUCCESS,
} from './../constants/order'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const orderReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_ORDER_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_ORDER_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_ORDER_SUCCESS:
            //Xóa data sau hành động xóa
            let deletedData = state.data?.filter(e => {
                return payload.id !== e.id
            })
            return {
                ...state,
                requesting: false,
                success: true,
                data: deletedData,
            }
        case UPDATE_ORDER_SUCCESS:
            //update data sau hành động update
            const oldState = state.data?.filter(e => e.id != payload.order.id)
            const newState = [...oldState, payload.order]
            return {
                ...state,
                data: newState,
            }
        case ADD_ORDER_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default orderReducer
