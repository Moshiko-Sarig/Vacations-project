import "./Menu.css";
import { NavLink } from 'react-router-dom';


function Menu(): JSX.Element {
    return (
        <nav>
                <ul className="sidebar">
                    <li><span><i className="fa fa-dashboard"></i></span><NavLink to="/Home">Home</NavLink></li>
                    <li><span><i className="fa fa-users"></i></span><NavLink to="/Sign-Up" className={"Nav"}>Sign-Up</NavLink></li>
                    <li><span><i className="fa fa-shopping-cart"></i></span><span>Products</span></li>
                    <li><span><i className="fa fa-bookmark"></i></span><span>Bookmarks</span></li>
                    <li><span><i className="fa fa-gear"></i></span><span>Settings</span></li>
                </ul>
        </nav>

    );
}

export default Menu;





