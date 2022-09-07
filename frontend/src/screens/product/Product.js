import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';


/* Components */
import HeaderContent from '../../components/HeaderContent';
import NavBar from '../../components/layout/Navbar';
import Input from '../../components/form/Input';
import Modal from "react-modal";
import ModalButton from '../../components/ModalButton';
import DataTableLoader from '../../components/loader/DataTableLoader';
import LoaderHandler from '../../components/loader/LoaderHandler';
import Search from '../../components/Search';
import Message from "../../components/Message";
import Select from "../../components/Select";


/** Actions */
import { listProducts, createProduct } from "../../actions/productActions";
import { listCategories } from "../../actions/categoryActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

Modal.setAppElement("#root");

const ProductScreen = () => {
    const [nom, setNom] = useState("");
    const [prix, setPrix] = useState(0);
    const [stock, setStock] = useState(0);
    const [categorie, setCategorie] = useState(null);

    const [errors, setErrors] = useState({});

    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let subtitle;

    const dispatch = useDispatch();


    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = productCreate;

    useEffect(() => {
        if (createSuccess) {
            setNom("");
            setPrix(0);
            setStock(0);
            setCategorie(null);

            setModalIsOpen(false);
        }
        dispatch(listProducts(keyword, pageNumber));

    }, [dispatch, userInfo, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};

        if (!nom) {
            errorsCheck.nom = "Nom obligatoire";
        }
        if (!prix) {
            errorsCheck.prix = "Prix obligatoire";
        }

        if (!stock) {
            errorsCheck.stock = "Stock obligatoire";
        }
        if (!categorie) {
            errorsCheck.categorie = "Catégorie obligatoire";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const product = {
                name: nom,
                price: prix,
                stock: stock,
                categoryId: categorie,
            };

            dispatch(createProduct(product));
        }
    };

    const searchCategories = (e) => {
        dispatch(listCategories(e.target.value));
    };

    const renderCategoriesSelect = () => (
        <Select
            data={categorie}
            setData={setCategorie}
            items={categories}
            search={searchCategories}
        />
    );

    const renderProductsTable = () => {
        return (

            <table class="table table-hover">
                <thead>
                    <tr><th>#</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Stock</th>
                        <th>Catégorie</th>
                        <th>Date création</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td><a href="#">{++index}</a></td>
                            <td>{product?.name}</td>
                            <td>{product?.price}</td>
                            <td>{product?.stock}</td>
                            <td>{product?.category?.name}</td>
                            <td><span class="text-muted">{product.createdAt.slice(0, 10)}<i class="fa fa-clock-o"></i></span> </td>
                            <td>
                                <div class="btn-group">
                                    <a class="hover-primary dropdown-toggle no-caret" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
                                    <div class="dropdown-menu">
                                        <Link to={`/product/${product.id}/edit`} class="dropdown-item" href="#">Edité</Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        )
    };

    const renderModalCreateProduct = () => (
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
                <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter un produit</h3>
                <LoaderHandler loading={createLoading} error={createError} />
                <form class="mt-10" onSubmit={handleSubmit}>
                    <Input
                        name={"nom"}
                        type={"text"}
                        placeholder={"Insérer le nom"}
                        data={nom}
                        setData={setNom}
                        errors={errors}
                    />
                    <Input
                        name={"prix"}
                        type={"number"}
                        placeholder={"Insérer le prix"}
                        data={prix}
                        setData={setPrix}
                        errors={errors}
                    />
                    <Input
                        name={"stock"}
                        type={"number"}
                        placeholder={"Insérer le stock"}
                        data={stock}
                        setData={setStock}
                        errors={errors}
                    />
                    {renderCategoriesSelect()}
                    {errors.category && (
                        <Message message={errors.category} color={"warning"} />
                    )}
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
            <HeaderContent name={"Liste des Produits"} />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div class="box">
                                <div class="box-header with-border">
                                    {renderModalCreateProduct()}

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
                                <div class="box-body no-padding mt-20">
                                    <div class="table-responsive">
                                        <LoaderHandler
                                            loading={loading}
                                            error={error}
                                            loader={<DataTableLoader />}
                                            render={renderProductsTable}
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

export default ProductScreen
