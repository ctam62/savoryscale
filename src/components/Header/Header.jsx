import './Header.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/justice-scale1.svg';
import bookIcon from '../../assets/icons/book.svg';
import shopIcon from '../../assets/icons/shopping-cart.svg';
import logoutIcon from '../../assets/icons/logout1.svg';


export const Header = ({ setUser, setFailedAuth }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    if (pathname === "/welcome" || pathname === "/login" || pathname === '/signup') {
        return (null);
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
        setFailedAuth(true);
        navigate('/')
    };

    return (
        <header className="header">
            <div className="header__logo" onClick={handleLogout}>
                <img src={logo} alt="savory scale logo" className="header__logo-img" />
                <p className="header__logo-text">SavoryScale</p>
            </div>
            <nav className="header__nav">
                <img
                    className="header__nav-link"
                    src={logoutIcon}
                    alt="logout"
                    onClick={() => navigate('/welcome')}
                />
                <img
                    className="header__nav-link"
                    src={shopIcon}
                    alt="shopping bag"
                    onClick={() => navigate('/shoppinglist')}
                />
                <img
                    className="header__nav-link"
                    src={bookIcon}
                    alt="saved recipe book"
                    onClick={() => navigate('/collection')}
                />
            </nav>
        </header>
    );
};
