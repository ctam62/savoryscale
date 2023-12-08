import './ShoppingList.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroceryItem } from '../../components/GroceryItem/GroceryItem';
import { UnitToggle } from '../../components/UnitToggle/UnitToggle';
import backIcon from '../../assets/icons/back-arrow.svg';


export const ShoppingList = ({
    apiUrl,
    user,
    setUser,
    failedAuth,
    setFailedAuth,
    shopList,
    setShopList
}) => {

    const [activeUnit, setActiveUnit] = useState("metric");
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();
    const list = JSON.parse(localStorage.getItem("shopList")) || [];

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

    const calculateTotal = () => {
        const totalPrice = (shopList.map(ingredient => ingredient.price).reduce((total, item) => total + item, 0) / 100).toFixed(2);
        setTotalPrice(totalPrice);
    };

    const scalePrice = (value, index) => {
        const newList = [...shopList];
        const scaleFactor = (newList[index].origPrice / newList[index].amount.metric.origValue);
        newList[index].price = value * scaleFactor;
        calculateTotal();
        localStorage.setItem("shopList", JSON.stringify(newList));
    };

    const updatePrice = (sign, index) => {
        const newList = [...shopList];

        if (sign === "plus") {
            newList[index].amount.metric.value++;
            scalePrice(newList[index].amount.metric.value, index);
            setShopList(newList);
            calculateTotal();
        } else {
            newList[index].amount.metric.value--;
            scalePrice(newList[index].amount.metric.value, index);
            setShopList(newList);
            calculateTotal();
        }

        localStorage.setItem("shopList", JSON.stringify(newList));
    };

    const emptyList = () => {
        setShopList([]);
        localStorage.setItem("shopList", JSON.stringify([]));
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            return setFailedAuth(true);
        }

        axios
            .get(`${apiUrl}/api/users/current`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                setFailedAuth(true);
                console.log(error);
            });

        setShopList([...list]);
    }, []);

    if (failedAuth) {
        return (
            <main className="shopping">
                <section className="home__message">
                    <p>You must be logged in to see this page.</p>
                    <button
                        className="login-form__button"
                        type="button"
                        onClick={() => navigate("/login")}>
                        Login
                    </button>
                </section>
            </main>
        );
    }

    if (user === null) {
        return (
            <main className="shopping">
                <p>Loading...</p>
            </main>
        );
    }

    useEffect(() => {
        calculateTotal();
    }, [shopList]);

    return (
        <main className="shopping">
            <nav className="shopping__nav">
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => navigate(-1)} />
            </nav>

            <section className="shopping__section">
                <div className="shopping__headings">
                    <h2 className="shopping__header">My Shopping List</h2>
                    <div className="shopping__info">
                        <p className="shopping__subheader">{groupedList.length} items</p>
                        <button className="shopping__empty" onClick={emptyList}>Empty List</button>
                    </div>
                </div>

                <UnitToggle activeUnit={activeUnit} setActiveUnit={setActiveUnit} />

                <ul className="shopping__list">
                    {list.length === 0 ?
                        <p className="shopping__status">There are no items in your shopping list</p> :
                        groupedList.map((item, index) =>
                            <GroceryItem
                                item={item}
                                key={index}
                                index={index}
                                activeUnit={activeUnit}
                                shopList={groupedList}
                                setShopList={setShopList}
                                scalePrice={scalePrice}
                                updatePrice={updatePrice}
                                calculateTotal={calculateTotal}
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
