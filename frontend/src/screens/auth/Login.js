import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

/* Components */
import background from '../../bg/bg.jpg';


const Login = ({ history }) => {
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    //get user from state
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, error, loading } = userLogin;

    useEffect(() => {
        //if user is logged
        if (userInfo) {
            history.push("/");
        }
    }, [history, userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

	return (
		<div className="hold-transition theme-primary bg-img pt-150 pb-200" style={{backgroundImage: `url(${background})` }}>
			<div className="container h-p100">
				<div className="row align-items-center justify-content-md-center h-p100">
					<div className="col-12">
						<div className="row justify-content-center g-0">
							<div className="col-lg-5 col-md-5 col-12">
								<div className="bg-white rounded10 shadow-lg">
									<div className="content-top-agile p-20 pb-0">
										<h3 className="text-primary">RESTAURANT - HOTEL RAPHIA</h3>
										<p className="mb-0">Veuillez entrer vos identifiants SVP.</p>
									</div>
									<div className="p-40">
										{loading && <Loader variable={loading} />}
										{error && <Message message={error} color={"danger"} />}
										<form onSubmit={handleSubmit}>
											<div className="form-group">
												<div className="input-group mb-3">
													<span className="input-group-text bg-transparent"><i className="bi bi-person"></i></span>
													<input
														type="email"
														className="form-control ps-15 bg-transparent"
														placeholder="email"
														autoComplete='false'
														value={email}
														onChange={(e) => setEmail(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group">
												<div className="input-group mb-3">
													<span className="input-group-text  bg-transparent"><i className="bi bi-fingerprint"></i></span>
													<input 
														type="password" 
														className="form-control ps-15 bg-transparent" 
														placeholder="Mot de passe" 
														autoComplete='false'
														value={password}
														onChange={(e) => setPassword(e.target.value)}
													/>
												</div>
											</div>
											<div className="row mb-8">

												{/* <div className="col-6">
													<div className="fog-pwd text-end">
														<a href="#" className="hover-warning"><i className="ion ion-locked"></i> Forgot pwd?</a><br />
													</div>
												</div> */}

												<div className="col-12 text-center">
													<button type="submit" className="btn btn-danger mt-10">CONNEXION</button>
												</div>

											</div>
										</form>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
};
export default Login