import './App.scss';
import axios from 'axios';
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
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';

function App() {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const spoonacularApiUrl = import.meta.env.VITE_APP_SPOONACULAR_API_URL;
    const spoonacularApiKey = import.meta.env.VITE_APP_SPOONACULAR_API_KEY;

    const token = sessionStorage.getItem("token");

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

    const cookies = new Cookies("user_usage", { path: '/', expires: tomorrow });


    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);
    const [open, setOpen] = useState(false);
    const [redirectPath, setRedirectPath] = useState("");

    const [usage, setUsage] = useState(cookies.get("user_usge") || 0);

    const sessionSavedRecipes = JSON.parse(sessionStorage.getItem("savedRecipes")) || [];
    const sessionShopList = JSON.parse(sessionStorage.getItem("shopList")) || [];
    const [savedRecipes, setSavedRecipes] = useState(sessionSavedRecipes);
    const [shopList, setShopList] = useState(sessionShopList);


    const calculateEndpointUsage = (numEndpoints, numResults) => {
        const endpointCost = 1;
        const resultCost = 0.06;
        let pointsUsed = 0;

        if (numResults !== null || numResults !== undefined) {
            pointsUsed += (numResults * resultCost);
        }

        pointsUsed += (endpointCost * numEndpoints);

        setUsage(usage + pointsUsed);
        cookies.set('user_usage', usage + pointsUsed, { path: '/' });
    };

    const handleUsageLimit = () => {

    };

    const handleLikeButton = recipe => {
        const saveRecipe = async () => {
            try {
                const savedRecipes = await axios.get(`${apiUrl}/api/recipe/user/${user.id}/saved_recipe`);
                sessionStorage.setItem("savedRecipes", JSON.stringify(savedRecipes.data));
                const sessionStorageList = JSON.parse(sessionStorage.getItem("savedRecipes"));

                if (!savedRecipes.data.map(entry => entry.recipeId).includes(recipe.recipeId)) {
                    const { data } = await axios.post(`${apiUrl}/api/recipe/user/${user.id}/saved_recipe`, recipe);
                    sessionStorageList.push(...data);
                    sessionStorage.setItem("savedRecipes", JSON.stringify(sessionStorageList));
                    setSavedRecipes([...sessionStorageList]);
                } else {
                    await axios.delete(`${apiUrl}/api/recipe/user/${user.id}/saved_recipe/${recipe.id}`);
                    const filteredList = sessionStorageList.filter(entry => entry.recipeId !== recipe.recipeId);
                    sessionStorage.setItem("savedRecipes", JSON.stringify(filteredList));
                    setSavedRecipes([...filteredList]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        saveRecipe();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBackNagivation = (navigate) => {
        setOpen(false);
        navigate(-1);
    };

    useEffect(() => {
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
                        exact path='/home'
                        element={
                            <HomePage
                                apiUrl={apiUrl}
                                externalApiUrl={spoonacularApiUrl}
                                apiKey={spoonacularApiKey}
                                token={token}
                                user={user}
                                setUser={setUser}
                                failedAuth={failedAuth}
                                setFailedAuth={setFailedAuth}
                                savedRecipes={savedRecipes}
                                setSavedRecipes={setSavedRecipes}
                                handleLikeButton={handleLikeButton}
                                open={open}
                                handleClose={handleClose}
                                calculateEndpointUsage={calculateEndpointUsage}
                            />
                        }
                    />
                    <Route
                        exact path='/'
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
                            />
                        }
                    />
                    <Route
                        exact path='/recipe/:recipeId'
                        element={
                            <RecipePage
                                apiUrl={apiUrl}
                                spoonacularApiUrl={spoonacularApiUrl}
                                apiKey={spoonacularApiKey}
                                token={token}
                                user={user}
                                setUser={setUser}
                                setFailedAuth={setFailedAuth}
                                savedRecipes={savedRecipes}
                                handleLikeButton={handleLikeButton}
                                open={open}
                                setOpen={setOpen}
                                handleClose={handleClose}
                                handleBackNagivation={handleBackNagivation}
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
                        exact path='/recipe/:recipeId/saved'
                        element={
                            <RecipePage
                                apiUrl={apiUrl}
                                spoonacularApiUrl={spoonacularApiUrl}
                                apiKey={spoonacularApiKey}
                                token={token}
                                user={user}
                                setUser={setUser}
                                setFailedAuth={setFailedAuth}
                                savedRecipes={savedRecipes}
                                handleLikeButton={handleLikeButton}
                                open={open}
                                setOpen={setOpen}
                                handleClose={handleClose}
                                handleBackNagivation={handleBackNagivation}
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
                                token={token}
                                user={user}
                                setUser={setUser}
                                setFailedAuth={setFailedAuth}
                                savedRecipes={savedRecipes}
                                handleLikeButton={handleLikeButton}
                                open={open}
                                setOpen={setOpen}
                                handleClose={handleClose}
                                handleBackNagivation={handleBackNagivation}
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
                                token={token}
                                user={user}
                                setUser={setUser}
                                failedAuth={failedAuth}
                                setFailedAuth={setFailedAuth}
                                shopList={shopList}
                                setShopList={setShopList}
                                handleBackNagivation={handleBackNagivation}
                            />
                        }
                    />
                    <Route
                        exact path='/collection'
                        element={
                            <Collection
                                apiUrl={apiUrl}
                                token={token}
                                user={user}
                                setUser={setUser}
                                failedAuth={failedAuth}
                                setFailedAuth={setFailedAuth}
                                savedRecipes={savedRecipes}
                                setSavedRecipes={setSavedRecipes}
                                handleLikeButton={handleLikeButton}
                                handleBackNagivation={handleBackNagivation}
                            />
                        }
                    />
                    <Route
                        exact path='/forgot-password'
                        element={
                            <ForgotPassword
                                apiUrl={apiUrl}
                                open={open}
                                setOpen={setOpen}
                                handleClose={handleClose}
                                setFailedAuth={setFailedAuth}
                            />
                        }
                    />
                    <Route
                        exact path='/reset-password'
                        element={
                            <ResetPassword
                                apiUrl={apiUrl}
                                open={open}
                                setOpen={setOpen}
                                handleClose={handleClose}
                                setFailedAuth={setFailedAuth}
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
