import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**Components */
import NavBar from "../../components/layout/Navbar";
import HeaderContent from "../../components/HeaderContent";
import Input from "../../components/form/Input";
import Checkbox from "../../components/form/Checkbox";
import ButtonGoBack from "../../components/ButtonGoBack";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Select from "../../components/Select";
import Message from "../../components/Message";


/** Constants */
import {
    USER_UPDATE_RESET,
    USER_DETAILS_RESET,
    USER_DELETE_RESET,
} from "../../constants/userConstants";

/** Actions */
import { listUserDetails, updateUser } from '../../actions/userActions';
import { listRoles } from "../../actions/roleActions";


const UserEditScreen = ({ history, match }) => {
    const userId = parseInt(match.params.id);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [avatar, setAvatar] = useState(false);

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const roleList = useSelector((state) => state.roleList);
    const { roles } = roleList;

    //user details state
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    //user update state
    const userUpdate = useSelector((state) => state.userUpdate);
    // console.log(userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    useEffect(() => {
        if (user) {
            if (user.isAdmin) {
                dispatch({ type: USER_UPDATE_RESET });
                dispatch({ type: USER_DETAILS_RESET });
                dispatch({ type: USER_DELETE_RESET });
                history.push("/not-authorized");
            }
        }
        //after update redirect to users
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch({ type: USER_DETAILS_RESET });
            dispatch({ type: USER_DELETE_RESET });
            history.push("/users");
        }
        //load product data
        if (!user || !user.name || user.id !== userId) {
            dispatch(listUserDetails(userId));
        } else {
            //set states s
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            setRole(null);
        }
    }, [dispatch, history, userId, user, successUpdate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};
        if (!name) {
            errorsCheck.name = "Nom obligatoire.";
        }
        if (password > 1 && password < 6) {
            errorsCheck.password =
                "Le mot de passe doit comporter au moins 6 caractères.";
        }

        if (!email) {
            errorsCheck.email = "Email obligatoire.";
        }

        // if (!role) {
        //     errorsCheck.role = "Role obligatoire"
        // }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0 && !user.isAdmin) {
            dispatch(
                updateUser({
                    id: userId,
                    name,
                    email,
                    password,
                    avatar,
                    isAdmin,
                    roleId: role,
                })
            );
        }
    };

    const searchRoles = (e) => {
        dispatch(listRoles(e.target.value));
    };

    const renderRolesSelect = () => (
        <Select
            data={role}
            setData={setRole}
            items={roles}
            search={searchRoles}
        />
    );

    const renderForm = () => (
        <form onSubmit={handleSubmit}>
            <Input
                name={"nom"}
                type={"text"}
                placeholder={"Saissisez un nom"}
                data={name}
                setData={setName}
                errors={errors}
            />
            <Input
                name={"email"}
                type={"email"}
                placeholder={"Saissisez une addresse mail"}
                data={email}
                setData={setEmail}
                errors={errors}
            />
            <Input
                name={"mot de passe"}
                type={"password"}
                placeholder={"Saissisez un mot de passe"}
                data={password}
                setData={setPassword}
                errors={errors}
            />
            {renderRolesSelect()}
            {errors.role && (
                <Message message={errors.role} color={"warning"} />
            )}
            <hr />
            <Checkbox name={"Admin"} data={isAdmin} setData={setIsAdmin} />
            <hr />
            <button type="submit" className="btn btn-success">
                Valider
            </button>
        </form>
    );

    return (
        <NavBar>
            {/* Content Header (Page header) */}
            <HeaderContent name={"Modifier un utilisateurs"} />

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <ButtonGoBack history={history} />
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Modifier un utilisateur</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <LoaderHandler
                                        loading={loadingUpdate}
                                        error={errorUpdate}
                                    />
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        render={renderForm}
                                    />
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>

        </NavBar>
    )
}
export default UserEditScreen