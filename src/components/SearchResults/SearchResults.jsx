import './SearchResults.scss';
import { CardPagination } from '../CardPagination/CardPagination';


export const SearchResults = ({ results, recipeList, handleLikeButton, handleRemoveButton }) => {
    return (
        <section className="searchResults">
            <h3 className="searchResults__subheader">{results?.length || 0} results</h3>

            <CardPagination
                results={results}
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
                handleRemoveButton={handleRemoveButton}
                listSection="liked"
            />
        </section>
    );
};
