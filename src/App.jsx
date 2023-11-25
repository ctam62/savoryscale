import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import { ShoppingList } from './pages/ShoppingList/ShoppingList';


function App() {
  const [recipeList, setRecipeList] = useState([]);
  const [shopList, setShopList] = useState([]);

  const handleLikeButton = recipe => {
    const localStorageListRaw = localStorage.getItem("recipeList") || "[]";
    const localStorageList = JSON.parse(localStorageListRaw);

    if (!localStorageList.map(entry => entry.id).includes(recipe.id)) {
      localStorageList.push(recipe);
      setRecipeList([...localStorageList]);
      localStorage.setItem("recipeList", JSON.stringify(localStorageList));
    } else {
      const filteredList = localStorageList.filter(entry => entry.id !== recipe.id);
      localStorage.setItem("recipeList", JSON.stringify(filteredList));
      setRecipeList([...filteredList]);
    }
  }

  useEffect(() => {
    const localStorageListRaw = localStorage.getItem("recipeList");
    localStorageListRaw && setRecipeList(JSON.parse(localStorageListRaw));
  }, []);


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<HomePage recipeList={recipeList} handleLikeButton={handleLikeButton} />} />
          <Route
            path='/recipe/:recipeId'
            element={
              <RecipePage
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
                shopList={shopList}
                setShopList={setShopList}
              />}
          />
          <Route
            path='/shoppinglist'
            element={<ShoppingList shopList={shopList} setShopList={setShopList} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
