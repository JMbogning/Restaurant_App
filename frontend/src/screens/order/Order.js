import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import printHTMLToPDF from "print-html-to-pdf";

/** Components */
import HeaderContent from '../../components/HeaderContent';
import DataTableLoader from '../../components/loader/DataTableLoader';
import LoaderHandler from '../../components/loader/LoaderHandler';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import NavBar from '../../components/layout/Navbar';
import ModalButton from "../../components/ModalButton";


/** Actions */
import { listOrders } from '../../actions/orderActions';

import { modalStyles } from '../../utils/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const OrderScreen = ({ history, match }) => {
    const orderId = parseInt(match.params.id);

    const [pageNumber, setPageNumber] = useState(1);
    const [keyword, setKeyword] = useState("");;
    const [modal, setModal] = useState(false);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderList = useSelector((state) => state.orderList);
    console.log(orderList);
    const { loading, error, orders, page, pages } = orderList;

    useEffect(() => {
        dispatch(listOrders({ keyword, pageNumber, delivery: false }));
    }, [dispatch, history, userInfo, pageNumber, keyword]);

    const renderCreateButton = () => (
        <p className='text-end' >
            <Link className='btn btn-success rounded-0' to="orderCreate">
                <i className="bi bi-plus-circle" /> Ajouter
            </Link>
        </p>

    );




    const renderModalFacture = () => (
        <Modal
            style={modalStyles}
            isOpen={modal}
            onRequestClose={() => setModal(false)}
        >
            <h2 className="text-center">GROUPE HOTELIER RAPHIA</h2>
            <br />

            Table: {orders?.table?.name}

        </Modal>
    );


    const facturePay = () => {
        <button
            className='btn btn-block'
            onClick={(setModal(true))}

        >Régler</button>
    }

    const renderOrdersTable = () => {
        return (

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Client</th>
                        <th>Table</th>
                        <th>Etat service</th>
                        <th>Etat paiement</th>
                        <th>Total</th>
                        <th>Actions</th>

                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{order.client.name}</td>
                            <td className="d-none d-sm-table-cell h4">{order?.table ? order?.table?.name : '---'}</td>
                            <td className="d-none d-sm-table-cell h4">
                                {order?.delivery ? (
                                    <span className={"badge badge-success"}>
                                        Servie
                                    </span>
                                ) : (
                                    <span className={"badge badge-warning"}>
                                        En cours
                                    </span>
                                )}
                            </td>
                            <td>
                                {order.isPaid ? (
                                    <span className='badge badge-success'>
                                        <i className="bi bi-check2-all">Réglée</i>
                                    </span>
                                ) : (
                                    <span className='badge badge-danger'>
                                        <i className="bi bi-x-lg">Non Réglée</i>
                                    </span>
                                )}
                            </td>
                            <td className="d-none d-sm-table-cell h4">
                                <span className="text-bold">
                                    {order.total} FCFA
                                </span>
                            </td>
                            <td>
                                <div className="btn-group">
                                    <a className="hover-primary dropdown-toggle no-caret" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-center" href="#">Ajouter</a>
                                        <Link to={`/order/${order.id}/view`} class="dropdown-item" href="#">Détails</Link>
                                        <a onClick={() => facturePay()} className="dropdown-item" href="#">Voir la facture</a>
                                    </div>
                                </div>
                            </td>
                            {/* <td>
                                <Link
                                    to={`/order/${order.id}/view`}
                                    className="btn btn-info btn-lg"
                                >
                                    Détails
                                </Link>
                            </td> */}
                        </tr>
                    ))}
                </tbody>

            </table>

        )
    };

    const renderOrders = () => (
        <>
            <div className="card ">
                <div className="card-header">
                    <h3 className="card-title">Commandes</h3>
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
                        loader={DataTableLoader()}
                        render={renderOrdersTable}
                    />
                </div>
                {/* /.card-body */}
            </div>

            <Pagination page={page} pages={pages} setPage={setPageNumber} />
        </>
    );

    return (
        <NavBar>
            <HeaderContent name={"Commande"} />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        {renderModalFacture()}


                        <div className="col-12">
                            {renderCreateButton()}

                            <hr />
                            {renderOrders()}

                        </div>
                    </div>
                </div>
            </section>


        </NavBar>
    )
}
export default OrderScreen