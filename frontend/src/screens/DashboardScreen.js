import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/** Components */
import NavBar from '../components/layout/Navbar';
import HeaderContent from '../components/HeaderContent';
import SmallBox from '../components/SmallBox';
import DeliveryListItem from '../components/DeliveryListItem';
import DataTableLoader from '../components/loader/DataTableLoader';
import LoaderHandler from '../components/loader/LoaderHandler';

/** Actions */
import {
    SkeletonBoxes,
    SkeletonSales,
} from "../components/loader/SkeletonLoaders";
import { getStatistics } from '../actions/orderActions';



const DashboardScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderStatistics = useSelector((state) => state.orderStatistics);
    const { loading, error, data } = orderStatistics;

    const { orders, sales, statistics } = data;


    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
        dispatch(getStatistics());
    }, [dispatch, history, userInfo]);

    //get all in place orders
    const ordersInPlace = (orders) => {
        const ordersInPlace = orders.filter(function (item) {
            return item.delivery === false;
        });

        return ordersInPlace;
    };

    const getTodaySales = (items) => {
        let day = new Date();
        day = day.toISOString().slice(8, 10);
        const newSales = items.filter(function (item) {
            const saleDay = item.updatedAt.slice(8, 10);
            return day === saleDay;
        });
        return newSales;
    };

    //get all delivery orders
    const ordersForDelivery = (orders) => {
        const ordersForDelivery = orders.filter(function (item) {
            return item.delivery === true;
        });

        return ordersForDelivery;
    };

    //table row click from in place orders
    const handleRowClick = (e, id) => {
        e.preventDefault();
        history.push(`/order/${id}/view`);
    };

    const returnSales = () => {
        var indents = [];
        for (var i = 0; i < (sales.length > 3 ? 4 : sales.length); i++) {
            indents.push(
                <tr key={sales[i].id}>
                    <td className="font-weight-bold">{i+1}</td>
                    <td className="h5" align='left'>
                        {sales[i].delivery ? (
                            <span className="">EN COMMANDE</span>
                        ) : (
                            <span className="">SERVIE</span>
                        )}
                    </td>
                    <td className="h4">
                        <span className={"badge bg-success"}>
                            {sales[i].total} FCFA
                        </span>
                    </td>
                    <td className="h4">
                        <span className={"badge bg-warning"}>
                            {sales[i].products.length}
                        </span>
                    </td>
                    <td>
                        <Link
                            to={`/order/${sales[i].id}/view`}
                            className="btn btn-info"
                        >
                            <i className="bi bi-eye"></i>
                        </Link>
                    </td>
                </tr>
            );
        }
        return indents;
    };

    const renderSmallBoxes = () => (
        <div className="row">
            <SmallBox
                number={orders.length}
                paragraph={"Tables libres"}
                link={"activeOrders"}
                color={"success"}
            />

            <SmallBox
                number={ordersInPlace(orders).length}
                paragraph={"Commandes en cours"}
                link={"activeOrders"}
                color={"info"}
            />


            <SmallBox
                number={ordersForDelivery(orders).length}
                paragraph={"Commandes pour la livraison"}
                link={"deliveries"}
                color={"danger"}
            />

            <SmallBox
                number={orders.length}
                paragraph={"Commandes Livrées"}
                link={"orders"}
                color={"dark"}
            />
        </div>
    );

    const renderSales = () => (
        <div className="row">
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-header border-0">
                        <h3 className="card-title">Dernières ventes</h3>
                        <div className="card-tools">
                            <Link to="/order" className="btn btn-tool btn-sm"></Link>
                        </div>
                    </div>
                    <div className="card-body table-responsive p-0">
                        <table className="table table-striped table-valign-middle text-center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Total</th>
                                    <th>Produits</th>
                                    <th>Plus</th>
                                </tr>
                            </thead>
                            <tbody>{returnSales(sales)}</tbody>
                        </table>
                    </div>
                </div>
            </div>

            {(userInfo?.role?.name === 'Caissier' || userInfo?.role?.name === 'Administrateur') &&

                <div className="col-12 col-lg-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <h3 className="card-title">Aperçu</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-10">TOTAL DES COMMANDES RÉALISÉES</div>
                                <div className="col-2"> {statistics && statistics.orders}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-10">NOMBRE TOTAL DE LIVRAISONS EFFECTUÉES</div>
                                <div className="col-2"> {statistics && statistics.deliveries}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-10">VENTES AUJOURD'HUI</div>
                                <div className="col-2">{statistics && statistics.today ? statistics.today : 0}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-10">TOTAL DES VENTES</div>
                                <div className="col-2 text-primary">
                                    <span className='badge badge-primary'>
                                        {statistics && statistics.total}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );

    const renderOrders = () => (
        <table className="table m-0 table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>Table</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {ordersInPlace(orders)
                    .splice(0, 5)
                    .map((order, index) => (
                        <tr
                            key={index}
                            onClick={(e) => handleRowClick(e, order.id)}
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <td>
                                <h4>
                                    <span className={"badge bg-primary"}>
                                        {index+1}
                                    </span>
                                </h4>
                            </td>
                            <td>{order?.client ? order?.client?.name : ""}</td>
                            <td>{order?.table ? order?.table?.name : ""}</td>
                            <td>
                                <h4>
                                    <span className={"badge bg-success"}>
                                        {order.total} FCFA
                                    </span>
                                </h4>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );

    const renderDeliveries = () =>
        ordersForDelivery(orders)
            .splice(0, 5)
            .map((order) => (
                <DeliveryListItem
                    id={order.id}
                    name={order?.client ? order?.client?.name : ""}
                    address={order?.client ? order?.client?.address : ""}
                    key={order?.id}
                />
            ));

    return (
        <NavBar>
            <HeaderContent name={"Dashboard"} />

            <div className="container-full">
                <section className="content">
                    <LoaderHandler
                        loading={loading}
                        error={error}
                        loader={<SkeletonBoxes />}
                        render={renderSmallBoxes}
                    />

                    {userInfo.isAdmin && (
                        <LoaderHandler
                            loading={loading}
                            error={error}
                            loader={<SkeletonSales />}
                            render={renderSales}
                        />
                    )}

                    {(userInfo?.role?.name === 'Cuisinier' || userInfo?.role?.name === 'Serveur' || userInfo?.role?.name === 'Administrateur') &&

                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="card">
                                    <div className="card-header border-transparent">
                                        <h3 className="card-title">
                                            Dernières commandes en cours
                                        </h3>
                                        <div className="card-tools">
                                            <button
                                                type="button"
                                                className="btn btn-tool"
                                                data-card-widget="collapse"
                                            >
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <LoaderHandler
                                                loading={loading}
                                                error={error}
                                                loader={<DataTableLoader />}
                                                render={renderOrders}
                                            />
                                        </div>
                                    </div>
                                    <div className="card-footer clearfix">
                                        <Link
                                            to={"/orderCreate"}
                                            className="btn btn-sm btn-info float-left"
                                        >
                                            Passer une nouvelle commande
                                        </Link>
                                        <Link
                                            to={"/orders"}
                                            className="btn btn-sm btn-secondary float-right"
                                        >
                                            Voir toutes les commandes
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                            Récente commande
                                        </h3>
                                        <div className="card-tools">
                                            <button
                                                type="button"
                                                className="btn btn-tool"
                                                data-card-widget="collapse"
                                            >
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        <ul className="products-list product-list-in-card pl-2 pr-2">
                                            <LoaderHandler
                                                loading={loading}
                                                loader={<DataTableLoader />}
                                                error={error}
                                                render={renderDeliveries}
                                            />
                                        </ul>
                                    </div>
                                    <div className="card-footer text-center">
                                        <Link
                                            to={"/deliveries"}
                                            className="uppercase"
                                        >
                                            Voir toutes les commandes de livraison
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    }

                </section>
            </div>
            {/* /.container-fluid */}
        </NavBar>
    )
}
export default DashboardScreen