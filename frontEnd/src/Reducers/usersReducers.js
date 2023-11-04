import {
    CUSTOMER_CREATE,
    CUSTOMER_CREATE_SUCCESS,
    CUSTOMER_CREATE_FAILURE,
    CUSTOMER_LIST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_FAILURE,
    USER_LOGIN, USER_LOGOUT, 
    USER_LOGIN_FAILURE,USER_LOGIN_SUCCESS
} from '../Actions/types'

const INIT_STATE = {
    customer: "",
    customerLists : [],
    user: ''
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case CUSTOMER_CREATE:
            return { ...state }

        case CUSTOMER_CREATE_SUCCESS:
            return { ...state, customer: action.payload }

        case CUSTOMER_CREATE_FAILURE:
            return { ...state }

        case USER_LOGIN:
            return { ...state }

        case USER_LOGIN_SUCCESS:
            return { ...state, user: action.payload }

        case USER_LOGIN_FAILURE:
            return { ...state }

        case USER_LOGOUT:
            return { ...state, user: '' }

        case CUSTOMER_LIST:
            return { ...state }

        case CUSTOMER_LIST_SUCCESS:
            return { ...state, customerLists: action.payload }

        case CUSTOMER_LIST_FAILURE:
            return { ...state }

        default: return { ...state };
    }
}