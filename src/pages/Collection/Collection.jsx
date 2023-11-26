import './Collection.scss';
import { useNavigate } from 'react-router-dom';
import { CardGrid } from '../../components/CardGrid/CardGrid';
import backIcon from '../../assets/icons/back-arrow.svg';

export const Collection = ({ recipeList, handleLikeButton }) => {
    const navigate = useNavigate();

    return (
        <main className="collection">

            <nav className="recipe__nav">
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => navigate(-1)} />
            </nav>

            <section className="collection__section">
                <h2 className="collection__header">My Collection</h2>

                <CardGrid
                    results={recipeList}
                    title="title"
                    image="image"
                    cookTime="readyInMinutes"
                    handleLikeButton={handleLikeButton}
                    recipeList={recipeList}
                />
            </section>

        </main>
    );
};
