import './RecipeSubNav.scss';
import { useState, useEffect } from 'react';

export const RecipeSubNav = ({ navItems, setActiveTab }) => {

    const [item1, item2] = navItems;
    const [tab, setTab] = useState(item1);

    useEffect(() => {
        setActiveTab(tab);
    }, [tab]);

    return (
        <nav className="recipe-nav">
            <ul className="recipe-nav__list">
                <li
                    className={`recipe-nav__list-item ${tab === item1 ? "recipe-nav__list-item--active" : ""}`}
                    id={item1}
                    onClick={() => setTab(item1)}
                >
                    {item1.replace(item1[0], item1[0].toUpperCase())}
                </li>
                <li
                    className={`recipe-nav__list-item ${tab === item2 ? "recipe-nav__list-item--active" : ""}`}
                    id={item2}
                    onClick={() => setTab(item2)}
                >
                    {item2.replace(item2[0], item2[0].toUpperCase())}
                </li>
            </ul>
        </nav>
    );
};
