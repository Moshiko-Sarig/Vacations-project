import "./Vacations.css";
import { useState, useEffect } from 'react';
import Vaction from "../../Models/Vaction";
import VacationService from "../../Services/VacationService";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../LayoutArea/Header/Header";
import AdminVacationCard from "./AdminVacationCard";
import UserVacationCard from "./UserVacationCard/UserVacationCard";
import { updateVacations } from "../../Actions";

function VactionUser(): JSX.Element {

    const logged = useSelector((state: ReduxState) => state.Logged);
    const vacations = useSelector((state: ReduxState) => state.Vacations);
    const dispatch = useDispatch();

    useEffect(() => {
        VacationService.getAllVacations(logged.userInfo)
            .then(result => dispatch(updateVacations(result)))
            .catch(err => console.error(err.message));

    }, [])

    return (
        <div className="Home">
            {logged.isLogged ?
                logged.userInfo.is_admin ?
                    vacations &&
                    <AdminVacationCard />
                    :
                    vacations &&
                    <UserVacationCard />
                :
                <span>feel free Log-In</span>
            }
        </div>
    )
}

export default VactionUser;
