import './HomePage.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Filters } from '../../components/Filters/Filters';
import { SearchResults } from '../../components/SearchResults/SearchResults';
import { ConfirmationAlert } from '../../components/ConfirmationAlert/ConfirmationAlert';


export const HomePage = ({
    apiUrl,
    externalApiUrl,
    apiKey,
    user,
    setUser,
    failedAuth,
    setFailedAuth,
    recipeList,
    handleLikeButton,
    open,
    handleClose,
    calculateEndpointUsage,
    handleUsageLimit
}) => {

    const navigate = useNavigate();

    const [recipeData, setRecipeData] = useState(null);

    const [activeFilterId, setActiveFilterId] = useState(null);
    const [query, setQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState([]);

    const handleFilterSelect = (filterId) => {
        setActiveFilterId(filterId);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const offset = 0;
        const resultsLimit = 50;
        const mealTypeParam = `&type=${selectedFilter.join(",")}`
        const recipeParams = `addRecipeNutrition=true${mealTypeParam}`;
        const searchParams = `&number=${resultsLimit}&${recipeParams}&offset=${offset}`

        try {
            const searchRecipes = async () => {
                const { data } = await axios.get(
                    `${externalApiUrl}/recipes/complexSearch?query=${query}${searchParams}&apiKey=${apiKey}`
                );

                data.results.map(entry => entry.recipeId = entry.id);
                setRecipeData(data);
                localStorage.setItem("searchResults", JSON.stringify(data));
                calculateEndpointUsage(1, data.results.length);
            }

            searchRecipes();
        } catch (error) {
            if (error.response.status === 402) {
                handleUsageLimit();
            }
            console.error(error);
        }
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
                console.error(error);
                setFailedAuth(true);
            });

        setRecipeData(JSON.parse(localStorage.getItem("searchResults")));
    }, []);

    if (failedAuth) {
        return (
            <main className="home">
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
            <main className="home">
                <p>Loading...</p>
            </main>
        );
    }

    if (!recipeData) {
        return null;
    }

    return (
        <main className="home">
            <ConfirmationAlert
                open={open}
                handleClose={handleClose}
                message="You've successfully logged in!"
                error={false}
                redirect={false}
            />

            <h3 className="home__subheader">Find a recipe and scale it</h3>

            <form className="home__search" onSubmit={handleSubmit}>
                <SearchBar defaultValue={query} query={query} setQuery={setQuery} />
            </form>

            <Filters
                apiUrl={apiUrl}
                handleFilterSelect={handleFilterSelect}
                activeFilterId={activeFilterId}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />

            <SearchResults
                results={recipeData.results}
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
            />
        </main>
    );
};
