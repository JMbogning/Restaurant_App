import {
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_LIST_RESET,
    ROLE_CREATE_REQUEST,
    ROLE_CREATE_SUCCESS,
    ROLE_CREATE_FAIL,
    ROLE_DELETE_REQUEST,
    ROLE_DELETE_SUCCESS,
    ROLE_DELETE_FAIL,
    ROLE_DELETE_RESET,
} from "../constants/roleConstants";

export const roleListReducer = (
    state = { loading: true, roles: [] },
    action
) => {
    switch (action.type) {
        case ROLE_LIST_REQUEST:
            return { loading: true, roles: [] };
        case ROLE_LIST_SUCCESS: 
            return {
                loading: false,
                roles: action.payload.roles,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case ROLE_LIST_FAIL: 
            return { loading: false, error: action.payload };
        case ROLE_LIST_RESET: 
            return { roles: [] };
        default: 
            return state;
    }
};

export const roleCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case ROLE_CREATE_REQUEST:
            return { loading: true };
        case ROLE_CREATE_SUCCESS:
            return { loading: false, success: true };
        case ROLE_CREATE_FAIL:
            return { loading: false, error: action.error };
        default: 
            return state;
    }
};

export const roleDeleteReducer = (state={}, action) => {
    switch (action.type) {
        case ROLE_DELETE_REQUEST:
            return { loading: true };
        case ROLE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case ROLE_DELETE_RESET:
            return {};
        default:
            return state;
    }
};