import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav class="pc-sidebar">
            <div class="navbar-wrapper">
                <div class="m-header">
                    <Link to="/" class="b-brand text-primary">
                        <img src="../../assets/images/logo-dark.svg" class="img-fluid logo-lg" alt="logo"/>
                    </Link>
                </div>
                <div class="navbar-content">
                    <ul class="pc-navbar">
                        <li class="pc-item">
                            <Link to="/" class="pc-link">
                                <span class="pc-micon"><i class="ti ti-dashboard"></i></span>
                                <span class="pc-mtext">Trang chủ</span>
                            </Link>
                        </li>
                        <li class="pc-item">
                            <Link to="/add/election" class="pc-link">
                                <span class="pc-micon"><i class="ti ti-dashboard"></i></span>
                                <span class="pc-mtext">Thêm cuộc bầu cử</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default NavBar