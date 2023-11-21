import './Search.scss';
import searchIcon from '../../assets/icons/search.svg';

export const Search = () => {
    return (
        <div className='search'>
            <img className='search-icon' src={searchIcon} alt='search icon' />
            <input
                className='search-input'
                type='text'
                name='search'
                placeholder='What are you craving?' />
        </div>
    )
}
