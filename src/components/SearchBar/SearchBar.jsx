import './SearchBar.scss';
import searchIcon from '../../assets/icons/search.svg';

export const SearchBar = () => {
    return (
        <div className='search'>
            <img className='search-icon' src={searchIcon} alt='search icon' />
            <input
                className='search-input'
                type='text'
                name='search'
                placeholder='What are you craving?' />
        </div>
    );
};
