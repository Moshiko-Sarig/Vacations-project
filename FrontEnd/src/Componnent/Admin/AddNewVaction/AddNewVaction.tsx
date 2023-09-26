import axios from "axios";
import globals from '../../../Services/Globals';
import { useForm } from 'react-hook-form';
import "./AddNewVaction.css";
import Vaction from '../../../Models/Vaction';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../LayoutArea/Header/Header';

function AddNewVaction() {

    async function AddVactionNew(vaction: Vaction) {
        try {
            const myFormData = new FormData();
            myFormData.append("vacation_description", vaction.vacation_description);
            myFormData.append("description_destination", vaction.description_destination);
            myFormData.append("vacation_picture", vaction.vacation_picture[0]);
            myFormData.append("vacation_start_date", vaction.vacation_start_date);
            myFormData.append("vacation_end_date", vaction.vacation_end_date);
            myFormData.append("vacation_price", String(vaction.vacation_price));
            console.log(vaction);
            const response = await axios.post<Vaction>(globals.addVactionUrl, myFormData);
            const addedVaction = response.data;
            alert("Vaction has been add !");
            console.log(addedVaction);

        }
        catch (err) {
            console.log(err);
        }
    }
    const { register, handleSubmit, formState: { errors } } = useForm<Vaction>();
    const logged = useSelector((state: ReduxState) => state.Logged);

    return (
        <div className='AddNewVaction'>
            {
                logged.isLogged ?
                    <div className="container">
                        <div className="d-flex justify-content-center ">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Add New Vaction</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(AddVactionNew)}>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input {...register('vacation_description', { required: true, minLength: 3 })} className="form-control" placeholder='Vacation Description ' />
                                            {errors.vacation_description?.type === "required" && <div> Missing User Name </div>}
                                            {errors.vacation_description?.type === "minLength" && <span>User Name too short need to be minimum 3 character </span>}
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input {...register('description_destination', { required: true, minLength: 3 })} className="form-control" placeholder='Description Destination' />
                                            {errors.description_destination?.type === "required" && <span> Missing name.</span>}
                                            {errors.description_destination?.type === "minLength" && <span>First Name too short need to be minimum 3 character </span>}
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>

                                            <input type="text" onMouseEnter={(e) => { (e.target as HTMLInputElement).type = "file" }} {...register('vacation_picture', { required: true, })} className="form-control" placeholder='Select Image' />
                                            {errors.vacation_picture?.type === "required" && <span> Missing Last name.</span>}

                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input type="string" onMouseEnter={(e) => { (e.target as HTMLInputElement).type = "date" }} {...register('vacation_start_date', { required: true })} name="vacation_start_date" className="form-control" placeholder='Vacation Start Date' />
                                            {errors.vacation_start_date?.type === "required" && <span> Missing Start Date .</span>}
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input type="text" onMouseEnter={(e) => { (e.target as HTMLInputElement).type = "date" }}{...register('vacation_end_date', { required: true })} name="vacation_end_date" className="form-control" placeholder='Vacation End Date' />
                                            {errors.vacation_end_date?.type === "required" && <span> Missing End Date .</span>}
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input type="number"{...register('vacation_price', { required: true, })} name="vacation_price" className="form-control" placeholder='Vacation Price' />
                                            {errors.vacation_price?.type === "required" && <span> Missing Price .</span>}
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn float-center login_btn">Add Vaction</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>You need to sign in to the admin</div>
            }
        </div>
    );
}
export default AddNewVaction;