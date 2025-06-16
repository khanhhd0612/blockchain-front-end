import Cookies from "js-cookie"
const Header = () => {
     const handleLogout = () => {
        Cookies.remove("token")
        window.location = "/login"
    }
    return (
        <header className="pc-header">
            <div className="header-wrapper">
                <div className="me-auto pc-mob-drp">
                    <ul className="list-unstyled">
                        <li className="pc-h-item pc-sidebar-collapse">
                            <a href="#" className="pc-head-link ms-0" id="sidebar-hide">
                                <i className="ti ti-menu-2"></i>
                            </a>
                        </li>
                        <li className="pc-h-item pc-sidebar-popup">
                            <a href="#" className="pc-head-link ms-0" id="mobile-collapse">
                                <i className="ti ti-menu-2"></i>
                            </a>
                        </li>
                        <li className="dropdown pc-h-item d-inline-flex d-md-none">
                            <a className="pc-head-link dropdown-toggle arrow-none m-0" data-bs-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="false">
                                <i className="ti ti-search"></i>
                            </a>
                            <div className="dropdown-menu pc-h-dropdown drp-search">
                                <form className="px-3">
                                    <div className="form-group mb-0 d-flex align-items-center">
                                        <i data-feather="search"></i>
                                        <input type="search" className="form-control border-0 shadow-none" placeholder="Search here. . ." />
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li className="pc-h-item d-none d-md-inline-flex">
                            <form className="header-search">
                                <i data-feather="search" className="icon-search"></i>
                                <input type="search" className="form-control" placeholder="Search here. . ." />
                            </form>
                        </li>
                    </ul>
                </div>
                <div className="ms-auto">
                    <ul className="list-unstyled">
                        <li className="dropdown pc-h-item header-user-profile">
                            <button className="btn btn-primary" onClick={handleLogout}>Đăng xuất</button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
export default Header