import './HomePage.scss';
import { Search } from '../../components/Search/Search';
import { Filters } from '../../components/Filters/Filters';

export const HomePage = () => {
    return (
        <main className='home'>
            <h3 className='home__subheader'>Find a recipe and scale it</h3>
            <Search />
            <Filters />
        </main>
    );
};
