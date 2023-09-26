import UserModel from "../Models/User";
import Vaction from "../Models/Vaction";

export const LogIn = (userInfo: UserModel) => {
    return { type: "Log-In", userInfo }
};

export const LogOut = () => {
    return { type: "Log-Out" }
};

export const updateVacations =(vacations:Vaction[])=>{
    return{ type : "Update-Vacations", Vacations:vacations}
};

export const deleteVacations =()=>{
    return{ type : "Delete-Vacations"}
};


