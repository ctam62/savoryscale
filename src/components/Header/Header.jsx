import './Header.scss';
import { Search } from '../Search/Search';
import { Filters } from '../Filters/Filters';

export const Header = () => {
    return (
        <header>
            <div className='header__logo'>SavoryScale</div>
            <h3 className='header__subheader'>Find a recipe and scale it</h3>
            <Search />
            <Filters />
        </header>
    )
}
