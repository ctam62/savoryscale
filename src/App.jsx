import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { HomePage } from './pages/HomePage/HomePage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import { ShoppingList } from './pages/ShoppingList/ShoppingList';
import { Collection } from './pages/Collection/Collection';


function App() {

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const spoonacularApiUrl = import.meta.env.VITE_APP_SPOONACULAR_API_URL;
  const spoonacularApiKey = import.meta.env.VITE_APP_SPOONACULAR_API_KEY;

  const usageLimit = 150.0;

  const date = new Date();
  const now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  const tomorrow = new Date(now_utc);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const cookies = new Cookies("user_usage", { expires: tomorrow });


  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [open, setOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState("");

  const [usage, setUsage] = useState(cookies.get("user_usge") || 0);

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
    cookies.set('user_usage', usage + pointsUsed);
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

  const handleClose = () => {
    setOpen(false);
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
        <Header
          user={user}
          setUser={setUser}
          setFailedAuth={setFailedAuth}
          setOpen={setOpen}
        />
        <Routes>
          <Route
            exact path='/'
            element={
              <HomePage
                apiUrl={apiUrl}
                externalApiUrl={spoonacularApiUrl}
                apiKey={spoonacularApiKey}
                user={user}
                setUser={setUser}
                failedAuth={failedAuth}
                setFailedAuth={setFailedAuth}
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
                open={open}
                handleClose={handleClose}
                calculateEndpointUsage={calculateEndpointUsage}
              />
            }
          />
          <Route
            exact path='/welcome'
            element={<WelcomePage />}
          />
          <Route
            exact path='/login'
            element={
              <LoginPage
                apiUrl={apiUrl}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                setFailedAuth={setFailedAuth}
              />
            }
          />
          <Route
            exact path='/signup'
            element={
              <SignUpPage
                apiUrl={apiUrl}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
              />}
          />
          <Route
            exact path='/recipe/:recipeId'
            element={
              <RecipePage
                apiUrl={apiUrl}
                spoonacularApiUrl={spoonacularApiUrl}
                apiKey={spoonacularApiKey}
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                redirectPath={redirectPath}
                setRedirectPath={setRedirectPath}
                shopList={shopList}
                setShopList={setShopList}
                calculateEndpointUsage={calculateEndpointUsage}
                handleUsageLimit={handleUsageLimit}
              />
            }
          />
          <Route
            exact path='/recipe/:recipeId/scaled'
            element={
              <RecipePage
                apiUrl={apiUrl}
                spoonacularApiUrl={spoonacularApiUrl}
                apiKey={spoonacularApiKey}
                recipeList={recipeList}
                handleLikeButton={handleLikeButton}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                redirectPath={redirectPath}
                setRedirectPath={setRedirectPath}
                shopList={shopList}
                setShopList={setShopList}
                calculateEndpointUsage={calculateEndpointUsage}
                handleUsageLimit={handleUsageLimit}
              />
            }
          />
          <Route
            exact path='/shoppinglist'
            element={
              <ShoppingList
                apiUrl={apiUrl}
                user={user}
                setUser={setUser}
                failedAuth={failedAuth}
                setFailedAuth={setFailedAuth}
                shopList={shopList}
                setShopList={setShopList}
              />
            }
          />
          <Route
            exact path='/collection'
            element={
              <Collection
                apiUrl={apiUrl}
                user={user}
                setUser={setUser}
                failedAuth={failedAuth}
                setFailedAuth={setFailedAuth}
                recipeList={recipeList}
                setRecipeList={setRecipeList}
                handleLikeButton={handleLikeButton}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
