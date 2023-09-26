
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../../Routing/Routing";
import "./Layout.css";
import Home from "../../Vacations/Vacations";


function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <main>
                <Routing />
            </main>
        </div>
    );
}

export default Layout;
