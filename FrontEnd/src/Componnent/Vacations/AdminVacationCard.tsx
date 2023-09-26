import axios from "axios";
import "./AdminVacationCard.css";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Vaction from "../../Models/Vaction"
import { ReduxState } from "../LayoutArea/Header/Header";





function AdminVacationCard() {
    let [state, setState] = useState<{ vacations: Vaction[] }>({ vacations: [] });
    const logged = useSelector((state: ReduxState) => state.Logged);

    useEffect(() => {
        getAllVacationsAsync();
    }, []);

    async function getAllVacationsAsync() {
        try {
            const response = await axios.get<Vaction[]>(`http://localhost:4000/api/vactions`);
            const allVacations = response.data;
            setState({ vacations: allVacations });
        }
        catch (error) {
            console.log({ message: error });
        }
    }

    async function deleteVacation(id:number) {
        try {
            await axios.delete(`http://localhost:4000/api/deleteVacation/${id}`);
            console.log(`Vacation id number ${id} deleted`);
            getAllVacationsAsync();

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="AdminVacationCard">
            {state.vacations.map(v =>
                <div className="container  col-md-4" key={v.vacation_id}>
                    <div className="card-columns row-3  ">
                        <div className="card h-250  text-dark bg-light" style={{ width: 390, height: 420 }}>
                            <img className="card-img-top" src={`http://localhost:4000/api/images/${v.vacation_picture}`} style={{ height: "50%", width: "100%" }} alt="Error" />
                            <div className="card-body text-left">
                                <h4 className="card-title text-center"> {v.description_destination}</h4>
                                <div className="card-text">
                                    description: <span style={{ fontWeight: "bold" }}> {v.vacation_description} </span>
                                    <br />
                                    Start Date: <span style={{ fontWeight: "bold" }}>{new Date(v.vacation_start_date).toLocaleString("en-GB").substring(0, 10)} </span>
                                    <br />
                                    End Date: <span style={{ fontWeight: "bold" }}> {new Date(v.vacation_end_date).toLocaleString("en-GB").substring(0, 10)}</span>
                                    <br />
                                    Price: <span style={{ fontWeight: "bold" }}>{v.vacation_price}$</span>
                                    <br />
                                    Followers: <span style={{ fontWeight: "bold" }}> {v.vacation_followers}</span>
                                    <br />
                                    <button className="bg-danger" onClick={() => deleteVacation(v.vacation_id)}>Delete Vaction</button>
                                   
                                    <button className="bg-warning">  <NavLink className="bg-warning"  to={`/EditVacation/${v.vacation_id}`}>Edit Vaction</NavLink> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AdminVacationCard;