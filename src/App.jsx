import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import { ShoppingList } from './pages/ShoppingList/ShoppingList';
import { Collection } from './pages/Collection/Collection';


function App() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const spoonacularApiUrl = import.meta.env.VITE_APP_SPOONACULAR_API_URL;
  const spoonacularApiKey = import.meta.env.VITE_APP_SPOONACULAR_API_KEY;

  const [recipeData, setRecipeData] = useState([]);
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
      setRecipeList([...filteredList]);
      localStorage.setItem("recipeList", JSON.stringify(filteredList));
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
            element={
              <HomePage
                apiUrl={apiUrl}
                externalApiUrl={spoonacularApiUrl}
                apiKey={spoonacularApiKey}
                recipeData={recipeData}
                setRecipeData={setRecipeData}
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
              />
            }
          />
          <Route
            path='/recipe/:recipeId'
            element={
              <RecipePage
                apiUrl={spoonacularApiUrl}
                apiKey={spoonacularApiKey}
                recipeData={recipeData}
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
                shopList={shopList}
                setShopList={setShopList}
              />
            }
          />
          <Route
            path='/recipe/:recipeId/scaled'
            element={
              <RecipePage
                apiUrl={spoonacularApiUrl}
                apiKey={spoonacularApiKey}
                recipeData={recipeData}
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
                shopList={shopList}
                setShopList={setShopList}
              />
            }
          />
          <Route
            path='/shoppinglist'
            element={
              <ShoppingList
                apiUrl={apiUrl}
                shopList={shopList}
                setShopList={setShopList}
              />
            }
          />
          <Route
            path='/collection'
            element={
              <Collection
                apiUrl={apiUrl}
                recipeList={recipeList}
                setRecipeList={setRecipeList}
                handleLikeButton={handleLikeButton}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
