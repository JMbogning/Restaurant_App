import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../actions/userActions';


const NavBar = ({ children }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);

    const { userInfo } = userLogin;
    // console.log(userInfo);

    useEffect(() => {
        if (!userInfo) {
            redirectTo();
        }
    }, [dispatch, userInfo]);

    const redirectTo = () => {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { referrer: "/" },
                }}
            />
        );
    };

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())

    }

    return (
        <div className="wrapper">
            <header className="main-header bg-dark">
                <div className="d-flex align-items-center logo-box justify-content-start">
                    <a href="#" className="waves-effect waves-light nav-link d-none d-md-inline-block mx-10 push-btn bg-transparent hover-primary" data-toggle="push-menu" role="button">
                        <span className="bi bi-list"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                    </a>
                    <Link to='/' className="logo">
                        <div className="logo-lg">
                            <span className="light-logo"><img src="assets/images/logo.jpeg" alt="logo" /></span>
                            <span className="dark-logo"><img src="assets/images/logo.jpeg" alt="logo" /></span>
                        </div>
                    </Link>
                </div>
                <nav className="navbar navbar-static-top">
                    <div className="app-menu">
                        <ul className="header-megamenu nav">
                            <li className="btn-group nav-item d-md-none">
                                <a href="#" className="waves-effect waves-light nav-link push-btn btn-info-light" data-toggle="push-menu" role="button">
                                    <span className="bi bi-list-columns-reverse"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="navbar-custom-menu r-side">
                        <ul className="nav navbar-nav">

                            {/* <li className="dropdown notifications-menu">
                                <span className="label label-primary">5</span>
                                <a href="#" className="waves-effect waves-light dropdown-toggle btn-primary-light" data-bs-toggle="dropdown" title="Notifications">
                                    <i className="bi bi-bell-fill"><span className="path1"></span><span className="path2"></span></i>
                                </a>
                                <ul className="dropdown-menu animated bounceIn">

                                    <li className="header">
                                        <div className="p-20">
                                            <div className="flexbox">
                                                <div>
                                                    <h4 className="mb-0 mt-0">Notifications</h4>
                                                </div>
                                                <div>
                                                    <a href="#" className="text-danger">Supprimer</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <ul className="menu sm-scrol">
                                            <li>
                                                <a href="#">
                                                    <i className="bi bi-bell-fill"></i> Notification Notification Notification.
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="footer">
                                        <a href="#">Voir Plus</a>
                                    </li>
                                </ul>
                            </li> */}


                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle p-0 text-dark hover-primary ms-md-30 ms-10 text-white" data-bs-toggle="dropdown" title="User">
                                    <span className="ps-30 d-md-inline-block d-none">Bienvenue,</span> <strong className="d-md-inline-block d-none">{userInfo ? userInfo.name : ""}</strong><img src="/avatar.png" className="user-image rounded-circle avatar bg-white mx-10" alt="User Image" />
                                </a>
                                <ul className="dropdown-menu animated flipInX">
                                    <li className="user-body">
                                        <Link to='/profile' className="dropdown-item"><i className="bi bi-person"></i> Profile</Link>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" style={{ cursor: "pointer" }} onClick={(e) => handleLogout(e)}><i className="bi bi-box-arrow-right"></i> Déconnection</a>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </nav>
            </header>

            <aside id='sidebar'  className="main-sidebar bg-dark">
                <section className="sidebar position-relative">
                    <div className="multinav">
                        <div className="multinav-scroll" style={{ height: '100%' }}>
                            <ul className="sidebar-menu" data-widget="tree">
                                <li className="treeview">
                                    <Link to='/'>
                                        <i className="bi bi-speedometer"></i>
                                        <span>Dashboard</span>
                                        <span className="pull-right-container">
                                        </span>
                                    </Link>

                                </li>

                                {(userInfo?.role?.name === "Serveur" || userInfo?.role?.name === 'Administrateur' || userInfo?.role?.name === "Cuisinier" || userInfo?.role?.name === 'caissier') &&
                                    <li>
                                        <Link to='/orders'>
                                            <i className="bi bi-clipboard2-check"><span className="path1"></span><span className="path2"></span></i>
                                            <span>Commandes</span>
                                        </Link>
                                    </li>
                                }

                                {(userInfo?.role?.name == "Serveur" || userInfo?.role?.name === 'Administrateur' || userInfo?.role?.name === 'caissier') &&
                                    <>
                                        <li>
                                            <Link to='/deliveries'>
                                                <i className="bi bi-list-ul"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span class="path4"></span><span className="path5"></span></i>
                                                <span>Commandes Livrées</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/activeOrders'>
                                                <i className="bi bi-cart-check"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span class="path4"></span><span className="path5"></span></i>
                                                <span>Commandes Actives</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to='/categories'>
                                                <i className="bi bi-tags"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></i>
                                                <span>Types</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to='/products'>
                                                <i className="bi bi-egg"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></i>
                                                <span>Menus</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to='/tables'>
                                                <i className="bi bi-table"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></i>
                                                <span>Tables</span>
                                            </Link>
                                        </li>


                                    </>
                                }

                                {userInfo?.role?.name === 'Administrateur' && (

                                    <>
                                        <li>
                                            <Link to='/clients'>
                                                <i className="bi bi-person"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></i>
                                                <span>Clients</span>
                                            </Link>
                                        </li>
                                        <hr />

                                        <li>
                                            <Link to='/users'>
                                                <i className="bi bi-person-lines-fill"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></i>
                                                <span>Utilisateurs</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to='/roles'>
                                                <i className="bi bi-gem"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></i>
                                                <span>Roles</span>
                                            </Link>
                                        </li>

                                    </>

                                )}

                            </ul>

                            <center>
                                <p><strong className="d-block">KTC-CENTER</strong> © 2022 Tous droits réservés</p>

                            </center>
                            {/* <div className="sidebar-widgets">
                                <div className="mx-25 mb-30 pb-20 side-bx bg-primary bg-food-dark rounded20">
                                    <div className="text-center">
                                        <img src="/res-menu.png" class="sideimg" alt="" />
                                        <h3 className="title-bx">GROUPE RAPHIA</h3>

                                    </div>
                                </div>

                            </div> */}
                        </div>
                    </div>
                </section>
            </aside>

            <div className="content-wrapper">
                <div className="container-full">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default NavBar

