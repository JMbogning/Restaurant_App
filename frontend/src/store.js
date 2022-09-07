import { createStore, combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {
    tableAllReducer,
    tableListReducer,
    tableCreateReducer,
    tableDetailsReducer,
    tableUpdateReducer,
} from "./reducers/tableReducers";

import {
    roleListReducer,
    roleCreateReducer,
    roleDeleteReducer,
} from "./reducers/roleReducers";

import {
    userLoginReducer,
    userListReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateReducer,
} from "./reducers/userReducers";

import {
    categoryListReducer,
    categoryCreateReducer,
    categoryDetailsReducer,
    categoryUpdateReducer,
} from "./reducers/categoryReducers";

import {
    productListReducer,
    productCreateReducer,
    productDetailsReducer,
    productUpdateReducer,
}  from "./reducers/productReducers";

import {
    orderListReducer,
    orderCreateReducer,
    orderDetailsReducer,
    orderUpdateReducer,
    statisticsReducer,
} from "./reducers/orderReducers";


import {
    clientListReducer,
    clientCreateReducer,
    clientDetailsReducer,
    clientUpdateReducer,
} from "./reducers/clientReducers";

const reducer = combineReducers({
    tableAll: tableAllReducer,
    tableList: tableListReducer,
    tableCreate: tableCreateReducer,
    tableDetails: tableDetailsReducer,
    tableUpdate: tableUpdateReducer,

    roleList: roleListReducer,
    roleCreate: roleCreateReducer,
    

    userLogin: userLoginReducer,
    userList: userListReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,

    categoryList: categoryListReducer,
    categoryCreate: categoryCreateReducer,
    categoryDetails: categoryDetailsReducer,
    categoryUpdate: categoryUpdateReducer,

    productList: productListReducer,
    productCreate: productCreateReducer,
    productDetails: productDetailsReducer,
    productUpdate: productUpdateReducer,

    clientList: clientListReducer,
    clientCreate: clientCreateReducer,
    clientDetails: clientDetailsReducer,
    clientUpdate: clientUpdateReducer,

    orderStatistics: statisticsReducer,
    orderList: orderListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderUpdate: orderUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store