import './SearchResults.scss';
import { CardGrid } from '../CardGrid/CardGrid';


export const SearchResults = ({ results, recipeList, handleLikeButton }) => {
    return (
        <section className="searchResults">
            <h3 className="searchResults__subheader">{results?.length} results</h3>
            <CardGrid
                results={results}
                title="title"
                image="image"
                cookTime="readyInMinutes"
                handleLikeButton={handleLikeButton}
                recipeList={recipeList}
                listSection="liked"
            />
        </section>
    );
};
