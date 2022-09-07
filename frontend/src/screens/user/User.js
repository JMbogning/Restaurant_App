import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/** Components */
import NavBar from '../../components/layout/Navbar';
import HeaderContent from "../../components/HeaderContent";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import Modal from "react-modal";
import Checkbox from "../../components/form/Checkbox";
import DataTableLoader from "../../components/loader/DataTableLoader";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Select from "../../components/Select";
import Message from "../../components/Message";


/** Actions */
import { listUsers, register } from "../../actions/userActions";
import { listRoles } from "../../actions/roleActions";

/** Styles */
import { modalStyles } from "../../utils/styles";

const UserScreen = ({ history }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    let subtitle;

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users, page, pages } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const roleList = useSelector((state) => state.roleList);
    const { roles } = roleList;

    const userRegister = useSelector((state) => state.userRegister);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = userRegister;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers(keyword, pageNumber));
        }
        if (createSuccess) {
            setName("");
            setPassword("");
            setEmail("");
            setIsAdmin(false);
            setRole(null);

            setModalIsOpen(false);
        }
    }, [dispatch, userInfo, pageNumber, keyword, history, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};
        if (!name) {
            errorsCheck.name = "Nom obligatoire";
        }
        if (!password) {
            errorsCheck.password = "Mot de passe obligatoire";
        }

        if (!email) {
            errorsCheck.email = "Email obligatoire";
        }

        if (!role) {
            errorsCheck.role = "Role obligatoire"
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const user = {
                name: name,
                email: email,
                password: password,
                isAdmin: isAdmin,
                roleId: role,
            };

            dispatch(register(user));
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

    const renderTable = () => (
        <table className="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th className="d-none d-sm-table-cell">#</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th className="d-none d-sm-table-cell">Photo</th>
                    <th className="d-none d-sm-table-cell">Admin</th>
                    <th className="d-none d-sm-table-cell">Grade</th>
                    <th className="d-none d-sm-table-cell">Date création</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td className="d-none d-sm-table-cell">{++index}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="d-none d-sm-table-cell">
                            <img
                                src={
                                    user.image
                                        ? user.image
                                        : "/dist/img/user2-160x160.jpg"
                                }
                                style={{
                                    height: "2em",
                                }}
                                className="img-circle elevation-2"
                                alt="User"
                            />
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {user.isAdmin ? (
                                <h4 className="text-success">
                                    <i className="bi bi-check"></i>
                                </h4>
                            ) : (
                                <h4 className="text-danger">
                                    <i className="bi bi-times-circle"></i>
                                </h4>
                            )}
                        </td>
                        <td className="d-none d-sm-table-cell">{user?.role?.name}</td>
                        <td className="d-none d-sm-table-cell">
                            {user.createdAt.slice(0, 10)}
                        </td>
                        <td>
                            {user.isAdmin ? (
                                ""
                            ) : (
                                <div className="btn-group">
                                    <a className="hover-primary dropdown-toggle no-caret" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
                                    <div className="dropdown-menu">
                                        <Link to={`/user/${user.id}/edit`} className="dropdown-item" href="#">Modifier</Link>
                                    </div>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderModalCreateUser = () => (
        <>
            <div className="text-end">
                <ModalButton
                    modal={modalIsOpen}
                    setModal={setModalIsOpen}
                    classes={"btn-success btn-lg mb-2 rounded-0 bi bi-plus-circle"}
                />

            </div>

            <Modal
                style={modalStyles}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter un utilisateur</h3>
                <LoaderHandler loading={createLoading} error={createError} />
                <form onSubmit={handleSubmit}>
                    <Input
                        name={"nom"}
                        type={"text"}
                        placeholder={"Veuillez saisir votre nom"}
                        data={name}
                        setData={setName}
                        errors={errors}
                    />
                    <Input
                        name={"email"}
                        type={"email"}
                        placeholder={"Veuillez saisir votre prenom"}
                        data={email}
                        setData={setEmail}
                        errors={errors}
                    />
                    <Input
                        name={"mot de passe"}
                        type={"password"}
                        placeholder={"Veuillez saisir votre mot de passe"}
                        data={password}
                        setData={setPassword}
                        errors={errors}
                    />
                    {renderRolesSelect()}
                    {errors.role && (
                        <Message message={errors.role} color={"warning"} />
                    )}
                    <hr />
                    <Checkbox
                        name={"Admin"}
                        data={isAdmin}
                        setData={setIsAdmin}
                    />

                    <hr />
                    <button type="submit" className="btn btn-primary float-end">
                        Valider
                    </button>
                    <ModalButton
                        modal={modalIsOpen}
                        setModal={setModalIsOpen}
                        classes={"btn-danger float-right"}
                    />
                </form>
            </Modal>
        </>
    );

    return (
        <NavBar>
            {/* Content Header (Page header) */}
            <HeaderContent name={"Liste des utilisateurs"} />
            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    {renderModalCreateUser()}
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Liste des utilisateurs</h3>
                                    <div className="card-tools">
                                        <Search
                                            keyword={keyword}
                                            setKeyword={setKeyword}
                                            setPage={setPageNumber}
                                        />
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        loader={<DataTableLoader />}
                                        render={renderTable}
                                    />
                                </div>
                                {/* /.card-body */}
                            </div>
                            <Pagination
                                page={page}
                                pages={pages}
                                setPage={setPageNumber}
                            />
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
export default UserScreen