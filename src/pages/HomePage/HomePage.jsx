import './HomePage.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Filters } from '../../components/Filters/Filters';
import { SearchResults } from '../../components/SearchResults/SearchResults';
import { CardGrid } from '../../components/CardGrid/CardGrid';

export const HomePage = ({ recipeList, handleLikeButton }) => {

    const [popularRecipes, setPopularRecipes] = useState([]);

    useEffect(() => {
        const fetchRecommendedRecipes = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/recipes/popular`)
        };

        // fetchRecommendedRecipes();
    }, []);

    return (
        <main className="home">
            <h3 className="home__subheader">Find a recipe and scale it</h3>
            <SearchBar />
            <Filters />
            <CardGrid
                results={popularRecipes}
                title="title"
                image="image"
                handleLikeButton={handleLikeButton}
                recipeList={recipeList}
            />
            <SearchResults recipeList={recipeList} handleLikeButton={handleLikeButton} />
        </main>
    );
};
