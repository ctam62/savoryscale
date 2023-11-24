import './Item.scss';
import { useEffect, useState } from 'react';
import { formatQuantity } from 'format-quantity';

export const Item = ({
    item,
    itemId,
    recipe,
    servings,
    activeUnit,
    listType,
    checkStatus,
    setCheckStatus,
    checkAllClicked,
    setCheckAllClicked,
    activeCheckboxes,
    setActiveCheckboxes,
    setButtonDisabled }) => {

    const scale = (origValue) => {
        const scaleFactor = (origValue / recipe.servings);
        return formatQuantity((servings * scaleFactor).toFixed(2).replace(/\.00$/, ''));
    }

    const [isChecked, setIsChecked] = useState(false);

    const removeId = (arr, element) => {
        const index = arr.indexOf(element);
        if (index > -1) {
            arr.splice(index, 1);
        }
    };

    const handleChecked = (event) => {
        // push grocerylist to state
        console.log(event.target.value);

        if (!isChecked) {
            activeCheckboxes.push(itemId);
            setIsChecked(true);
        } else {
            removeId(activeCheckboxes, itemId);
            setIsChecked(false);
            setCheckAllClicked(false);
        }
    };

    useEffect(() => {
        if (checkStatus === "Select all" && checkAllClicked) {
            activeCheckboxes.push(itemId);
            setIsChecked(true);
        } else {
            removeId(activeCheckboxes, itemId);
            setActiveCheckboxes([]);
            setIsChecked(false);
            setCheckAllClicked(false);
        }

    }, [checkAllClicked]);

    useEffect(() => {
        if (activeCheckboxes.length === 0) {
            setIsChecked(false);
            setCheckStatus("Select all");
            setButtonDisabled(true);
        } else {
            setCheckStatus("Unselect all");
            setButtonDisabled(false);
        }
    }, [isChecked]);

    return (
        <li className="item">
            <img className="item__image item__item" src={`https://spoonacular.com/cdn/${listType}_100x100/${item.image}`} alt={item.name} />
            <h3 className="item__name item__item">{item.name}</h3>
            {listType === "ingredients" ? <p className="item__amount item__item">{scale(item.amount[activeUnit].value)} {item.amount[activeUnit].unit}</p> : ""}
            <input
                className={`item__checkbox item__item ${isChecked ? "item__checkbox--checked" : ""}`}
                type="checkbox"
                name={item.name}
                onChange={(event) => handleChecked(event)}
                value={item.name}
            />
        </li>
    );
};
