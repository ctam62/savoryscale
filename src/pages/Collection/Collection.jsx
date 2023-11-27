import './Collection.scss';
import { useNavigate } from 'react-router-dom';
import { CardGrid } from '../../components/CardGrid/CardGrid';
import backIcon from '../../assets/icons/back-arrow.svg';

export const Collection = ({ recipeList, setRecipeList, handleLikeButton }) => {
    const navigate = useNavigate();

    const removeAll = () => {
        setRecipeList([]);
        localStorage.setItem("recipeList", JSON.stringify([]));
    };

    return (
        <main className="collection">

            <nav className="collection__nav">
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => navigate(-1)} />
            </nav>

            <section className="collection__section">
                <div className="collection__headings">
                    <h2 className="collection__header">My Collection</h2>
                    <div className="collection__info">
                        <p className="collection__subheader">{recipeList.length} recipes</p>
                        <button className="collection__clear" onClick={removeAll}>Clear Collection</button>
                    </div>
                </div>

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
