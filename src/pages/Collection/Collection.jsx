import './Collection.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardPagination } from '../../components/CardPagination/CardPagination';
import backIcon from '../../assets/icons/back-arrow.svg';


export const Collection = ({
    apiUrl,
    token,
    user,
    setUser,
    failedAuth,
    setFailedAuth,
    savedRecipes,
    setSavedRecipes,
    handleLikeButton,
    handleBackNagivation
}) => {
    const navigate = useNavigate();

    const sessionScaledRecipes = JSON.parse(sessionStorage.getItem("scaledRecipes")) || [];
    const [scaledRecipes, setScaledRecipes] = useState(sessionScaledRecipes);

    const removeSavedRecipes = () => {
        setSavedRecipes([]);
        sessionStorage.setItem("savedRecipes", JSON.stringify([]));

        const deleteSavedRecipes = async () => {
            try {
                await axios.delete(`${apiUrl}/api/recipe/user/${user.id}/saved_recipe`);
            } catch (error) {
                console.error(error);
            }
        }

        deleteSavedRecipes();
    };

    const removeScaledRecipes = () => {
        setScaledRecipes([]);
        sessionStorage.setItem("scaledRecipes", JSON.stringify([]));

        const deleteScaledRecipes = async () => {
            try {
                await axios.delete(`${apiUrl}/api/recipe/user/${user.id}/scaled_recipe`);
            } catch (error) {
                console.error(error);
            }
        }

        deleteScaledRecipes();
    };

    const handleRemoveButton = (recipeId) => {
        const deleteRecipe = async () => {
            try {
                await axios.delete(`${apiUrl}/api/recipe/user/${user.id}/scaled_recipe/${recipeId}`);
            } catch (error) {
                console.error(error);
            }
        }

        const filteredRecipes = scaledRecipes.filter(recipe => recipe.id !== recipeId)
        sessionStorage.setItem("scaledRecipes", JSON.stringify(filteredRecipes));
        setScaledRecipes([...filteredRecipes]);
        deleteRecipe();
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

        const fetchSavedRecipes = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/api/recipe/user/${user.id}/saved_recipe`);
                setSavedRecipes(data);
                sessionStorage.setItem("savedRecipes", JSON.stringify(data));
            } catch (error) {
                console.error(error);
            }
        };

        const fetchScaledRecipes = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/api/recipe/user/${user.id}/scaled_recipe`);
                setScaledRecipes(data);
                sessionStorage.setItem("scaledRecipes", JSON.stringify(data));
            } catch (error) {
                console.error(error);
            }
        };

        if (user) {
            fetchSavedRecipes();
            fetchScaledRecipes();
        }
    }, []);

    if (failedAuth) {
        return (
            <main className="collection">
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
            <main className="collection">
                <p>Loading...</p>
            </main>
        );
    }

    return (
        <main className="collection">

            <nav className="collection__nav">
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => handleBackNagivation(navigate)} />
            </nav>

            <section className="collection__section">
                <div className="collection__headings">
                    <h2 className="collection__header">My Collection</h2>
                    <h3 className="collection__subheader">Favourite Recipes</h3>
                    <div className="collection__info">
                        <p className="collection__subheader">{savedRecipes.length || 0} recipes</p>
                        <button className="collection__clear" onClick={removeSavedRecipes}>Clear Collection</button>
                    </div>
                </div>

                <div className="collection__group">
                    <CardPagination
                        results={savedRecipes}
                        savedRecipes={savedRecipes}
                        handleLikeButton={handleLikeButton}
                        handleRemoveButton={handleRemoveButton}
                        listSection="liked"
                    />
                </div>

                <div className="collection__headings">
                    <h3 className="collection__subheader">Scaled Recipes</h3>
                    <div className="collection__info">
                        <p className="collection__subheader">{scaledRecipes.length || 0} recipes</p>
                        <button className="collection__clear" onClick={removeScaledRecipes}>Clear Collection</button>
                    </div>
                </div>

                <div className="collection__group">
                    <CardPagination
                        results={scaledRecipes}
                        savedRecipes={savedRecipes}
                        handleLikeButton={handleLikeButton}
                        handleRemoveButton={handleRemoveButton}
                        listSection="scaled"
                    />
                </div>
            </section>

        </main>
    );
};
