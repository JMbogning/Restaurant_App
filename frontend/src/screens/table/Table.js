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
import { listTables } from '../../actions/tableActions';
import { createTable } from '../../actions/tableActions';

/* Styles */
import { modalStyles } from "../../utils/styles";
import { Link } from 'react-router-dom';

Modal.setAppElement("#root");

const Table = () => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let subtitle;

    const dispatch = useDispatch();


    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const tableList = useSelector((state) => state.tableList);
    const { loading, tables, page, pages, error } = tableList;

    const tableCreate = useSelector((state) => state.tableCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = tableCreate;

    useEffect(() => {
        dispatch(listTables(keyword, pageNumber));
        if (createSuccess) {
            setName("");
            setModalIsOpen(false);
        }
    }, [dispatch, userInfo, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault()

        let errorsCheck = {};
        if (!name) {
            errorsCheck.name = "Libellé obligatoire";
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
                createTable({
                    name
                })
            );
        }
    };

    const renderTable = () => {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">

                            <table className="table table-hover">
                                <thead>
                                    <tr><th>#</th>
                                        <th>Nom</th>
                                        <th>Occupé</th>
                                        <th>Date création</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tables.map((table, index) => (
                                        <tr key={index}>
                                            <td><a href="#">{++index}</a></td>
                                            <td>{table.name}</td>
                                            <td>
                                                {table.occupied ? (
                                                    <h4 className="text-success">
                                                        <i className="bi bi-check2-all"></i>
                                                    </h4>
                                                ) : (
                                                    <h4 className="text-danger">
                                                        <i className="bi bi-x-lg"></i>
                                                    </h4>
                                                )}
                                            </td>
                                            <td><span className="text-muted">{table.createdAt.slice(0, 10)}<i class="bi bi-clock"></i></span> </td>
                                            <td>
                                                <div className="btn-group">
                                                    <a className="hover-primary dropdown-toggle no-caret" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu">
                                                        <Link to={`/table/${table.id}/edit`} class="dropdown-item" href="#">Modifier</Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </section>

        )
    };

    const renderModalCreateTable = () => (
        <div>
            <div className='text-end'>
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
                <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter une table</h3>
                <LoaderHandler loading={createLoading} error={createError} />
                <form onSubmit={handleSubmit}>
                    <Input
                        name={"name"}
                        type={"text"}
                        placeholder={"Insérer le libellé"}
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
            <HeaderContent name={"Liste des Tables"} />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div class="box">
                                <div class="box-header with-border">
                                    {renderModalCreateTable()}

                                    <div class="box-controls pull-right">
                                        <div class="lookup lookup-circle lookup-right mt-100">
                                            <Search
                                                keyword={keyword}
                                                setKeyword={setKeyword}
                                                setPage={setPageNumber}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="box-body no-padding mt-20">
                                    <div class="table-responsive">

                                        <LoaderHandler
                                            loading={loading}
                                            error={error}
                                            loader={<DataTableLoader />}
                                            render={renderTable}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </NavBar>
    )
};

export default Table
