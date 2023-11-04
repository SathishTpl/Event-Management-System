import {
    GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE,
    EVENTS_CREATE, EVENTS_CREATE_SUCCESS, EVENTS_CREATE_FAILURE,
    BOOKING_EVENT_LIST, BOOKING_EVENT_LIST_GET_SUCCESS, BOOKING_EVENT_LIST_GET_FAILURE,
    GET_EVENTS_BY_ID, GET_EVENTS_BY_ID_SUCCESS, GET_EVENTS_BY_ID_FAILURE
} from '../Actions/types'

const INIT_STATE = {
    eventList: [],
    add_events: '',
    add_Booking: '',
    bookingEventList: [],
    eventListById: []
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_EVENTS:
            return { ...state }

        case GET_EVENTS_SUCCESS:
            return { ...state, eventList: action.payload }

        case GET_EVENTS_FAILURE:
            return { ...state }

        case GET_EVENTS_BY_ID:
            return { ...state }

        case GET_EVENTS_BY_ID_SUCCESS:
            return { ...state, eventListById: action.payload }

        case GET_EVENTS_BY_ID_FAILURE:
            return { ...state }

        case EVENTS_CREATE:
            return { ...state }

        case EVENTS_CREATE_SUCCESS:
            return { ...state, add_events: action.payload }

        case EVENTS_CREATE_FAILURE:
            return { ...state }

        case BOOKING_EVENT_LIST:
            return { ...state }

        case BOOKING_EVENT_LIST_GET_SUCCESS:
            return { ...state, bookingEventList: action.payload }

        case BOOKING_EVENT_LIST_GET_FAILURE:
            return { ...state }

        default: return { ...state };
    }
}