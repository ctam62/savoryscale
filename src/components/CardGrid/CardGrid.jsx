import './CardGrid.scss';
import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';


export const CardGrid = ({
    results,
    title,
    image,
    cookTime,
    handleLikeButton,
    handleRemoveButton,
    savedRecipes,
    listSection,
    itemsPerPage,
    page
}) => {
    const [quantityToShow, setQuantityToShow] = useState(1);

    useEffect(() => {
        const addToQuantityShowing = (duration) => {
            if (quantityToShow < results?.length) {
                setTimeout(() => {
                    setQuantityToShow(prev => prev + 1);
                    addToQuantityShowing(duration * 0.95);
                }, Math.max(duration, 100));
            }
        }
        addToQuantityShowing(50);
    }, [results]);

    return (
        <section className="grid">
            <div className="grid__grid">
                {results?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map(result =>
                        <Card
                            key={result.id}
                            id={result.id}
                            result={result}
                            title={result[title]}
                            image={result[image]}
                            cookTime={result[cookTime]}
                            handleLikeButton={() => handleLikeButton(result)}
                            handleRemoveButton={() => handleRemoveButton(result.id)}
                            inCollection={savedRecipes.map(recipe => recipe.recipeId).includes(result.recipeId)}
                            listSection={listSection}
                        />
                    ).slice(0, quantityToShow)}
                {quantityToShow < results?.length && [...Array(results?.length - quantityToShow).keys()]
                    .map(index => <div key={index} className="grid__placeholder"></div>)}
            </div>
        </section>
    );
};
