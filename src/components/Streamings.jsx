import React, { useEffect, useState } from "react";
import axios from "axios";
import logoPrime from "../../PRIME VIDEO PNG.png"
import logoNetflix from "../../netflixlogo.png"
import logoDisney from "../../logo-Disney-plus.jpeg"

const Streamings = () => {
    const [streaming, setStreaming] = useState([]);
    const [movies, setMovies] = useState({
        netflix: [],
        disney: [],
        prime: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = 'b92dace67b416e504288ed5d28ca0d58';
    const idioma = 'pt-BR';
    const region = 'BR';

    useEffect(() => {
        const buscarStreamings = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/watch/providers/movie`, {
                    params: {
                        api_key: apiKey,
                        language: idioma,
                    }
                });
                const provedores = response.data.results.filter(provider =>
                    [8, 337, 119].includes(provider.provider_id)
                );
                setStreaming(provedores);

                const netflixMovies = await buscarFilmes(8);
                const disneyMovies = await buscarFilmes(337);
                const primeMovies = await buscarFilmes(119);

                setMovies({
                    netflix: netflixMovies,
                    disney: disneyMovies,
                    prime: primeMovies
                });
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        const buscarFilmes = async (providerId) => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                    params: {
                        api_key: apiKey,
                        language: idioma,
                        with_watch_providers: providerId,
                        watch_region: region,
                        sort_by: 'popularity-desc',
                    }
                });
                return response.data.results.slice(0, 4);
            } catch (error) {
                console.error(`Erro ao buscar filmes para o provedor ID ${providerId}:`, error);
                return [];
            }
        };

        buscarStreamings();
    }, []);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar dados: {error.message}</div>;
    }

    const getImageForProvider = (providerName) => {
        switch (providerName) {
            case 'Netflix':
                return 'logoNetflix';
            case 'Disney Plus':
                return 'logoDisney';
            case 'Amazon Prime Video':
                return 'logoPrime';
            default:
                return '/img/default.png';
        }
    };

    const getProviderUrl = (providerName) => {
        switch (providerName) {
            case 'Netflix':
                return 'https://www.netflix.com';
            case 'Disney Plus':
                return 'https://www.disneyplus.com';
            case 'Amazon Prime Video':
                return 'https://www.primevideo.com';
            default:
                return '#';
        }
    };

    const handleClick = (event) => {
        const streamingPosters = document.querySelectorAll(".filme-item");
        streamingPosters.forEach(filme => {
            filme.classList.remove('filmeSelecionado');
        });
        event.currentTarget.classList.add('filmeSelecionado');

        const title = document.querySelectorAll(".title");
        title.forEach(title => {
            title.classList.remove('titleSelecionado');
        });
        event.currentTarget.querySelector('.title').classList.add('titleSelecionado');
    };

    return (
        <div className="streaming-mainbox">
            {streaming.map(provider => (
                <div key={provider.provider_id} className="streaming-section">
                    <a href={getProviderUrl(provider.provider_name)} target="blank" rel="noopener noreferrer">
                        <img
                            className="logo-streaming"
                            src={getImageForProvider(provider.provider_name)}
                            alt={provider.provider_name} />
                    </a>
                    <div className="filmes-streamingBox">
                        {provider.provider_id === 8 && movies.netflix.map(movie => (
                            <article
                                key={movie.id}
                                onClick={handleClick}
                                className="filme-item"
                                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})` }}>
                                <h3 className="title">{movie.title}</h3>
                            </article>
                        ))}
                        {provider.provider_id === 337 && movies.disney.map(movie => (
                            <article
                                key={movie.id}
                                onClick={handleClick}
                                className="filme-item"
                                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})` }}>
                                <h3 className="title">{movie.title}</h3>
                            </article>
                        ))}
                        {provider.provider_id === 119 && movies.prime.map(movie => (
                            <article
                                key={movie.id}
                                onClick={handleClick}
                                className="filme-item"
                                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})` }}>
                                <h3 className="title">{movie.title}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Streamings;
