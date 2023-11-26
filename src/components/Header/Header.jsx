import './Header.scss';
import { useNavigate } from 'react-router-dom';
import shopIcon from '../../assets/icons/shopping-bag.svg';
import bookIcon from '../../assets/icons/book.svg';


export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header__logo" onClick={() => navigate('/')}>SavoryScale</div>
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
