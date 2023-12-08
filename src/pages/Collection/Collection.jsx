import './Collection.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardPagination } from '../../components/CardPagination/CardPagination';
import backIcon from '../../assets/icons/back-arrow.svg';


export const Collection = ({
    apiUrl,
    user,
    setUser,
    failedAuth,
    setFailedAuth,
    recipeList,
    setRecipeList,
    handleLikeButton
}) => {

    const navigate = useNavigate();

    const [scaledRecipes, setScaledRecipes] = useState([]);

    const removeLikedRecipes = () => {
        setRecipeList([]);
        localStorage.setItem("recipeList", JSON.stringify([]));
    };

    const removeScaledRecipes = () => {
        setScaledRecipes([]);

        const deleteScaledRecipes = async () => {
            try {
                await axios.delete(`${apiUrl}/api/scaled-recipes`);
            } catch (error) {
                console.error(error);
            }
        }

        deleteScaledRecipes();
    };

    const handleRemoveButton = (recipeId) => {
        const deleteRecipe = async () => {
            try {
                await axios.delete(`${apiUrl}/api/scaled-recipes/${recipeId}`);
            } catch (error) {
                console.error(error);
            }
        }

        setScaledRecipes(scaledRecipes.filter(recipe => recipe.id !== recipeId));
        deleteRecipe();
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
            });

        const fetchScaledRecipes = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/api/scaled-recipes`);
                setScaledRecipes(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchScaledRecipes();
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
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => navigate(-1)} />
            </nav>

            <section className="collection__section">
                <div className="collection__headings">
                    <h2 className="collection__header">My Collection</h2>
                    <h3 className="collection__subheader">Favourite Recipes</h3>
                    <div className="collection__info">
                        <p className="collection__subheader">{recipeList.length || 0} recipes</p>
                        <button className="collection__clear" onClick={removeLikedRecipes}>Clear Collection</button>
                    </div>
                </div>

                <div className="collection__group">
                    <CardPagination
                        results={recipeList}
                        recipeList={recipeList}
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
                        recipeList={recipeList}
                        handleLikeButton={handleLikeButton}
                        handleRemoveButton={handleRemoveButton}
                        listSection="scaled"
                    />
                </div>
            </section>

        </main>
    );
};
