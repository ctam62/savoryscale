import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import { ShoppingList } from './pages/ShoppingList/ShoppingList';
import { Collection } from './pages/Collection/Collection';


function App() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const spoonacularApiUrl = import.meta.env.VITE_APP_SPOONACULAR_API_URL;
  const spoonacularApiKey = import.meta.env.VITE_APP_SPOONACULAR_API_KEY;

  const usageLimit = 150.0;

  const [cookies, setCookie] = useCookies(["user_usage"]);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [isLoading, setIsLoading] = useState(false);
  const [usage, setUsage] = useState(cookies.user_usage || 0);
  const [recipeList, setRecipeList] = useState([]);
  const [shopList, setShopList] = useState([]);

  const calculateEndpointUsage = (numEndpoints, numResults) => {
    const endpointCost = 1;
    const resultCost = 0.06;
    let pointsUsed = 0;

    if (numResults !== null || numResults !== undefined) {
      pointsUsed += (numResults * resultCost);
    }
    pointsUsed += (endpointCost * numEndpoints);
    setUsage(usage + pointsUsed);
    setCookie('user_usage', usage + pointsUsed, { expires: tomorrow });
  };

  const handleUsageLimit = () => {

  };

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
  };

  useEffect(() => {
    const localStorageListRaw = localStorage.getItem("recipeList");
    localStorageListRaw && setRecipeList(JSON.parse(localStorageListRaw));

    if (cookies === usageLimit) {
      handleUsageLimit();
    }
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
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
                calculateEndpointUsage={calculateEndpointUsage}
              />
            }
          />
          <Route
            path='/recipe/:recipeId'
            element={
              <RecipePage
                apiUrl={apiUrl}
                spoonacularApiUrl={spoonacularApiUrl}
                apiKey={spoonacularApiKey}
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
                shopList={shopList}
                setShopList={setShopList}
                calculateEndpointUsage={calculateEndpointUsage}
                handleUsageLimit={handleUsageLimit}
              />
            }
          />
          <Route
            path='/recipe/:recipeId/scaled'
            element={
              <RecipePage
                apiUrl={apiUrl}
                spoonacularApiUrl={spoonacularApiUrl}
                apiKey={spoonacularApiKey}
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
                shopList={shopList}
                setShopList={setShopList}
                calculateEndpointUsage={calculateEndpointUsage}
                handleUsageLimit={handleUsageLimit}
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
