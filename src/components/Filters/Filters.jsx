import './Filters.scss';

export const Filters = () => {
    const mealTypes = [
        { id: 1, name: "Breakfast" },
        { id: 2, name: "Snack" },
        { id: 3, name: "Appetizer" },
        { id: 4, name: "Main Course" },
        { id: 5, name: "Dessert" }
    ];

    return (
        <div className='filter'>
            {mealTypes.map((type) =>
                <button
                    className='filter__button'
                    key={type.id}>
                    {type.name}
                </button>
            )}
        </div>
    )
}

