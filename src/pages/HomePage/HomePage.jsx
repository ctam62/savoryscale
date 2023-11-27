import './HomePage.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Filters } from '../../components/Filters/Filters';
import { SearchResults } from '../../components/SearchResults/SearchResults';


export const HomePage = ({ apiUrl, externalApiUrl, apiKey, recipeData, setRecipeData, recipeList, handleLikeButton }) => {

    const [activeFilterId, setActiveFilterId] = useState(null);
    const [query, setQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState([]);

    const handleFilterSelect = (filterId) => {
        setActiveFilterId(filterId);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const offset = 0; // for page numbers
        const resultsLimit = 10;
        const mealTypeParam = `&type=${selectedFilter.join(",")}`
        const recipeParams = `addRecipeInformation=true&addRecipeNutrition=true${mealTypeParam}`;
        const searchParams = `&number=${resultsLimit}&${recipeParams}&offset=${offset}`

        try {
            const searchRecipes = async () => {
                const { data } = await axios.get(
                    `${externalApiUrl}/recipes/complexSearch?query=${query}${searchParams}&apiKey=${apiKey}`
                );
                setRecipeData(data);
                localStorage.setItem("searchResults", JSON.stringify(data));
            }

            // searchRecipes();
            setRecipeData(recipeData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setRecipeData(JSON.parse(localStorage.getItem("searchResults")) || recipeData);
    }, []);

    return (
        <main className="home">
            <h3 className="home__subheader">Find a recipe and scale it</h3>
            <form className="home__search" onSubmit={handleSubmit}><SearchBar defaultValue={query} query={query} setQuery={setQuery} /></form>
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
