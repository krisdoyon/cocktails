import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url + searchTerm}`);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newDrinks = drinks.map((drink) => {
          const { idDrink, strDrink, strAlcoholic, strDrinkThumb, strGlass } =
            drink;
          return {
            id: idDrink,
            name: strDrink,
            info: strAlcoholic,
            img: strDrinkThumb,
            glass: strGlass,
          };
        });
        setCocktails(newDrinks);
      } else {
        setCocktails([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider value={{ isLoading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
