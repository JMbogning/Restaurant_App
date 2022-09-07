import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";



/**Screens */
import Table from '../screens/table/Table';
import NotFound from '../screens/NotFound';
import CategoryScreen from '../screens/category/Category';
import ProductScreen from '../screens/product/Product';
import OrderScreen from '../screens/order/Order';
import ClientScreen from '../screens/client/Client';
import OrderCreateScreen from '../screens/order/OrderCreate';
import DeliveryScreen from '../screens/order/Delivery';
import DashboardScreen from '../screens/DashboardScreen';
import OrderView from '../screens/order/OrderView';
import ActiveOrderScreen from '../screens/order/ActiveOrder';
import ProfileScreen from '../screens/user/Profile';
import UserScreen from '../screens/user/User';
import RoleScreen from '../screens/role/Role';
import UserEditScreen from '../screens/user/UserEdit';



const Navigation = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    return (
        <Switch>
            <PrivateRoute
                path='/profile'
                exact
                component={ProfileScreen}
            />
            <PrivateRoute
                path='/tables'
                exact
                component={Table}
            />
            <PrivateRoute
                path='/categories'
                exact
                component={CategoryScreen}
            />
            <PrivateRoute
                path='/products'
                exact
                component={ProductScreen}
            />
            <PrivateRoute
                path='/orders'
                exact
                component={OrderScreen}
            />
            <PrivateRoute
                path='/orders'
                exact
                component={OrderScreen}
            />
            <PrivateRoute
                path='/activeOrders'
                exact
                component={ActiveOrderScreen}
            />
            <PrivateRoute
                path='/orderCreate'
                exact
                component={OrderCreateScreen}
            />
            <PrivateRoute
                path="/orderCreate/:id/table"
                component={OrderCreateScreen}
            />
            <PrivateRoute
                path='/order/:id/view'
                exact
                component={OrderView}
            />
            <PrivateRoute
                path='/deliveries'
                exact
                component={DeliveryScreen}
            />

            <PrivateRoute
                path='/clients'
                exact
                component={ClientScreen}
            />
            <PrivateRoute
                path='/users'
                exact
                component={UserScreen}
            />
            <PrivateRoute
                path='/user/:id/edit'
                exact
                component={UserEditScreen}
            />
            <PrivateRoute
                path='/roles'
                exact
                component={RoleScreen}
            />
            <PrivateRoute
                path='/'
                exact
                component={DashboardScreen}
            />
            <Route component={NotFound} />

        </Switch>
    )
}
export default Navigation

