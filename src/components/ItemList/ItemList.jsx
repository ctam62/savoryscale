import './ItemList.scss';
import { useState } from 'react';
import { Item } from '../Item/Item';
import { UnitToggle } from '../UnitToggle/UnitToggle';


export const ItemList = ({ recipeItems, recipeServings, servings, activeCheckboxes, setActiveCheckboxes, setButtonDisabled, listType }) => {

    const [activeUnit, setActiveUnit] = useState("metric");
    const [checkStatus, setCheckStatus] = useState("Select all");
    const [checkAllClicked, setCheckAllClicked] = useState(false);

    const handleCheckAll = () => {
        setCheckAllClicked(!checkAllClicked);
    };

    return (
        <section className="item-list">
            <div className="item-list__header">
                <h2 className="item-list__heading">{recipeItems?.length || 0} items</h2>
                <div className="item-list__actions">
                    {
                        listType === "ingredients" ? <UnitToggle activeUnit={activeUnit} setActiveUnit={setActiveUnit} /> : ""
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
                {recipeItems?.map((item, index) =>
                    <Item
                        item={item}
                        key={index}
                        itemId={index}
                        recipeServings={recipeServings}
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
