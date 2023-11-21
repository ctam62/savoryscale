import './Header.scss';
import searchIcon from './../../src/assets/icons/search.svg';

export const Header = () => {
    return (
        <header>
            <div className='header__logo'>SavoryScale</div>
            <div className="header__search">
                <img className='header__search-icon' src={searchIcon} alt="search icon" />
                <input className='header__search-input' type='text' />
            </div>
        </header>
    )
}
