import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


/* Components */
import HeaderContent from '../../components/HeaderContent';
import NavBar from '../../components/layout/Navbar';
import Input from '../../components/form/Input';
import Modal from "react-modal";
import ModalButton from '../../components/ModalButton';
import DataTableLoader from '../../components/loader/DataTableLoader';
import LoaderHandler from '../../components/loader/LoaderHandler';
import Search from '../../components/Search';

/** Actions */
import { createRole, listRole, listRoles } from "../../actions/roleActions";

/* Styles */
import { modalStyles } from "../../utils/styles";
import { Link } from 'react-router-dom';

Modal.setAppElement("#root");

const RoleScreen = () => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let subtitle;

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const roleList = useSelector((state) => state.roleList);
    const { loading, roles, page, pages, error } = roleList;

    const roleCreate = useSelector((state) => state.roleCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = roleCreate;

    useEffect(() => {
        dispatch(listRoles(keyword, pageNumber));
        if (createSuccess) {
            setName("");
            setModalIsOpen(false);
        }
    }, [dispatch, userInfo, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault()

        let errorsCheck = {};
        if (!name) {
            errorsCheck.name = "Nom obligatoire";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const table = {
                name: name,
            };
            dispatch(
                createRole({
                    name
                })
            );
        }
    };


    const renderTableRole = () => {
        return (

            <table class="table table-hover">
                <thead>
                    <tr><th>#</th>
                        <th>Nom</th>
                        <th>Date création</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {roles.map((role, index) => (
                        <tr key={index}>
                            <td><a href="#">{++index}</a></td>
                            <td>{role.name}</td>
                            <td><span class="text-muted">{role.createdAt.slice(0, 10)}<i class="fa fa-clock-o"></i></span> </td>
                            <td>
                                <div class="btn-group">
                                    <a class="hover-primary dropdown-toggle no-caret" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
                                    <div class="dropdown-menu">
                                        <Link to={`/role/${role.id}/edit`} className="dropdown-item" href="#">Modifier</Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        )
    };


    const renderModalCreateRole = () => (
        <div>
            <div className='text-end'>
                <ModalButton
                    modal={modalIsOpen}
                    setModal={setModalIsOpen}
                    classes={"btn-success btn-lg mb-2 bi bi-plus-circle rounded-0"}
                />

            </div>

            <Modal
                style={modalStyles}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter un Role</h3>
                <LoaderHandler loading={createLoading} error={createError} />
                <form onSubmit={handleSubmit}>
                    <Input
                        name={"name"}
                        type={"text"}
                        placeholder={"Insérer le role"}
                        data={name}
                        setData={setName}
                        errors={errors}
                    />
                    <hr />
                    <button type="submit" class="btn btn-primary float-end">Sauvegarder</button>


                    <ModalButton
                        modal={modalIsOpen}
                        setModal={setModalIsOpen}
                        classes={"btn-danger float-right"}
                    />
                </form>
            </Modal>
        </div>
    );


    return (
        <NavBar>
            <HeaderContent name={"Liste des Roles"} />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="box">
                                <div className="col-12">
                                    <div className="box">
                                        <div className="box-header with-border">
                                            {renderModalCreateRole()}

                                            <div className="box-controls pull-right mt-100">
                                                <div className="lookup lookup-circle lookup-right">
                                                    <Search
                                                        keyword={keyword}
                                                        setKeyword={setKeyword}
                                                        setPage={setPageNumber}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-body no-padding mt-20">
                                            <div className="table-responsive">
                                                <LoaderHandler
                                                    loading={loading}
                                                    error={error}
                                                    loader={<DataTableLoader />}
                                                    render={renderTableRole}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </NavBar>
    )
}
export default RoleScreen