import './ShoppingList.scss';
import { useNavigate } from 'react-router-dom';
import { GroceryItem } from '../../components/GroceryItem/GroceryItem';
import backIcon from '../../assets/icons/back-arrow.svg';
import { useEffect, useState } from 'react';


export const ShoppingList = ({ shopList, setShopList }) => {

    const navigate = useNavigate();
    const list = JSON.parse(localStorage.getItem("shopList")) || [];

    useEffect(() => {
        setShopList([...list]);
    }, []);

    const groupedList = Object.values(list.reduce((acc, curr) => {
        const { name, ...rest } = curr;
        if (acc[name]) {
            acc[name] = {
                ...acc[name],
                price: acc[name].price + curr.price,
                amount: {
                    metric: {
                        value: acc[name].amount.metric.value + curr.amount.metric.value,
                        unit: acc[name].amount.metric.unit
                    },
                    us: {
                        value: acc[name].amount.us.value + curr.amount.us.value,
                        unit: acc[name].amount.us.unit
                    }
                }
            };
        } else {
            acc[name] = { name, ...rest };
        }
        return acc;
    }, {}));

    const sumPrice = (objArray) => {
        return (objArray.map(item => item.price).reduce((a, b) => a + b, 0) / 100).toFixed(2);
    }

    const [totalPrice, setTotalPrice] = useState(sumPrice(groupedList));

    return (
        <main className="shopping">
            <nav className="recipe__nav">
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => navigate(-1)} />
            </nav>

            <section className="shopping__section">
                <h2 className="shopping__header">My Shopping List</h2>

                <ul className="shopping__list">
                    {list.length === 0 ?
                        <p className="shopping__status">There are no items in your shopping list</p> :
                        groupedList.map((item, index) =>
                            <GroceryItem
                                item={item}
                                key={index}
                                shopList={groupedList}
                                setShopList={setShopList}
                                setTotalPrice={setTotalPrice}
                                sumPrice={sumPrice}
                            />
                        )
                    }
                </ul>

                {shopList.length === 0 ? "" :
                    <div className="shopping__cost" >
                        <h3 className="shopping__cost-header">Total Est. Cost:</h3>
                        <p className="shopping__cost-price">${totalPrice}</p>
                    </div>
                }
            </section>
        </main>
    );
};
