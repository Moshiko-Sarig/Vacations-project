import { Action } from "redux";
import { io, Socket } from "socket.io-client";
import { updateVacations } from "../Actions";

 class SokcetService {
    static socket: Socket | undefined;

    static connect(dispatch:(action:Action)=>void): void {
        this.socket = io("http://localhost:4000");
        this.socket.on("VacationsUpdate" , (vacations) =>{
            dispatch(updateVacations(vacations));
        });
    }

    static disconnect(): void {
        this.socket?.disconnect();
    }

  

 }

 export default SokcetService;
