import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { isLoading, cocktails } = useGlobalContext();

  if (isLoading) {
    return <Loading />;
  }

  if (cocktails.length === 0) {
    return (
      <section className="section">
        <h2 className="section-title">
          No cocktails matched your search criteria
        </h2>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">Cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((cocktail) => {
          return <Cocktail key={cocktail.id} {...cocktail} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
