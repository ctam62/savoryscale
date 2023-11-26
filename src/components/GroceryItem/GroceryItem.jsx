import './GroceryItem.scss';
import { useState } from 'react';
import removeIcon from '../../assets/icons/remove.svg';
import plusIcon from '../../assets/icons/plus.svg';
import minusIcon from '../../assets/icons/minus.svg';


export const GroceryItem = ({ item, shopList, setShopList, setTotalPrice, sumPrice }) => {

    const [quantity, setQuantity] = useState(item.amount.metric.value);

    const handleRemove = (itemId) => {
        const filteredList = shopList.filter(entry => entry.id !== itemId);
        setShopList([...filteredList]);
        setTotalPrice(sumPrice(filteredList));
        localStorage.setItem("shopList", JSON.stringify(filteredList));
    };

    const scalePrice = () => {
        const scaleFactor = (item.origPrice / item.amount.metric.value);
        return (quantity * scaleFactor);
    };

    const updatePrice = (sign, itemId) => {
        if (sign === "plus") {
            setQuantity(quantity + 1);
            const updateItem = shopList.find(ingredient => ingredient.id === itemId);
            updateItem.amount.metric.value = quantity;
            updateItem.price = scalePrice();
            setTotalPrice(sumPrice(shopList));
            localStorage.setItem("shopList", JSON.stringify(shopList));
        } else {
            setQuantity(quantity - 1);
            const updateItem = shopList.find(ingredient => ingredient.id === itemId);
            updateItem.amount.metric.value = quantity;
            updateItem.price = scalePrice();
            setTotalPrice(sumPrice(shopList));
            localStorage.setItem("shopList", JSON.stringify(shopList));
        }
    };

    return (
        <li className="shop__item item">
            <img className="shop__image item__item" src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`} alt={item.name} />
            <h3 className="item__name item__item">{item.name}</h3>
            <div className="item__quantity">
                <div className="shop__icons-container">
                    <img
                        className="shop__icons"
                        src={minusIcon}
                        alt="minus amount"
                        onClick={() => updatePrice("minus", item.id)}
                    />
                </div>
                <p className="item__value item__item">
                    {quantity.toFixed(2).replace(/\.00$/, '')}
                    <span className="item__value-unit"> {item.amount.metric.unit}</span>
                </p>
                <div className="shop__icons-container">
                    <img
                        className="shop__icons"
                        src={plusIcon}
                        alt="add amount"
                        onClick={() => updatePrice("plus", item.id)}
                    />
                </div>
            </div>
            <p className="item__price item__item">Est. ${(scalePrice() / 100).toFixed(2)}</p>
            <div className="item__remove-container item__item">
                <img
                    className="item__remove"
                    src={removeIcon}
                    alt="remove item"
                    onClick={() => handleRemove(item.id)}
                />
            </div>
        </li>
    )
}
