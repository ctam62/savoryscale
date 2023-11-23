import './ItemList.scss';
import { useState } from 'react';
import { Item } from '../Item/Item';

export const ItemList = ({ recipe, setButtonDisabled }) => {

    const [activeCheckboxes, setActiveCheckboxes] = useState([]);
    const [checkStatus, setCheckStatus] = useState("Select all");
    const [checkAllClicked, setCheckAllClicked] = useState(false);

    const handleCheckAll = () => {
        setCheckAllClicked(!checkAllClicked);
    };

    return (
        <section className="item-list">
            <div className="item-list__header">
                <h2 className="item-list__heading">{recipe.nutrition.ingredients.length} items</h2>
                <p
                    className={`item-list__check-all ${activeCheckboxes.length > 0 ? "item-list__check-all--active" : ""}`}
                    onClick={handleCheckAll}
                >
                    {checkStatus}
                </p>
            </div>
            <ul className="item-list__list">
                {recipe.nutrition.ingredients.map((item, index) =>
                    <Item
                        item={item}
                        key={index}
                        itemId={index}
                        checkStatus={checkStatus}
                        setCheckStatus={setCheckStatus}
                        checkAllClicked={checkAllClicked}
                        activeCheckboxes={activeCheckboxes}
                        setActiveCheckboxes={setActiveCheckboxes}
                        setButtonDisabled={setButtonDisabled}
                    />
                )}
            </ul>
        </section>
    )
}
