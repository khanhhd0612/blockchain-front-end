import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="pc-sidebar">
            <div className="navbar-wrapper">
                <div className="m-header">
                    <Link to="/" className="b-brand text-primary">
                        <img src="/assets/images/logo-dark.svg" className="img-fluid logo-lg" alt="logo"/>
                    </Link>
                </div>
                <div className="navbar-content">
                    <ul className="pc-navbar">
                        <li className="pc-item">
                            <Link to="/" className="pc-link">
                                <span className="pc-micon"><i className="ti ti-dashboard"></i></span>
                                <span className="pc-mtext">Trang chủ</span>
                            </Link>
                        </li>
                        <li className="pc-item">
                            <Link to="/add/election" className="pc-link">
                                <span className="pc-micon"><i className="ti ti-dashboard"></i></span>
                                <span className="pc-mtext">Thêm cuộc bầu cử</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default NavBar