import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Filmes = () => {
  const [filmes, setFilmes] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [categoriaId, setCategoriaId] = useState('28');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filmesPorPagina] = useState(6);
  const [filmesFiltrados, setFilmesFiltrados] = useState([]);
  const [filmeSelecionadoId, setFilmeSelecionadoId] = useState(null);
  const apiKey = 'b92dace67b416e504288ed5d28ca0d58';
  const imageUrl = 'https://image.tmdb.org/t/p/original';
  const idioma = 'pt-BR';

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        const endpoint = termoPesquisa ? 'search/movie' : 'discover/movie';
        const params = {
          api_key: apiKey,
          language: idioma,
          page: paginaAtual,
          sort_by: 'popularity.desc',
          with_genres: categoriaId,
          query: termoPesquisa,
        };

        const response = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, { params });
        const filmesData = response.data.results;

        const filmesComTrailer = await Promise.all(filmesData.map(async (filme) => {
          const trailerResponse = await axios.get(`https://api.themoviedb.org/3/movie/${filme.id}/videos`, {
            params: {
              api_key: apiKey,
              language: idioma
            }
          });
          const trailer = trailerResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
          return { ...filme, trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null };
        }));

        setFilmes(filmesComTrailer);
        setFilmesFiltrados(filmesComTrailer.slice(0, filmesPorPagina));
      } catch (error) {
        console.error('Erro ao buscar filmes ou trailers:', error);
      }
    };

    buscarFilmes();
  }, [termoPesquisa, paginaAtual, categoriaId, filmesPorPagina]);

  const abrirMenu = () => {
    const menu = document.querySelector('.menu-lateral');
    menu.style.right = '0';
  };

  const fecharMenu = () => {
    const menu = document.querySelector('.menu-lateral');
    menu.style.right = '-410px';
  };

  const handleClickCategoria = (id, event) => {
    setCategoriaId(id);
    setPaginaAtual(1);
    handleOpcao(event);
    fecharMenu();
    setFilmeSelecionadoId(null);
  };

  const handleOpcao = (event) => {
    const opcoes = document.querySelectorAll('.opcao-lista');
    opcoes.forEach(element => {
      element.classList.remove('opcao-listaSelecionada');
    });
    event.currentTarget.classList.add('opcao-listaSelecionada');
  };

  const handleClick = (filme) => {
    if (filmeSelecionadoId === filme.id) {

      if (filme.trailerUrl) {
        window.open(filme.trailerUrl, '_blank', 'noopener noreferrer');
      } else {
        alert('Trailer não disponível.');
      }
      setFilmeSelecionadoId(null);
    } else {

      setFilmeSelecionadoId(filme.id);
    }
  };

  const AumentarPesquisa = () => {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
      searchBar.style.width = "25%";
    }
  };

  const DiminuirPesquisa = () => {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
      searchBar.style.width = "10%";
    }
  };

  const handlePesquisa = (e) => {
    setTermoPesquisa(e.target.value);
    setPaginaAtual(1);
    setFilmeSelecionadoId(null);
  };

  const formatoOverview = (overview) => {
    const sentences = overview.split('.');
    if (sentences[0].length < 100 && sentences.length > 1) {
      return sentences.slice(0, 3).join('.') + '.';
    } else {
      return sentences[0] + '.';
    }
  };

  const proximaPagina = () => {
    if (paginaAtual < Math.ceil(filmes.length / filmesPorPagina)) {
      setPaginaAtual(prev => prev + 1);
      setFilmeSelecionadoId(null);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(prev => prev - 1);
      setFilmeSelecionadoId(null);
    }
  };

  const CliqueM = (event) => {
    event.currentTarget.style.transform = "scale(0.9)";
  };

  const CliqueD = (event) => {
    event.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div id='Filmes'>
      <div className='categoria'>
        <p onClick={abrirMenu} className='abrirMenu'>Categorias</p>
      </div>

      <section className='menu-lateral'>
        <div className='topbar-menu'>
          <button onClick={fecharMenu} className='btn-fechar'>×</button>
          <h2>Categorias</h2>
        </div>
        <ul className='lista-categorias'>
          <li>
            <button
              className='opcao-lista'
              onClick={(event) => handleClickCategoria(28, event)}
              onMouseDown={CliqueM}
              onMouseUp={CliqueD}
            >
              Ação
            </button>
          </li>
          <li>
            <button
              className='opcao-lista'
              onClick={(event) => handleClickCategoria(12, event)}
              onMouseDown={CliqueM}
              onMouseUp={CliqueD}
            >
              Aventura
            </button>
          </li>
          <li>
            <button
              className='opcao-lista'
              onClick={(event) => handleClickCategoria(35, event)}
              onMouseDown={CliqueM}
              onMouseUp={CliqueD}
            >
              Comédia
            </button>
          </li>
          <li>
            <button
              className='opcao-lista'
              onClick={(event) => handleClickCategoria(878, event)}
              onMouseDown={CliqueM}
              onMouseUp={CliqueD}
            >
              Ficção Científica
            </button>
          </li>
          <li>
            <button
              className='opcao-lista'
              onClick={(event) => handleClickCategoria(27, event)}
              onMouseDown={CliqueM}
              onMouseUp={CliqueD}
            >
              Terror
            </button>
          </li>
          <li>
            <button
              className='opcao-lista'
              onClick={(event) => handleClickCategoria(10749, event)}
              onMouseDown={CliqueM}
              onMouseUp={CliqueD}
            >
              Romance
            </button>
          </li>
        </ul>
      </section>

      <input
        id='searchBar'
        type='text'
        placeholder='🔎'
        value={termoPesquisa}
        onFocus={AumentarPesquisa}
        onBlur={DiminuirPesquisa}
        onChange={handlePesquisa}
      />

      <section className='filmes-grid'>
        {filmesFiltrados.map(filme => (
          <article
            onClick={() => handleClick(filme)}
            key={filme.id}
            className={`filme-poster ${filmeSelecionadoId === filme.id ? 'filme-posterSelecionado' : ''}`}
            style={{ backgroundImage: `url(${imageUrl}${filme.poster_path})` }}
          >
            <h3>{filme.title}</h3>
            {filme.overview && filmeSelecionadoId === filme.id &&
              <div className='overview overviewSelecionada'>
                <p>{formatoOverview(filme.overview)}</p>
              </div>
            }
          </article>
        ))}
      </section>
      <div id="area-button">
        <button
          className='seta'
          onMouseDown={CliqueM}
          onMouseUp={CliqueD}
          onClick={paginaAnterior}
        >
          ❮
        </button>
        <button
          className='seta'
          onMouseDown={CliqueM}
          onMouseUp={CliqueD}
          onClick={proximaPagina}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Filmes;
