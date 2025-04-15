import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  const fetchPokemon = async () => {
    if (!query) return;

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      setPokemon(res.data);
      setError('');
    } catch (err) {
      setPokemon(null);
      setError('Pokémon not found!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-start p-8 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-blue-900">🔍 Pokédex Search</h1>

      <div className="flex gap-2 mb-6 w-full max-w-md text-black">
        <input
          type="text"
          placeholder="Enter Pokémon name or ID"
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchPokemon()}
        />
        <button
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          onClick={fetchPokemon}
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 text-lg mb-4">{error}</p>}

      {pokemon && (
        <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full text-center animate-fade-in-up">
          <h2 className="text-3xl capitalize font-bold text-gray-800 mb-2">{pokemon.name}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-36 h-36 mx-auto my-4 drop-shadow-md"
          />

          <div className="mb-4">
            <h3 className="font-semibold text-lg text-gray-700 mb-1">Types</h3>
            <div className="flex justify-center gap-2">
              {pokemon.types.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-blue-200 text-blue-800 text-sm font-medium">
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-black mb-2">Base Stats</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-black text-left">
              {pokemon.stats.map((stat, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="capitalize">{stat.stat.name}</span>
                  <span className="font-semibold">{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
