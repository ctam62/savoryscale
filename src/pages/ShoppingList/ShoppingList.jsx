import './ShoppingList.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroceryItem } from '../../components/GroceryItem/GroceryItem';
import { UnitToggle } from '../../components/UnitToggle/UnitToggle';
import backIcon from '../../assets/icons/back-arrow.svg';


export const ShoppingList = ({
    apiUrl,
    token,
    user,
    setUser,
    failedAuth,
    setFailedAuth,
    shopList,
    setShopList,
    handleBackNagivation

}) => {
    const [activeUnit, setActiveUnit] = useState("metric");
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    const groupedList = Object.values(shopList.reduce((acc, curr) => {
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
        sessionStorage.setItem("shopList", JSON.stringify(newList));
    };

    const updatePrice = (sign, index) => {
        const newList = [...shopList];

        const updateItem = async (itemData) => {
          const updatedItem = { "amount": itemData.amount};

          try {
              await axios.patch(`${apiUrl}/api/shopping/user/${user.id}/item/${itemData.id}`, updatedItem);
          } catch (error) {
              console.error(error);
          }
        };

        if (sign === "plus") {
            newList[index].amount.metric.value++;
            scalePrice(newList[index].amount.metric.value, index);
            setShopList(newList);
            calculateTotal();
            updateItem(newList[index]);
        } else {
            newList[index].amount.metric.value--;
            scalePrice(newList[index].amount.metric.value, index);
            setShopList(newList);
            calculateTotal();
            updateItem(newList[index]);
        }

        sessionStorage.setItem("shopList", JSON.stringify(newList));
    };

    const emptyList = () => {
        setShopList([]);
        sessionStorage.setItem("shopList", JSON.stringify([]));

        const deleteShoppingList = async () => {
            try {
                await axios.delete(`${apiUrl}/api/shopping/user/${user.id}`);
            } catch (error) {
                console.error(error);
            }
        }

        deleteShoppingList();
    };


    useEffect(() => {
        if (!token) {
            return setFailedAuth(true);
        }

        axios
            .get(`${apiUrl}/api/user/current`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
                setFailedAuth(true);
            });

        const fetchShoppingList = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/api/shopping/user/${user.id}`);
                setShopList([...data]);
                sessionStorage.setItem("shopList", JSON.stringify(data));
            } catch (error) {
                console.error(error);
            }
        }

        if (user) {
            fetchShoppingList();
        }

    }, [token]);

    useEffect(() => {
        calculateTotal();
    }, [shopList]);


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

    return (
        <main className="shopping">
            <nav className="shopping__nav">
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => handleBackNagivation(navigate)} />
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
                    {shopList.length === 0 ?
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
                                apiUrl={apiUrl}
                                user={user}
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
