import React from 'react';
import { FaUserCircle, FaUserEdit } from 'react-icons/fa';
import "./Sign-In.css";
import { NavLink } from 'react-router-dom';
import UserModel from "../../Models/User";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { LogIn, } from '../../Actions/';
import globals from '../../Services/Globals';
import { ReduxState } from '../LayoutArea/Header/Header';
import SokcetService from '../../Services/SocketView';





function SignIn() {

    const dispatch = useDispatch();
    const logged = useSelector((state: ReduxState) => state.Logged);

    async function login(user: UserModel) {
        try {
            console.log(user);
            const response = await axios.post<UserModel>(globals.login, user);
            SokcetService.connect(dispatch);
            const addedUser = response.data;
            dispatch(LogIn(response.data));
            console.log(addedUser);
        }

        catch (err) {
            alert("Error: " + err);
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserModel>();

    return (
        <div className='Sign-In'>
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="cardSignIn">
                        <div className="card-header">
                            <h3>Sign In <FaUserCircle /></h3>
                        </div>
                        <form onSubmit={handleSubmit(login)}>
                            <div className="card-body">
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"></span>
                                    </div>
                                    <input {...register('user_name', { required: true })} className="form-control" placeholder="username" />
                                    {errors.user_name?.type === "required" && <span> Missing User Name </span>}
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"></span>
                                    </div>
                                    <input type="password" {...register('password', { required: true })} className="form-control" placeholder="password" />
                                    {errors.password?.type === "required" && <span> Missing password.</span>}
                                </div>
                                <br />
                                <div className="form-group">
                                    <button className="btn float-center login_btn" >
                                        {
                                            logged.isLogged &&
                                                <NavLink to="/Vactions"></NavLink>
                                        }
                                        Log-In</button>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account?<NavLink to="/Sign-Up">Sign-Up</NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default SignIn;