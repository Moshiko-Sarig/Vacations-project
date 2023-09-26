import axios from "axios";
import { useEffect, useState } from 'react';
import { FaFacebook } from "react-icons/fa"
import { useSelector } from "react-redux";
import Vaction from "../../../Models/Vaction"
import { ReduxState } from "../../LayoutArea/Header/Header";
import "./UserVacationCard.css";


function UserVacationCard() {

    let [state, setState] = useState<{ vacations: Vaction[] }>({ vacations: [] });
    const logged = useSelector((state: ReduxState) => state.Logged);


    let userVacationArray: any;


    useEffect(() => {
        getAllVacationsAsync();
    }, []);

    if (localStorage.savedVacationList) {
        userVacationArray = JSON.parse(`${localStorage.savedVacationList}`);
    }
    else {
        userVacationArray = JSON.parse(`${logged.userInfo.vacations_followed}`);
    }

    async function getAllVacationsAsync() {
        try {
            const response = await axios.get<Vaction[]>(`http://localhost:4000/api/vactions`);
            let allVacations = response.data;
            let userArray = JSON.parse(`${logged.userInfo.vacations_followed}`);
            let result = [];
            for (let i = 0; i < userArray.length; i++) {
                let vacation_id = userArray[i];
                let index = allVacations.findIndex(v => v.vacation_id == vacation_id);
                result.push(allVacations.splice(index, 1)[0]);
            }
            allVacations = result.concat(allVacations);
            setState({ vacations: allVacations });
        }

        catch (error) {
            console.log({ message: error });
        }
    }

    async function follow(data: Vaction) {
        try {
            const response = await axios.put(`http://localhost:4000/api/add/follower/${data.vacation_id}`);
            addFollowedVacation(data.vacation_id);
            getAllVacationsAsync();
        }
        catch (error) {
            console.log(error);
        }
    }

    async function unfollow(data: Vaction) {
        try {
            const response = await axios.put(`http://localhost:4000/api/subtract/follower/${data.vacation_id}`);
            removeFollowedVacation(data.vacation_id)
            getAllVacationsAsync();
        }
        catch (error) {
            console.log(error);
        }
    }

    async function addFollowedVacation(id: number) {
        userVacationArray.push(id);
        localStorage.savedVacationList = JSON.stringify(userVacationArray);
        console.log(localStorage.savedVacationList);
        try {
            const response = await axios.put(`http://localhost:4000/api/updateUserFollow/${logged.userInfo.user_id}/${localStorage.savedVacationList}`);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }


    async function removeFollowedVacation(id: number) {
        if (userVacationArray.indexOf(id) == 0) {
            userVacationArray = userVacationArray.slice(userVacationArray.indexOf(id) + 1);
            localStorage.savedVacationList = JSON.stringify(userVacationArray);
        }

        else if (userVacationArray.indexOf(id) >= 1) {
            let secondPart = userVacationArray.slice(userVacationArray.indexOf(id) + 1);
            let firstPart = userVacationArray.splice(0, userVacationArray.indexOf(id));
            userVacationArray = firstPart.concat(secondPart);
            localStorage.savedVacationList = JSON.stringify(userVacationArray);
        }
        try {
            const response = await axios.put(`http://localhost:4000/api/updateUserFollow/${logged.userInfo.user_id}/${localStorage.savedVacationList}`);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    function isUserFollwing(id: number) {
        let bool = false;
        for (let i = 0; i <= userVacationArray.length; i++) {
            if (userVacationArray[i] == id) {
                bool = true;
                break;
            }
        }
        return bool;
    }


    return (
        <div className="UserVacationCard">
            {state.vacations.map(v => (
                <div className="container" key={v.vacation_id}>
                    <div className="card-columns  ">
                        <div className="card h-250  text-dark bg-light" style={{ width: 390, height: 480 }}>
                            <img className="card-img-top" src={`http://localhost:4000/api/images/${v.vacation_picture}`} style={{ height: "50%", width: "100%" }} alt="Error" />
                            <div className="card-body text-left">
                                <h4 className="card-title text-center"> {v.description_destination}</h4>
                                <div className="card-text">
                                    description: <span style={{ fontWeight: "bold" }}> {v.vacation_description}</span>
                                    <br />
                                    Start Date: <span style={{ fontWeight: "bold" }}>{new Date(v.vacation_start_date).toLocaleString("en-GB").substring(0, 10)}</span>
                                    <br />
                                    End Date: <span style={{ fontWeight: "bold" }}>{new Date(v.vacation_end_date).toLocaleString("en-GB").substring(0, 10)}</span>
                                    <br />
                                    Price: <span style={{ fontWeight: "bold" }}>{v.vacation_price}$</span>
                                    <br />
                                    Followers: <span style={{ fontWeight: "bold" }}> {v.vacation_followers}</span>
                                    {isUserFollwing(v.vacation_id) ?
                                        <div>
                                            <label >Un-follow:</label>&nbsp;
                                            <span onClick={() => unfollow(v)} className="unfollow" ><FaFacebook /></span> 
                                        </div>
                                        :
                                        <div>
                                            <label >Follow:</label> &nbsp;
                                            <span onClick={() => follow(v)} className="follow"><FaFacebook /></span> 
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );




}












export default UserVacationCard;