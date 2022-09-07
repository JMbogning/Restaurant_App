import axios from 'axios';
import React from 'react';

import {
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_CREATE_REQUEST,
    ROLE_CREATE_SUCCESS,
    ROLE_CREATE_FAIL,
    ROLE_DELETE_REQUEST,
    ROLE_DELETE_SUCCESS,
    ROLE_DELETE_FAIL,
} from "../constants/roleConstants";


//get all roles with pagination
export const listRoles =
    (keyword = "", pageNumber = "") =>
        async (dispatch, getState) => {
            try {
                dispatch({
                    type: ROLE_LIST_REQUEST,
                });

                //get user from state
                const {
                    userLogin: { userInfo },
                } = getState();

                //headers
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                //get all roles
                const { data } = await axios.get(
                    `/api/roles?keyword=${keyword}&pageNumber=${pageNumber}`,
                    config
                );

                dispatch({
                    type: ROLE_LIST_SUCCESS,
                    payload: data,
                });
            } catch (error) {
                dispatch({
                    type: ROLE_LIST_FAIL,
                    payload:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
                });
            }
        };


//create a role
export const createRole = (role) => async (dispatch, getState) => {
    const { name } = role;

    try {
        dispatch({
            type: ROLE_CREATE_REQUEST,
        });

        //get role from state
        const {
            userLogin: { userInfo },
        } = getState();

        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //create role
        const { data } = await axios.post("/api/roles", { name }, config);
        // console.log(data);
        dispatch({
            type: ROLE_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROLE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


//delete role
export const deleteRole = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ROLE_DELETE_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();
        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //api call to delete role
        await axios.delete(`/api/roles/${id}`, config);
        dispatch({
            type: ROLE_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: ROLE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};




