import './CardGrid.scss';
import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';

export const CardGrid = ({ results, title, image, cookTime, handleBookmark, recipeList }) => {
    const [quantityToShow, setQuantityToShow] = useState(1);

    useEffect(() => {
        const addToQuantityShowing = (duration) => {
            if (quantityToShow < results.length) {
                setTimeout(() => {
                    setQuantityToShow(prev => prev + 1);
                    addToQuantityShowing(duration * 0.95);
                }, Math.max(duration, 50));
            }
        }
        addToQuantityShowing(20);
    }, [results]);

    return (
        <section className="grid">
            <div className="grid__grid">
                {results.map(result =>
                    <Card
                        key={result.id}
                        id={result.id}
                        title={result[title]}
                        image={result[image]}
                        cookTime={result[cookTime]}
                        handleBookmark={() => handleBookmark(result)}
                        inCollection={recipeList.map(recipe => recipe.id).includes(result.id)}
                    />
                ).slice(0, quantityToShow)}
                {quantityToShow < results.length && [...Array(results.length - quantityToShow).keys()]
                    .map(i => <div key={i} className="grid__placeholder"></div>)}
            </div>
        </section>
    );
};