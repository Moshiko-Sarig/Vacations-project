import axios from "axios";
import UserModel from "../Models/User";
import Vaction from "../Models/Vaction";
import globals from "./Globals";

class VacationService {

   static  async getAllVacations(user: UserModel): Promise<Vaction[]> {
        const vactionPromise = await axios.get<Vaction[]>(globals.allVactions, { headers: { Authorization: `bearer ${user.token}` } });
        const response = vactionPromise.data;
        return response;
    }


}
export default VacationService;