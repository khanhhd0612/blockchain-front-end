import Cookies from "js-cookie"
const Header = () => {
     const handleLogout = () => {
        Cookies.remove("token")
        window.location = "/login"
    }
    return (
        <header class="pc-header">
            <div class="header-wrapper">
                <div class="me-auto pc-mob-drp">
                    <ul class="list-unstyled">
                        <li class="pc-h-item pc-sidebar-collapse">
                            <a href="#" class="pc-head-link ms-0" id="sidebar-hide">
                                <i class="ti ti-menu-2"></i>
                            </a>
                        </li>
                        <li class="pc-h-item pc-sidebar-popup">
                            <a href="#" class="pc-head-link ms-0" id="mobile-collapse">
                                <i class="ti ti-menu-2"></i>
                            </a>
                        </li>
                        <li class="dropdown pc-h-item d-inline-flex d-md-none">
                            <a class="pc-head-link dropdown-toggle arrow-none m-0" data-bs-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="false">
                                <i class="ti ti-search"></i>
                            </a>
                            <div class="dropdown-menu pc-h-dropdown drp-search">
                                <form class="px-3">
                                    <div class="form-group mb-0 d-flex align-items-center">
                                        <i data-feather="search"></i>
                                        <input type="search" class="form-control border-0 shadow-none" placeholder="Search here. . ." />
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li class="pc-h-item d-none d-md-inline-flex">
                            <form class="header-search">
                                <i data-feather="search" class="icon-search"></i>
                                <input type="search" class="form-control" placeholder="Search here. . ." />
                            </form>
                        </li>
                    </ul>
                </div>
                <div class="ms-auto">
                    <ul class="list-unstyled">
                        <li class="dropdown pc-h-item header-user-profile">
                            <button className="btn btn-primary" onClick={handleLogout}>Đăng xuất</button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
export default Header