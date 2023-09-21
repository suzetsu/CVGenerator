import { Outlet } from "react-router-dom"
import Info from "./CustomerDetails/info"

const Layout = () => {
    return (
        <div className="App">
            <Outlet />
        </div>
    )
}

export default Layout