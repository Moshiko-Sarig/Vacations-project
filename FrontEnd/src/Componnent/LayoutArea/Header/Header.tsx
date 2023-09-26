import "./Header.css";
import { NavLink } from 'react-router-dom';
import { LogOut } from '../../../Actions';
import { useSelector, useDispatch } from 'react-redux';
import UserModel from "../../../Models/User";
import Vaction from "../../../Models/Vaction";

export interface ReduxState {
    Vacations: Vaction[]
    Logged: { isLogged: boolean, userInfo: UserModel };
}


function Header(): JSX.Element {
    const dispatch = useDispatch();
    const logged = useSelector((state: ReduxState) => state.Logged);


    return (
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark  expend-md">
            <button className="navbar-toggler  " type="button" aria-expanded="true" aria-label="Toggle navigation"></button>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                        <NavLink to="/Home" className="nav-link">Home</NavLink>
                    </li>

                    {logged.isLogged
                        &&
                        <li className="nav-item">
                            <div className="userWelcomeBack">Welcome back {logged.userInfo.user_name}!</div>
                        </li>
                    }

                    {logged.isLogged ?
                        null
                        :
                        <li className="nav-item">
                            <NavLink to="/Sign-Up" className="nav-link">Sign-Up</NavLink>
                        </li>
                    }

                    {logged.isLogged ?
                        null
                        :
                        <li className="nav-item">
                            <NavLink to="/Sign-In" className="nav-link">Sign-In</NavLink>
                        </li>
                    }

                    {logged.userInfo.is_admin ?
                        <li className="nav-item addVaction">
                            <NavLink to="/AddNewVaction" className="nav-link">Add Vaction</NavLink>
                        </li>
                        :
                        null
                    }
                    {logged.userInfo.is_admin ?
                        <li className="nav-item addVaction">
                            <NavLink to="/Stats" className="nav-link">Stats</NavLink>
                        </li>
                        :
                        null
                    }

                    {
                        logged.isLogged
                        &&
                        <li className="nav-item " >
                            <NavLink to="/Vactions" className="nav-link vactions">Vactions</NavLink>
                        </li>
                    }

                    {logged.isLogged
                        &&
                        <li className="nav-item float-right">
                            <nav className="nav-link LogOut" onClick={() => {
                                dispatch(LogOut());
                                localStorage.clear();
                            }}>Log-Out </nav>
                        </li>
                    }
                </ul>
            </div>
        </nav >
    );
}

export default Header;


