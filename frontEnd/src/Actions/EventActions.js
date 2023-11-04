import {
    GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE,
    EVENTS_CREATE, EVENTS_CREATE_SUCCESS, EVENTS_CREATE_FAILURE, 
    EVENTS_DELETE, EVENTS_DELETE_SUCCESS, EVENTS_DELETE_FAILURE,
    EVENTS_EDIT, EVENTS_EDIT_SUCCESS, EVENTS_EDIT_FAILURE,
    BOOKING_EVENT, BOOKING_EVENT_SUCCESS, BOOKING_EVENT_FAILURE,
    BOOKING_EVENT_LIST, BOOKING_EVENT_LIST_GET_SUCCESS, BOOKING_EVENT_LIST_GET_FAILURE,
    GET_EVENTS_BY_ID, GET_EVENTS_BY_ID_SUCCESS, GET_EVENTS_BY_ID_FAILURE
}
from './types'
import API from '../Configs/app-config';
import { NotificationManager } from 'react-notifications';

export const getEvents = ()=>(dispatch)=>{
    
    dispatch({ type: GET_EVENTS})
    API.get(`/event/getEvents`)
    .then((res)=>{
        console.log(res.data.data)
        dispatch({ type: GET_EVENTS_SUCCESS, payload: res.data.data})
    })
    .catch(err=>{
        dispatch({ type: GET_EVENTS_FAILURE})
        NotificationManager.error(err.message);
    })

}

export const eventCreate = (user)=>(dispatch)=>{
    
    dispatch({ type: EVENTS_CREATE})
    API.post(`/event/add_event`, user)
    .then((res)=>{
        console.log(res.data.message)
        NotificationManager.success(res.data.message);
        dispatch({ type: EVENTS_CREATE_SUCCESS, payload: res.data.data})
    })
    .catch(err=>{
        dispatch({ type: EVENTS_CREATE_FAILURE})
        NotificationManager.error(err.message);
    })

}

export const eventDelete = (id)=>(dispatch)=>{
    
    dispatch({ type: EVENTS_DELETE})
    API.put(`/event/event_delete/${id}`)
    .then((res)=>{
        console.log(res.data.message)
        NotificationManager.success(res.data.message);
        dispatch({ type: EVENTS_DELETE_SUCCESS, payload: res.data.data})
    })
    .catch(err=>{
        dispatch({ type: EVENTS_DELETE_FAILURE})
        NotificationManager.error(err.message);
    })

}

export const eventEdit = (data)=>(dispatch)=>{    
    dispatch({ type: EVENTS_EDIT})
    API.put(`/event/edit_event/${data._id}`,data)
    .then((res)=>{
        console.log(res.data.message)
        NotificationManager.success(res.data.message);
        dispatch({ type: EVENTS_EDIT_SUCCESS, payload: res.data.data})
    })
    .catch(err=>{
        dispatch({ type: EVENTS_EDIT_FAILURE})
        NotificationManager.error(err.message);
    })
}

export const bookEvent = (book)=>(dispatch)=>{
    
    dispatch({ type: BOOKING_EVENT})
    API.post(`/event/event_Booking`, book)
    .then((res)=>{
        console.log(res.data.message)
        NotificationManager.success(res.data.message);
        dispatch({ type: BOOKING_EVENT_SUCCESS, payload: res.data.data})
    })
    .catch(err=>{
        dispatch({ type: BOOKING_EVENT_FAILURE})
        NotificationManager.error(err.message);
    })

}

export const getBookingEvents = ()=>(dispatch)=>{
    
    dispatch({ type: BOOKING_EVENT_LIST})
    API.get(`/event/getBookingEvents`)
    .then((res)=>{
        console.log(res.data.data)
        dispatch({ type: BOOKING_EVENT_LIST_GET_SUCCESS, payload: res.data.data})
    })
    .catch(err=>{
        dispatch({ type: BOOKING_EVENT_LIST_GET_FAILURE})
        NotificationManager.error(err.message);
    })
}

export const getBookingEventsById = (id)=>(dispatch)=>{
    
    dispatch({ type: GET_EVENTS_BY_ID})
    API.get(`event/getBookingEventsByUser/${id}`)
    .then((res)=>{
        console.log(res.data.data)
        dispatch({ type: GET_EVENTS_BY_ID_SUCCESS, payload: res.data.data})
    })
    .catch(err=>{
        dispatch({ type: GET_EVENTS_BY_ID_FAILURE})
        NotificationManager.error(err.message);
    })
}