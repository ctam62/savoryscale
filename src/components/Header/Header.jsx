import './Header.scss';
import { Search } from '../Search/Search';

export const Header = () => {
    return (
        <header>
            <div className='header__logo'>SavoryScale</div>
            <h3 className='header__subheader'>Find a recipe and scale it</h3>
            <Search />
        </header>
    )
}
