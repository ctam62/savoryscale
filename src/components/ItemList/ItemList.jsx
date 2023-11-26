import './ItemList.scss';
import { useState } from 'react';
import { Item } from '../Item/Item';

export const ItemList = ({ recipeItems, recipe, servings, activeCheckboxes, setActiveCheckboxes, setButtonDisabled, listType }) => {

    const [activeUnit, setActiveUnit] = useState("metric");
    const [checkStatus, setCheckStatus] = useState("Select all");
    const [checkAllClicked, setCheckAllClicked] = useState(false);

    const handelUnit = (unit) => {
        setActiveUnit(unit);
    }

    const handleCheckAll = () => {
        setCheckAllClicked(!checkAllClicked);
    };

    return (
        <section className="item-list">
            <div className="item-list__header">
                <h2 className="item-list__heading">{recipeItems.length} items</h2>
                <div className="item-list__actions">
                    {
                        listType === "ingredients" ? <div className="item-list__units">
                            <p className={`item-list__unit ${activeUnit === "metric" ? "item-list__unit--active-left" : ""}`} onClick={() => handelUnit("metric")}>metric</p>
                            <p className={`item-list__unit ${activeUnit === "us" ? "item-list__unit--active-right" : ""}`} onClick={() => handelUnit("us")}>us</p>
                        </div> : ""
                    }
                    <p
                        className={`item-list__check-all ${activeCheckboxes.length > 0 ? "item-list__check-all--active" : ""}`}
                        onClick={handleCheckAll}
                    >
                        {listType === "ingredients" ? checkStatus : ""}
                    </p>
                </div>
            </div>
            <ul className="item-list__list">
                {recipeItems.map((item, index) =>
                    <Item
                        item={item}
                        key={index}
                        itemId={index}
                        recipe={recipe}
                        servings={servings}
                        activeUnit={activeUnit}
                        listType={listType}
                        checkStatus={checkStatus}
                        setCheckStatus={setCheckStatus}
                        checkAllClicked={checkAllClicked}
                        setCheckAllClicked={setCheckAllClicked}
                        activeCheckboxes={activeCheckboxes}
                        setActiveCheckboxes={setActiveCheckboxes}
                        setButtonDisabled={setButtonDisabled}
                    />
                )}
            </ul>
        </section>
    );
};
