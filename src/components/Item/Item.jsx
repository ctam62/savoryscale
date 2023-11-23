import './Item.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Item = ({ item, itemId, checkStatus, setCheckStatus, checkAllClicked, activeCheckboxes, setActiveCheckboxes, setButtonDisabled }) => {

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const fetchIngredientImage = async () => {
            try {
                const { data } = await axios.get()
            } catch (error) {

            }
        }
    }, [item]);

    const removeId = (arr, element) => {
        const index = arr.indexOf(element);
        if (index > -1) {
            arr.splice(index, 1);
        }
    };

    const handleChecked = () => {
        if (!isChecked) {
            activeCheckboxes.push(itemId);
            setIsChecked(true);
        } else {
            removeId(activeCheckboxes, itemId);
            setIsChecked(false);
        }
        console.log(activeCheckboxes);
    };

    useEffect(() => {
        if (checkStatus === "Select all" && checkAllClicked) {
            activeCheckboxes.push(itemId);
            setIsChecked(true);
        } else {
            removeId(activeCheckboxes, itemId);
            setActiveCheckboxes([]);
            setIsChecked(false);
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
            <img className="item__image item__item" src={`https://spoonacular.com/cdn/ingredients_100x100/${item.name}.jpg`} alt={item.name} />
            <h3 className="item__name item__item">{item.name}</h3>
            <p className="item__amount item__item">{item.amount} {item.unit}</p>
            <input
                className={`item__checkbox item__item ${isChecked ? "item__checkbox--checked" : ""}`}
                id={itemId}
                type="checkbox"
                name="checkbox"
                onChange={handleChecked}
                value={item}
            />
        </li>
    )
}
