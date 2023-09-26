import React from 'react';
import axios from "axios";
import globals from '../../Services/Globals';
import { useState, SyntheticEvent } from 'react';
import { useForm, } from 'react-hook-form';
import "./SignUp.css";
import UserModel from '../../Models/User';



function SignUp() {
    let [state, setState] = useState({ userName: "" });

    function handelUserNameChange(event: SyntheticEvent) {
        let username = (event.target as HTMLInputElement).value;
        setState({ userName: username });
    }
    async function addNewUser(user: UserModel) {

        try {

            const getRequest = await axios.get<UserModel[]>(globals.allUsersUrl);
            const allUsers = getRequest.data;
            const userNameIndex = allUsers.findIndex(u => u.user_name == state.userName);
            if (userNameIndex > -1) {
                throw ("User Name allready taken!");
            }

            else {
                
                const response = await axios.post<UserModel>(globals.addUserUrl, user);
                const addedUser = response.data;
                alert("User has been add !");
            }
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
        <div className='SignUp' >
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="cardSignUp">
                        <div className="card-header">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(addNewUser)}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"></span>
                                    </div>
                                    <input {...register('user_name', { required: true, minLength: 3 })} className="form-control" placeholder='User Name ' onChange={handelUserNameChange} />
                                    {errors.user_name?.type === "required" && <span> Missing User Name </span>}
                                    {errors.user_name?.type === "minLength" && <span>User Name too short need to be minimum 3 character </span>}
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"></span>
                                    </div>
                                    <input {...register('first_name', { required: true, minLength: 3 })} className="form-control" placeholder='First Name' />
                                    {errors.first_name?.type === "required" && <span> Missing name.</span>}
                                    {errors.first_name?.type === "minLength" && <span>First Name too short need to be minimum 3 character </span>}
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"></span>
                                    </div>
                                    <input {...register('last_name', { required: true, minLength: 3 })} className="form-control" placeholder='Last Name ' />
                                    {errors.last_name?.type === "required" && <span> Missing Last name.</span>}
                                    {errors.last_name?.type === "minLength" && <span> Last Name too short need to be minimum 3 character </span>}
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"></span>
                                    </div>
                                    <input type="password"{...register('password', { required: true, minLength: 6 })} name="password" className="form-control" placeholder='Password' />
                                    {errors.password?.type === "required" && <span> Missing password.</span>}
                                    {errors.password?.type === "minLength" && <span> Last Name too short need to be minimum 6 character </span>}
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn float-center login_btn">Sign-Up</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SignUp;