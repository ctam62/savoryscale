import './SearchResults.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardGrid } from '../CardGrid/CardGrid';
import recipeData from '../../data/spoonacular_recipes.json';

export const SearchResults = ({ query, recipeList, handleBookmark }) => {
    const [results, setResults] = useState([]);
    const apiUrl = import.meta.env.SPOONACULAR_API_URL;
    const apiKey = import.meta.env.SPOONACULAR_API_KEY;

    useEffect(() => {
        const searchRecipes = async () => {
            const { data } = await axios.get(`${apiUrl}/api/recipes/complexSearch?query=${query}&apiKey=${apiKey}`);
            setResults(data);
        }
        // searchRecipes();
        setResults(recipeData.results);
    }, [query]);

    return (
        <section className="searchResults">
            <CardGrid
                results={results}
                title="title"
                image="image"
                cookTime="readyInMinutes"
                handleBookmark={handleBookmark}
                recipeList={recipeList}
            />
        </section>
    );
};
