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
import { createCategory, listCategories } from "../../actions/categoryActions";

/* Styles */
import { modalStyles } from "../../utils/styles";
import { Link } from 'react-router-dom';

Modal.setAppElement("#root");

const CategoryScreen = () => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let subtitle;

    const dispatch = useDispatch();


    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const categoryList = useSelector((state) => state.categoryList);
    const { loading, categories, page, pages, error } = categoryList;

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = categoryCreate;

    useEffect(() => {
        dispatch(listCategories(keyword, pageNumber));
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
                createCategory({
                    name
                })
            );
        }
    };

    const renderTable = () => {
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
                    {categories.map((categorie, index) => (
                        <tr key={index}>
                            <td><a href="#">{++index}</a></td>
                            <td>{categorie.name}</td>
                            <td><span class="text-muted">{categorie.createdAt.slice(0, 10)}<i class="fa fa-clock-o"></i></span> </td>
                            <td>
                                <div class="btn-group">
                                    <a class="hover-primary dropdown-toggle no-caret" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
                                    <div class="dropdown-menu">
                                        <Link to={`/categorie/${categorie.id}/edit`} class="dropdown-item" href="#">Modifier</Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        )
    };

    const renderModalCreateCategory = () => (
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
                <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter une categorie</h3>
                <LoaderHandler loading={createLoading} error={createError} />
                <form onSubmit={handleSubmit}>
                    <Input
                        name={"name"}
                        type={"text"}
                        placeholder={"Insérer la categorie"}
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
            <HeaderContent name={"Liste des Categories"} />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-12">
                            <div class="box">
                                <div class="col-12">
                                    <div class="box">
                                        <div class="box-header with-border">
                                            {/* <button class="btn btn-primary" onClick={() => setModalIsOpen(true) } >Ajouter</button> */}
                                            {renderModalCreateCategory()}

                                            <div class="box-controls pull-right mt-100">
                                                <div class="lookup lookup-circle lookup-right">
                                                    <Search
                                                        keyword={keyword}
                                                        setKeyword={setKeyword}
                                                        setPage={setPageNumber}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-body no-padding">
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
                    </div>
                </div>
            </section>


        </NavBar>
    )
};

export default CategoryScreen
