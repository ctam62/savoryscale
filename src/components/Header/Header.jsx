import './Header.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import shopIcon from '../../assets/icons/shopping-cart.svg';
import bookIcon from '../../assets/icons/book.svg';
import logo from '../../assets/logos/justice-scale1.svg';


export const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    if (pathname === "/welcome" || pathname === "/login" || pathname === '/signup') {
        return (null);
    }

    return (
        <header className="header">
            <div className="header__logo" onClick={() => navigate('/')}>
                <img src={logo} alt="savory scale logo" className="header__logo-img" />
                SavoryScale
            </div>
            <nav className="header__nav">
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
