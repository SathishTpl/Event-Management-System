import {
    CUSTOMER_CREATE,
    CUSTOMER_CREATE_SUCCESS,
    CUSTOMER_CREATE_FAILURE,
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    CUSTOMER_LIST, CUSTOMER_LIST_SUCCESS, CUSTOMER_LIST_FAILURE,
    CUSTOMER_UPDATE, CUSTOMER_UPDATE_SUCCESS, CUSTOMER_UPDATE_FAILURE, USER_LOGOUT
}
from './types'
import API from '../Configs/app-config';
import { NotificationManager } from 'react-notifications';

export const customerCreate = (user, navigate)=>(dispatch)=>{
    
    dispatch({ type: CUSTOMER_CREATE})
    API.post(`/customer/add_customer`, user)
    .then((res)=>{
        console.log(res.data.message)
        NotificationManager.success(res.data.message);
        dispatch({ type: CUSTOMER_CREATE_SUCCESS, payload: res.data})
        navigate('/login')
    })
    .catch(err=>{
        dispatch({ type: CUSTOMER_CREATE_FAILURE})
        NotificationManager.error(err.message);
    })

}

export const userLogin = (user,navigate)=>(dispatch)=>{
    
    dispatch({ type: USER_LOGIN})
    API.post(`/customer/login`, user)
    .then((res)=>{
        // console.log(res.data.status)
        if(res.data.status == 200){
            dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.data })
            navigate('/customer-event-management')
            NotificationManager.success(res.data.message);
        }
        else{
            NotificationManager.error(res.data.message);
        }
    })
    .catch(err=>{
        dispatch({ type: USER_LOGIN_FAILURE})
        NotificationManager.error(err.message);
    })

}

export const userLogout = ()=>(dispatch)=>{
    dispatch({ type: USER_LOGOUT})
}

export const getCustomers = ()=>(dispatch)=>{
    
    dispatch({ type: CUSTOMER_LIST})
    API.get(`/customer/customer_list`)
    .then((res)=>{
        console.log(res.data.status)
        dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: res.data. data })
    })
    .catch(err=>{
        dispatch({ type: CUSTOMER_LIST_FAILURE})
        NotificationManager.error(err.message);
    })

}

export const customer_Edit = (data)=>(dispatch)=>{
    
    dispatch({ type: CUSTOMER_UPDATE})
    API.put(`/customer/edit_customer/${data._id}`,data)
    .then((res)=>{
        console.log(res.data.message)
        NotificationManager.success(res.data.message);
        dispatch({ type: CUSTOMER_UPDATE_SUCCESS, payload: res.data.data})
    })
    .catch(err=>{
        dispatch({ type: CUSTOMER_UPDATE_FAILURE})
        NotificationManager.error(err.message);
    })

}

