import './GroceryItem.scss';
import { formatQuantity } from 'format-quantity';
import removeIcon from '../../assets/icons/remove.svg';
import plusIcon from '../../assets/icons/plus.svg';
import minusIcon from '../../assets/icons/minus.svg';


export const GroceryItem = ({ index, item, activeUnit, shopList, setShopList, updatePrice, calculateTotal }) => {

    const handleRemove = (itemId) => {
        const filteredList = shopList.filter(entry => entry.id !== itemId);
        setShopList([...filteredList]);
        calculateTotal();
        localStorage.setItem("shopList", JSON.stringify(filteredList));
    };

    return (
        <li className="shop__item item">
            <img
                className="shop__image item__item"
                src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                alt={item.name}
            />
            <h3 className="item__name item__item">{item.name}</h3>

            <div className="item__quantity">
                <div className="shop__icons-container" onClick={() => updatePrice("minus", index)}>
                    <img
                        className="shop__icons"
                        src={minusIcon}
                        alt="minus amount"
                    />
                </div>
                <p className="item__value item__item">
                    {formatQuantity(item.amount[activeUnit].value?.toFixed(2).replace(/\.00$/, ''))}
                    <span className="item__value-unit"> {item.amount[activeUnit].unit}</span>
                </p>
                <div className="shop__icons-container" onClick={() => updatePrice("plus", index)}>
                    <img
                        className="shop__icons"
                        src={plusIcon}
                        alt="add amount"
                    />
                </div>
            </div>

            <p className="item__price item__item">Est. ${(item.price / 100).toFixed(2)}</p>

            <div className="item__remove-container item__item">
                <img
                    className="item__remove"
                    src={removeIcon}
                    alt="remove item"
                    onClick={() => handleRemove(item.id)}
                />
            </div>
        </li>
    );
};
