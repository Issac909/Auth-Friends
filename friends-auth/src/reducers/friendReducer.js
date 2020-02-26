import { LOGIN_START, LOGIN_SUCCESS, DELETE_LOGIN, GET_DATA_START, GET_DATA_SUCCESS, GET_DATA_FAIL, ADD_NEW_FRIEND, EDIT_FRIEND, EDIT_ENTRY, EDIT_SUCCESS } from '../actions/actions';

const initialState = {
    friends: [],
    loggedIn: false,
    fetchingData: false,
    isEditing: false,
    error: ''
};

export const friendReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case LOGIN_START:
        return {
            ...state,
            loggedIn: false,
            fetchingData: true,
            error: ''
        };
        case LOGIN_SUCCESS:
        return {
            ...state,
            loggedIn: true,
            fetchingData: false,
            error: ''
        };
        case DELETE_LOGIN:
            return {
                ...state,
                loggedIn: payload,
                error: ''
            }
        case GET_DATA_START:
        return {
            ...state,
            fetchingData: true,
            error: ''
        };
        case GET_DATA_SUCCESS:
        return {
            ...state,
            fetchingData: false,
            friends: payload
        };
        case GET_DATA_FAIL:
        return {
            ...state,
            fetchingData: false,
            error: payload
        };
        case ADD_NEW_FRIEND:
        return {
            ...state,
            friends: [...state.friends, payload]
        };
        case EDIT_FRIEND:

            return {
                ...state,
                isEditing: true,

            };
        case EDIT_ENTRY:
                const edit = state.friends.filter(friend => {
                if(payload.id !== friend.id) 
                    return friend             
                })
                return {
                    ...state,                
                    friends: [...edit, payload]
                }

        case EDIT_SUCCESS:
            return {
                ...state,
                isEditing: false,
                friends: [...state.friends, payload]
            };
        default:
            return state;
    }
}; 