import { FC } from "react";
import { useInfiniteScroll } from "../../hooks/useInifiniteScroll";
import { Pokemon } from "../../lib/types";
import { useGetPokemonsQuery } from "../../redux/services/pokemon.service";
import "./home.css";

const LIST_CONTAINER_ID = "list";

export const Home: FC = () => {
  const { page } = useInfiniteScroll(LIST_CONTAINER_ID);

  const { data: pokemons } = useGetPokemonsQuery({
    pageNum: page,
    perPage: 20,
  });

  return (
    <div className="home-container">
      <h1>Infinite Scrolling</h1>
      <div id={LIST_CONTAINER_ID}>
        <ul>
          {pokemons?.map((pokemon: Pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
