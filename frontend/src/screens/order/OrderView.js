import React, { useEffect, useState } from 'react';
import { useDispatch, useReducer, useSelector } from "react-redux";
import Modal from "react-modal";
import printHtmlToPDF from "print-html-to-pdf";
import Moment from "moment";



/**components */
import HeaderContent from '../../components/HeaderContent';
import ViewBox from "../../components/ViewBox";
import LoaderHandler from '../../components/loader/LoaderHandler';
import ModalButton from "../../components/ModalButton";
import { BigSpin } from '../../components/loader/SvgLoaders';
import NavBar from '../../components/layout/Navbar';

import { modalStyles } from '../../utils/styles';


/** constants */
import { ORDER_UPDATE_RESET } from '../../constants/orderConstants';

/** actions */
import {
    listOrderDetails,
    updateOrderToPaid,
} from "../../actions/orderActions";
import { Link } from 'react-router-dom';




const OrderView = ({ history, match }) => {
    const orderId = parseInt(match.params.id);

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [modalBill, setModalBill] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //order details state
    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;
    console.log(orderDetails);

    //order edit state
    const orderUpdate = useSelector((state) => state.orderUpdate);
    const {
        loading: loadingUpdate,
        success: successUpdate,
        errorUpdate,
    } = orderUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: ORDER_UPDATE_RESET });
            if (order.delivery) {
                history.push("/deliveries");
            } else {
                history.push("/activeOrders");
            }
        }
        if (order) {
            if (!order.id || order.id !== orderId) {
                dispatch(listOrderDetails(orderId));
            }
        }
    }, [dispatch, history, order, orderId, successUpdate]);

    const renderModalPay = () => (
        <Modal
            style={modalStyles}
            isOpen={modal}
            onRequestClose={() => setModal(false)}
        >
            <h2 className="text-center">Paiement de la commande</h2>
            <p className="text-center">La commande est-elle déjà payée ?</p>
            <form onSubmit={handlePay}>
                <button type="submit" className="btn btn-primary float-end">
                    Oui, Fermer.
                </button>

                <ModalButton
                    modal={modal}
                    setModal={setModal}
                    classes={"btn-danger float-right"}
                />
            </form>
        </Modal>
    );

    function format(number) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'XAF' }).format(number)
    }

    async function onPrint() {
        const node = window.document.getElementById("print-me")

        const pdfOption = {
            jsPDF: {
                unit: 'px',
                format: 'a8',
            },
            spin: false,
            fileName: 'default'
        }
        console.log('before prin')
        await printHtmlToPDF.print(node, pdfOption);
    }

    const renderModalBill = () => (
        <Modal
            style={modalStyles}
            isOpen={modalBill}
            onRequestClose={() => setModalBill(false)}
        >
            <div id='print-me' >
                <div style={{ padding: '10px' }}>
                    <h3 style={{ textAlign: "center" }}><b>GROUPE HOTELIER RAPHIA</b></h3>
                    <br />

                    Table : {order?.table?.name} <br />
                    Date : {order?.createdAt?.slice(0, 10)} à {order?.createdAt?.slice(11, 19)}<br />
                    Servir par : {order?.user?.name} <br />

                    <hr style={{
                        border: "none",
                        borderTop: "3px double #333",
                        color: "#333",
                        overflow: "visible",
                        textAlign: "center",
                        height: "5px"
                    }}
                    />
                    <br />
                    <h4><b>Consommation</b></h4>
                    {order && order?.products?.map((c, i) =>
                        <div key={i}>
                            <span>{"- " + c.name}</span>
                            <span style={{ float: "right" }}>{(c.OrderProduct.quantity) + " X " + format(c.price)}  </span>

                        </div>
                    )}

                    <hr style={{
                        border: "none",
                        borderTop: "3px double #333",
                        color: "#333",
                        overflow: "visible",
                        textAlign: "center",
                        height: "5px"
                    }}
                    />
                    <br />
                    <div style={{ height: "5px" }}>

                    </div>


                    <span>{"Total : " + format(order.total)}</span>
                    <br />
                    <a style={{ float: "right" }} onClick={(() => onPrint())}> Imprimer </a>

                </div>

            </div>
        </Modal>
    );

    const handlePay = async (e) => {
        e.preventDefault();
        const updatedOrder = {
            id: orderId,
        };
        setModal(false);
        dispatch(updateOrderToPaid(updatedOrder));
    };

    const handleEdit = (e) => {
        e.preventDefault();
        history.push(`/order/${orderId}/edit`);
    };

    //get all order items
    const totalItems = (productsIn) => {
        return productsIn.reduce(
            (acc, item) => acc + item.OrderProduct.quantity,
            0
        );
    };

    const renderCartInfo = () =>
        order &&
        order.products && (
            <div className="small-box bg-info">
                <div className="inner">
                    <h3>TOTAL {order.total} FCFA</h3>
                    <p>
                        {order.products.length > 0
                            ? totalItems(order.products)
                            : 0}{" "}
                        Articles en commande
                    </p>
                </div>
                <div className="icon">
                    <i className="bi bi-cash" />
                </div>
            </div>
        );



    const renderOrderProducts = () => (
        <table
            id="orderTable"
            className="table table-bordered table-hover table-striped text-center table-overflow"
        >
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {order &&
                    order.products &&
                    order.products.length > 0 &&
                    order.products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td className="text-center h4">
                                <span className="badge bg-primary">
                                    {product.OrderProduct.quantity}
                                </span>
                            </td>
                            <td className="text-center h4">
                                <span className="badge bg-info">
                                    {product.price} FCFA
                                </span>
                            </td>
                            <td className="text-center h4">
                                <span className={"badge bg-success"}>
                                    {product.price *
                                        product.OrderProduct.quantity}{" "} FCFA
                                </span>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );

    const renderOrderInfo = () =>
        order && (
            <>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <ViewBox
                            title={"Commande N° " + order.id}
                            // {order?.createdAt?.slice(0, 10)} à {order?.createdAt?.slice(11, 19)}
                            paragraph={Moment(order?.createdAt).format('DD-MM-YYYY à hh:mm:ss')} 
                            icon={"bi bi-list-check"}
                            color={"bg-dark"}
                        />
                    </div>

                    {order.isPaid ? (
                        <div className="col-12 col-md-6">
                            <ViewBox
                                title={"Payé"}
                                paragraph={"La commande est déjà payée"}
                                icon={"bi bi-clipboard-check"}
                                color={"bg-success"}
                            />
                        </div>
                    ) : (
                        <div className="col-12 col-md-6">
                            <ViewBox
                                title={"Non Payée"}
                                paragraph={"La commande n'est toujours pas payée"}
                                icon={"bi bi-wallet2"}
                                color={"bg-danger"}
                            />
                        </div>
                    )}

                    <div className="col-12 col-md-6">
                        {order.client && (
                            <ViewBox
                                title={order.client.name}
                                paragraph={order?.client?.email}
                                icon={"bi bi-person"}
                                color={"bg-info"}
                            />
                        )}
                    </div>

                    {order.table ? (
                        <div className="col-12 col-md-6">
                            <ViewBox
                                title={'Table'}
                                paragraph={`#: ${order?.table?.name}`}
                                icon={"bi bi-table"}
                                color={"bg-info"}
                            />
                        </div>
                    ) : (
                        <div className="col-12 col-md-6">
                            {order.client && (
                                <ViewBox
                                    title={"Table"}
                                    paragraph={order?.table ? order?.table.name : '--' } 
                                    icon={"bi bi-table"}
                                    color={"bg-primary"}
                                />
                            )}
                        </div>
                    )}
                </div>

                <div className="col-12 col-lg-3">
                    <ViewBox
                        title={"Note:"}
                        paragraph={order.note}
                        icon={"bi bi-card-text"}
                        color={"bg-silver"}
                    />
                </div>
            </>
        );

    const renderOrderEdit = () => (
        <div className="card">
            <div className="card-header bg-warning">Modification Commande</div>
            <div className="card-body">
                <button className="btn btn-block" onClick={handleEdit}>
                    <ViewBox
                        title={`Modification commande`}
                        paragraph={`Modifier`}
                        icon={"bi bi-list-ol"}
                        color={"bg-warning"}
                    />
                </button>
            </div>
        </div>
    );


    const orderPay = () => {
        <button
            className='btn btn-block'
            onClick={(setModal(true))}

        >Régler</button>
    }

    const generateBill = () => {
        <button
            className='btn btn-block'
            onClick={(setModalBill(true))}

        >Régler</button>


    }


    // const renderOrderPay = () => (
    //     <div className="card">
    //         <div className="card-header bg-success">Mise à jour du paiement</div>
    //         <div className="card-body">
    //             <button
    //                 className="btn btn-block"
    //                 onClick={() => setModal(true)}
    //             >
    //                 <ViewBox
    //                     title={`PAYER ${order.total} FCFA`}
    //                     paragraph={`Réglé`}
    //                     icon={"fas fa-hand-holding-usd"}
    //                     color={"bg-success"}
    //                 />
    //             </button>
    //         </div>
    //     </div>
    // );

    const renderInfo = () => (
        <>
            <div className="">
                {renderCartInfo()}
                {renderOrderProducts()}
            </div>

            <div className="">{renderOrderInfo()}</div>
        </>
    );

    const renderOrderButton = () => (
        <div className="col-12 col-md-12">
            {order && !order.isPaid && renderOrderEdit()}
        </div>
    );

    // const renderPayButton = () => (
    //     <div className="col-12 col-md-6">
    //         {order && !order.isPaid && renderOrderPay()}
    //     </div>
    // );

    return (
        <NavBar>
            <HeaderContent name={"Commandes >> Détails"} />
            <LoaderHandler loading={loadingUpdate} error={errorUpdate} />
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        {renderModalPay()}
                        {renderModalBill()}
                        <div className="col-md-12">
                            {/* <ButtonGoBack history={history} /> */}
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <Link to='/orders' className='btn btn-dark rounded-0 me-4'  >
                                            <i className='bi bi-arrow-left'></i>
                                            Précédent
                                        </Link>
                                        <button className='bi bi-printer bt btn-default'
                                            onClick={() => generateBill()} >
                                        </button>
                                    </h3>
                                     {!order.isPaid && <button className={"btn btn-success col-lg-3 rounded-0"}  onClick={() => orderPay()}><i className='bi bi-check'></i>Régler</button>}
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <div className="row d-flex justify-content-center">
                                        <LoaderHandler
                                            loading={loading}
                                            error={error}
                                            render={renderInfo}
                                            loader={<BigSpin />}
                                        />
                                    </div>
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                    <div className="row d-flex justify-content-between">
                        <LoaderHandler
                            loading={loading}
                            error={error}
                            render={renderOrderButton}
                            loader={<BigSpin />}
                        />
                        <LoaderHandler
                            loading={loading}
                            error={error}
                            // render={renderPayButton}
                            loader={<BigSpin />}
                        />
                    </div>
                </div>
                {/* /.container-fluid */}
            </section>
        </NavBar>
    );
};

export default OrderView;
