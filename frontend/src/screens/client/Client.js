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


/** Actions */
import { createClient, listClients } from "../../actions/clientActions";


/* Styles */
import { modalStyles } from "../../utils/styles";

Modal.setAppElement("#root");

const ClientScreen = () => {
    const [nom, setNom] = useState("");
    const [addresse, setAddresse] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [dni, setDni] = useState("");


    const [errors, setErrors] = useState({});

    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let subtitle;

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const clientList = useSelector((state) => state.clientList);
    const { loading, error, clients, page, pages } = clientList;

    const clientCreate = useSelector((state) => state.clientCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = clientCreate;



    useEffect(() => {
        dispatch(listClients(keyword, pageNumber));
        if (createSuccess) {
            setNom("");
            setAddresse("");
            setPhone("");
            setEmail("");
            setDni("");
            setModalIsOpen(false);
        }
    }, [dispatch, userInfo, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};

        if (!nom) {
            errorsCheck.name = "Nom obligatoire";
        }
        if (!addresse) {
            errorsCheck.address = "Addresse obligatoire";
        }

        if (!phone) {
            errorsCheck.phone = "Téléphone obligatoire";
        }
        if (!email) {
            errorsCheck.email = "Email obligatoire";
        }

        if (!dni) {
            errorsCheck.dni = "DNI obligatoire";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const client = {
                name: nom,
                address: addresse,
                phone: phone,
                email: email,
                dni: dni,
            };

            dispatch(createClient(client));
        }
    };


    const renderClientsTable = () => {
        return (

            <table class="table table-hover">
                <thead>
                    <tr><th>#</th>
                        <th>Nom</th>
                        <th>Addresse</th>
                        <th>Telephone</th>
                        <th>Email</th>
                        <th>Dni</th>
                        <th>Date création</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {clients.map((client, index) => (
                        <tr key={index}>
                            <td><a href="#">{++index}</a></td>
                            <td>{client.name}</td>
                            <td>{client.address}</td>
                            <td>{client.phone}</td>
                            <td>{client.email}</td>
                            <td>{client.dni}</td>

                            <td><span class="text-muted">{client.createdAt.slice(0, 10)}<i class="fa fa-clock-o"></i></span> </td>
                            <td>
                                <div className="btn-group">
                                    <a className="hover-primary dropdown-toggle no-caret" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
                                    <div className="dropdown-menu">
                                        <Link to={`/client/${client.id}/edit`} class="dropdown-item" href="#">Modifier</Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        )
    };

    const renderModalCreateClient = () => (
        <div>
            <div className='text-end'>
                <ModalButton
                    modal={modalIsOpen}
                    setModal={setModalIsOpen}
                    classes={"btn-success btn-lg rounded-0 bi bi-plus-circle"}
                />

            </div>

            <Modal
                style={modalStyles}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter un client</h3>
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
                        name={"addresse"}
                        type={"text"}
                        placeholder={"Insérer l'adresse"}
                        data={addresse}
                        setData={setAddresse}
                        errors={errors}
                    />
                    <Input
                        name={"phone"}
                        type={"text"}
                        placeholder={"Insérer le numero de telephone"}
                        data={phone}
                        setData={setPhone}
                        errors={errors}
                    />
                    <Input
                        name={"email"}
                        type={"email"}
                        placeholder={"Insérer l'email"}
                        data={email}
                        setData={setEmail}
                        errors={errors}
                    />
                    <Input
                        name={"dni"}
                        type={"text"}
                        placeholder={"Insérer la dni"}
                        data={dni}
                        setData={setDni}
                        errors={errors}
                    />

                    <button type="submit" class=" rounded-0 btn btn-primary float-end">Sauvegarder</button>


                    <ModalButton
                        modal={modalIsOpen}
                        setModal={setModalIsOpen}
                        classes={"rounded-0 btn-danger "}
                    />
                </form>
            </Modal>
        </div>
    );
    return (

        <NavBar>
            <HeaderContent name={"Liste des Clients"} />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div class="box">
                                <div class="box-header with-border">
                                    {renderModalCreateClient()}

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
                                <div class="box-body no-padding mt-50">
                                    <div class="table-responsive">
                                        <LoaderHandler
                                            loading={loading}
                                            error={error}
                                            loader={<DataTableLoader />}
                                            render={renderClientsTable}
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

export default ClientScreen
