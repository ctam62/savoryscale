import './Filters.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FilterButton } from '../FilterButton/FilterButton';

export const Filters = ({ apiUrl, selectedFilter, setSelectedFilter }) => {

    const [mealTypes, setMealTypes] = useState([]);

    useEffect(() => {
        const fetchSearchFilters = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/api/mealtypes`);
                setMealTypes(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSearchFilters();
    }, []);


    return (
        <div className='filter'>
            {mealTypes.map((type) =>
                <FilterButton
                    type={type}
                    key={type.id}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                />
            )}
        </div>
    );
};

