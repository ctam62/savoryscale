import './Header.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/justice-scale1.svg';
import bookIcon from '../../assets/icons/book.svg';
import shopIcon from '../../assets/icons/shopping-cart.svg';
import logoutIcon from '../../assets/icons/logout.svg';
import loginIcon from '../../assets/icons/login.svg';


export const Header = ({ user, setUser, setFailedAuth, setOpen }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    if (pathname === "/" || pathname === "/login" || pathname === '/signup' || pathname.includes('password')) {
        return (null);
    }

    const handleLogout = () => {
        sessionStorage.clear();
        setUser(null);
        setFailedAuth(true);
        setOpen(false);
        navigate('/');
    };

    const handleNavigate = (path) => {
        navigate(path)
        setOpen(false);
    };

    return (
        <header className="header">
            <div className="header__logo" onClick={() => handleNavigate('/home')}>
                <img src={logo} alt="savory scale logo" className="header__logo-img" />
                <p className="header__logo-text">SavoryScale</p>
            </div>
            <nav className="header__nav">
                {user ?
                    <img
                        className="header__nav-link"
                        src={logoutIcon}
                        alt="logout"
                        onClick={handleLogout}
                    /> :
                    <img
                        className="header__nav-link"
                        src={loginIcon}
                        alt="login"
                        onClick={() => handleNavigate('/login')}
                    />}
                <img
                    className="header__nav-link"
                    src={shopIcon}
                    alt="shopping bag"
                    onClick={() => handleNavigate('/shoppinglist')}
                />
                <img
                    className="header__nav-link"
                    src={bookIcon}
                    alt="saved recipe book"
                    onClick={() => handleNavigate('/collection')}
                />
            </nav>
        </header>
    );
};
