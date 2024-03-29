import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/** components */
import NavBar from '../../components/layout/Navbar';
import HeaderContent from "../../components/HeaderContent";
import DataTableLoader from "../../components/loader/DataTableLoader";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

/** actions */
import { listOrders } from "../../actions/orderActions";

const DeliveryScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);
    const [keyword, setKeyword] = useState("");
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders, page, pages } = orderList;

    useEffect(() => {
        dispatch(listOrders({ keyword, pageNumber, delivery: true }));
    }, [dispatch, userInfo, pageNumber, keyword]);

    // const renderCreateButton = () => (
    //     <Link to="/order/create/delivery">
    //         <button className="btn btn-success btn-lg">
    //             <i className="fas fa-truck" /> New Delivery
    //         </button>
    //     </Link>
    // );

    const renderTable = () => (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th className="d-none d-sm-table-cell">Addresse</th>
                    <th className="d-none d-sm-table-cell">Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{++index}</td>
                        <td>{order?.client?.name}</td>
                        <td className="d-none d-sm-table-cell">
                            {order?.client?.address}
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {order?.client?.phone}
                        </td>
                        <td>
                            <div className="btn-group">
                                <a className="hover-primary dropdown-toggle no-caret" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
                                <div className="dropdown-menu">
                                    <Link to={`/order/${order.id}/view`} class="dropdown-item" href="#">Détails</Link>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderDeliveries = () => (
        <>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Commandes livrées</h3>
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
                        render={renderTable}
                    />
                </div>
                {/* /.card-body */}
            </div>

            <Pagination page={page} pages={pages} setPage={setPageNumber} />
        </>
    );


    return (
        <NavBar>
            <HeaderContent name={"Servie"} />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {/* {renderCreateButton()} */}
                            <hr />

                            {renderDeliveries()}

                        </div>
                    </div>
                </div>
            </section>

        </NavBar>
    )

}
export default DeliveryScreen