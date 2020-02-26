import { AxiosWithAuth } from '../components/AxiosWithAuth';
import Axios from 'axios';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const DELETE_LOGIN = 'DELETE_LOGIN';

export const GET_DATA_START = 'GET_DATA_START';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAIL = 'GET_DATA_FAIL';
export const ADD_NEW_FRIEND = 'ADD_NEW_FRIEND';
export const EDIT_FRIEND = 'EDIT_FRIEND';
export const EDIT_ENTRY = 'EDIT_ENTRY';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';


export const login = credentials => dispatch => {
    dispatch({ type: LOGIN_START });
        return AxiosWithAuth() 
            .post('/login', credentials)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.payload);
                dispatch({ type: LOGIN_SUCCESS })
            })
            .catch(err => {
                console.log(err);
            });
};

export const getData = () => dispatch => {
    dispatch({ type: GET_DATA_START });
    AxiosWithAuth()
        .get('/friends')
        .then(response => {
            dispatch({ type: GET_DATA_SUCCESS, payload: response.data });
        })
        .catch(error => {
            dispatch({ type: GET_DATA_FAIL, payload: error.response.error});
        });
};

export const addFriend = newFriend => {
    return {
        type: ADD_NEW_FRIEND,
        payload: newFriend
    };
}; 

export const logOut = (e) => dispatch => {
    e.preventDefault();
    localStorage.removeItem('token');
    dispatch({ type: DELETE_LOGIN, payload: false})
  }

export const editFriend = () => dispatch => {
    dispatch({ type: EDIT_FRIEND})
    AxiosWithAuth()
        .get(`/friends`)
        .then(res => {
            res.data.friends.map(friend => {
            dispatch({ type: EDIT_ENTRY, payload: friend})
            console.log(res);
        })
        })
        .catch(err => console.log(err))
};


export const saveEdit = newEdit => dispatch => {
    dispatch({ type: EDIT_SUCCESS, payload: newEdit })    
    AxiosWithAuth()
    .put(`/friends`, newEdit)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
}
