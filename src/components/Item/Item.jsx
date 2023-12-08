import './Item.scss';
import { useEffect, useState } from 'react';
import { formatQuantity } from 'format-quantity';


export const Item = ({
    item,
    itemId,
    recipeServings,
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

    const scaleWithFormater = (origValue) => {
        const scaleFactor = (origValue / recipeServings);
        return formatQuantity((servings * scaleFactor).toFixed(2).replace(/\.00$/, '')) || 0;
    }

    const scale = (origValue) => {
        const scaleFactor = (origValue / recipeServings);
        return servings * scaleFactor;
    }

    const [isChecked, setIsChecked] = useState(false);

    const removeId = (arr, element) => {
        const index = arr.indexOf(element);
        if (index > -1) {
            arr.splice(index, 1);
        }
    };

    const handleChecked = (event) => {
        if (!isChecked) {
            activeCheckboxes.push(event.target.value);
            setIsChecked(true);
        } else {
            removeId(activeCheckboxes, event.target.value);
            setIsChecked(false);
            setCheckAllClicked(false);
        }
    };

    const handleServingChange = () => {
        if (listType === "ingredients") {
            const storedData = JSON.parse(localStorage.getItem("ingredients"));
            if (Object.keys(storedData).length !== 0) {
                storedData.ingredients[itemId].amount.metric.value = scale(item.amount.metric.value);
                storedData.ingredients[itemId].amount.us.value = scale(item.amount.us.value);
                storedData.ingredients[itemId].price = scale(item.price);
                localStorage.setItem("ingredients", JSON.stringify(storedData));
            }
        }
    };

    useEffect(() => {
        handleServingChange();
    }, [servings]);

    useEffect(() => {
        if (checkStatus === "Select all" && checkAllClicked) {
            activeCheckboxes.push(item.name);
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
            <img
                className="item__image item__item"
                src={`https://spoonacular.com/cdn/${listType}_100x100/${item.image}`}
                alt={item.name}
            />
            <h3 className="item__name item__item">{item.name}</h3>
            {listType === "ingredients" ?
                <p className="item__amount item__item">
                    {scaleWithFormater(item.amount[activeUnit].value)} {item.amount[activeUnit].unit}</p>
                : ""
            }
            {listType === "ingredients" ?
                <input
                    className={`item__checkbox item__item ${isChecked ? "item__checkbox--checked" : ""}`}
                    type="checkbox"
                    name={item.name}
                    onChange={(event) => handleChecked(event)}
                    value={item.name}
                /> : ""
            }
        </li>
    );
};
