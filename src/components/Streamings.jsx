import React, { useEffect, useState } from "react";
import axios from "axios";

const Streamings = () => {
    const [streaming, setStreaming] = useState([]);
    const [movies, setMovies] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = 'b92dace67b416e504288ed5d28ca0d58';
    const idioma = 'pt-BR';
    const region = 'BR';

    useEffect(() => {
        const buscarStreamings = async () => {
            try {
                // Buscar provedores de streaming
                const response = await axios.get(`https://api.themoviedb.org/3/watch/providers/movie`, {
                    params: {
                        api_key: apiKey,
                        language: idioma,
                        watch_region: region,
                    }
                });

                // Filtrar provedores específicos (Netflix, Disney Plus, Amazon Prime Video)
                const provedoresFiltrados = response.data.results.filter(provider =>
                    [8, 337, 119].includes(provider.provider_id)
                );
                setStreaming(provedoresFiltrados);

                // Buscar filmes para cada provedor filtrado
                const filmesPorProvedor = await Promise.all(
                    provedoresFiltrados.map(async (provider) => {
                        const filmes = await buscarFilmes(provider.provider_id);
                        return { provider_id: provider.provider_id, filmes };
                    })
                );

                // Converter para um objeto com provider_id como chave
                const filmesMap = filmesPorProvedor.reduce((acc, curr) => {
                    acc[curr.provider_id] = curr.filmes;
                    return acc;
                }, {});

                setMovies(filmesMap);
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
                        sort_by: 'popularity.desc',
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
        const streamingItems = document.querySelectorAll(".filme-item");
        streamingItems.forEach(filme => {
            filme.classList.remove('filmeSelecionado');
        });
        event.currentTarget.classList.add('filmeSelecionado');

        const titles = document.querySelectorAll(".title");
        titles.forEach(title => {
            title.classList.remove('titleSelecionado');
        });
        event.currentTarget.querySelector('.title').classList.add('titleSelecionado');
    };

    return (
        <div className="streaming-mainbox">
            {streaming.map(provider => (
                <div key={provider.provider_id} className="streaming-section">
                    <a href={getProviderUrl(provider.provider_name)} target="_blank" rel="noopener noreferrer">
                        {provider.logo_path ? (
                            <img
                                className="logo-streaming"
                                src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                                alt={provider.provider_name}
                            />
                        ) : (
                            <div className="logo-placeholder">{provider.provider_name}</div>
                        )}
                    </a>
                    <div className="filmes-streamingBox">
                        {movies[provider.provider_id] && movies[provider.provider_id].map(movie => (
                            <article
                                key={movie.id}
                                onClick={handleClick}
                                className="filme-item"
                                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})` }}
                            >
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
