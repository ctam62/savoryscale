import './SearchResults.scss';
import { CardPagination } from '../CardPagination/CardPagination';


export const SearchResults = ({ results, savedRecipes, handleLikeButton, handleRemoveButton }) => {
    return (
        <section className="searchResults">
            <h3 className="searchResults__subheader">{results?.length || 0} results</h3>

            <CardPagination
                results={results}
                savedRecipes={savedRecipes}
                handleLikeButton={handleLikeButton}
                handleRemoveButton={handleRemoveButton}
                listSection="liked"
            />
        </section>
    );
};
