import { useState } from 'react';


export const FilterButton = ({ type, selectedFilter, setSelectedFilter }) => {

    const [isActive, setIsActive] = useState(false);

    const handleActive = () => {
        setIsActive(prev => !prev);
        if (!isActive) {
            setSelectedFilter([...selectedFilter, type.name]);
        } else {
            const filtered = selectedFilter.filter(filter => filter !== type.name);
            setSelectedFilter(filtered);
        }
    };

    return (
        <button
            className={`filter__button ${isActive ? "filter__button--active" : ""}`}
            type="button"
            onClick={handleActive}
        >
            {type.name}
        </button>
    );
};