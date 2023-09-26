
import { Navigate, Route, Routes, } from "react-router-dom";
import Home from "../Home/Home";
import SignIn from "../Sign-In/Sign-In";
import SignUp from "../Sign-Up/SignUp";
import AddNewVaction from "../Admin/AddNewVaction/AddNewVaction";

import Vactions from "../Vacations/Vacations";
import EditVacation from "../Admin/EditVacation/EditVacation";
import Stats from "../Stats/Stats";





function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/Sign-In" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Sign-In" element={<SignIn />} />
            <Route path="/Sign-Up" element={<SignUp />} />
            <Route path="/AddNewVaction" element={<AddNewVaction />} />
            <Route path="/Vactions" element={<Vactions />} />
             <Route path="/EditVacation/:vacation_id" element={<EditVacation/>} />
             <Route path="/Stats" element={<Stats/>}/>
            <Route path="*" element={<h2>Not found</h2>} />
             {/* will be componnent NOT FOUND */}
        </Routes>
    )
}

export default Routing;                       