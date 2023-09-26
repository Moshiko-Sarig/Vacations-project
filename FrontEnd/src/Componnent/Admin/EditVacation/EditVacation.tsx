import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Vaction from "../../../Models/Vaction";
import { ReduxState } from "../../LayoutArea/Header/Header";
import { useParams } from "react-router-dom";
import globals from "../../../Services/Globals";
import axios from "axios";


function EditVacation() {

    const { register, handleSubmit, formState: { errors } } = useForm<Vaction>();

    const logged = useSelector((state: ReduxState) => state.Logged);

    const vacations = useSelector((state: ReduxState) => state.Vacations);

    const vacationIdParam = useParams().vacation_id as string;

    const vacationToEdit = vacations.find((v) => {
        return v.vacation_id == Number(vacationIdParam)
    });

    async function editDataVacation(editedVacation: Vaction) {
        try {
            const myFormData = new FormData();
            myFormData.append("vacation_description", editedVacation.vacation_description);
            myFormData.append("description_destination", editedVacation.description_destination);
            myFormData.append("vacation_picture", editedVacation.vacation_picture[0]);
            myFormData.append("vacation_start_date", editedVacation.vacation_start_date);
            myFormData.append("vacation_end_date", editedVacation.vacation_end_date);
            myFormData.append("vacation_price", String(editedVacation.vacation_price));
            await axios.put(`${globals.editVacationUrl}/${vacationToEdit?.vacation_id}`, myFormData );
            alert("Edit Secssues");
        }
        catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div>
            {
                logged.isLogged ?
                    <div className="container">
                        <div className="d-flex justify-content-center ">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Edit Vaction Number {vacationToEdit?.vacation_id} </h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(editDataVacation)} >// need to add  handel submit and the function to make it working!
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input {...register('vacation_description', { minLength: 3 })} className="form-control" defaultValue={vacationToEdit?.vacation_description} placeholder='Vacation Description ' />
                                            {errors.vacation_description?.type === "minLength" && <span>User Name too short need to be minimum 3 character </span>}
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input {...register('description_destination', { minLength: 3 })} className="form-control" defaultValue={vacationToEdit?.description_destination} placeholder='Description Destination' />
                                            {errors.description_destination?.type === "minLength" && <span>First Name too short need to be minimum 3 character </span>}
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input type="text" onMouseEnter={(e) => { (e.target as HTMLInputElement).type = "file" }} {...register('vacation_picture')} defaultValue={vacationToEdit?.vacation_picture} className="form-control" placeholder='Select Image' />
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input type="string" onMouseEnter={(e) => { (e.target as HTMLInputElement).type = "date" }}  {...register('vacation_start_date')} defaultValue={vacationToEdit?.vacation_start_date} className="form-control" placeholder='Vacation Start Date' />
                                            {errors.vacation_start_date?.type === "required" && <span> Missing Start Date .</span>}
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input type="text" onMouseEnter={(e) => { (e.target as HTMLInputElement).type = "date" }}{...register('vacation_end_date')} defaultValue={vacationToEdit?.vacation_end_date} name="vacation_end_date" className="form-control" placeholder='Vacation End Date' />
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                            <input type="number"{...register('vacation_price')} name="vacation_price" className="form-control" defaultValue={vacationToEdit?.vacation_price} placeholder='Vacation Price' />
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
                    <div>Error you need so sign in as admin!</div>
            }

        </div>
    );
}

export default EditVacation;