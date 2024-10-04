import React, { useState } from "react";
import axios from "axios";

const Ferramenta = () => {
  const [filme1, setFilme1] = useState(null);
  const [filme2, setFilme2] = useState(null);
  const [pesquisa1, setPesquisa1] = useState("");
  const [pesquisa2, setPesquisa2] = useState("");
  const [resultados1, setResultados1] = useState([]);
  const [resultados2, setResultados2] = useState([]);
  const [filmeSelecionado1, setFilmeSelecionado1] = useState(null);
  const [filmeSelecionado2, setFilmeSelecionado2] = useState(null);
  const [modalState1, setModalState1] = useState("inicial");
  const [modalState2, setModalState2] = useState("inicial");
  const [filmeSemelhante, setFilmeSemelhante] = useState(null);
  const [imagemFundo1, setImagemFundo1] = useState("");
  const [imagemFundo2, setImagemFundo2] = useState("");
  const apiKey = "b92dace67b416e504288ed5d28ca0d58";
  const imageUrl = "https://image.tmdb.org/t/p/w1280";
  const idioma = "pt-BR";

  const buscarFilmeSemelhante = () => {
    if (filme1 && filme2) {
      const generos1 = filme1.genre_ids || [];
      const generos2 = filme2.genre_ids || [];
      const generosCombinados = [...new Set([...generos1, ...generos2])].join(",");

      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${generosCombinados}&language=${idioma}&sort_by=popularity.desc`
        )
        .then((response) => {
          const filmes = response.data.results;
          if (filmes.length > 0) {

            const filmeSemelhante = filmes[0];
            setFilmeSemelhante(filmeSemelhante);

            setTimeout(() => {
              mostrarResultado();
              mostrarInfoResultado();
            }, 100);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar filme semelhante:", error);
        });
    }
  };

  function mostrarResultado() {
    const resultado = document.querySelector('.FilmeSemelhanteBox');
    if (resultado) {
      resultado.style.opacity = '1';
    }
  }

  function mostrarInfoResultado() {
    const resultado = document.querySelector('.infoResultado');
    if (resultado) {
      setTimeout(() => {
        resultado.style.opacity = '1';
      }, 1500);
    }
  }

  function abrirModal1() {
    const escolha1 = document.getElementById("Modal1");
    if (escolha1) {
      escolha1.style.display = "flex";
      setModalState1("inicial");
      document.documentElement.style.overflow = "hidden";
    }
  }
  
  function abrirModal2() {
    const escolha2 = document.getElementById("Modal2");
    if (escolha2) {
      escolha2.style.display = "flex";
      setModalState2("inicial");
      document.documentElement.style.overflow = "hidden";
    }
  }

  function fecharModal() {
    const modais = document.querySelectorAll(".Modal");
    modais.forEach((modal) => (modal.style.display = "none"));
    document.documentElement.style.overflow = "auto";
  }

  const handlePesquisa1 = (e) => {
    setPesquisa1(e.target.value);
    setModalState1("pesquisando");

    if (e.target.value) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${e.target.value}&language=${idioma}&sort_by=popularity.desc`
        )
        .then((response) => {
          setResultados1(response.data.results.slice(0, 8));
        })
        .catch((error) => {
          console.error("Erro na pesquisa de filmes:", error);
        });
    } else {
      setResultados1([]);
    }
  };

  const handlePesquisa2 = (e) => {
    setPesquisa2(e.target.value);
    setModalState2("pesquisando");

    if (e.target.value) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${e.target.value}&language=${idioma}&sort_by=popularity.desc`
        )
        .then((response) => {
          setResultados2(response.data.results.slice(0, 8));
        })
        .catch((error) => {
          console.error("Erro na pesquisa de filmes:", error);
        });
    } else {
      setResultados2([]);
    }
  };

  const selecionarFilme1 = (filme) => {
    setFilmeSelecionado1(filme);
    setFilme1(filme);
    setImagemFundo1(`${imageUrl}${filme.backdrop_path}`);
    setModalState1("selecionado");
  };

  const selecionarFilme2 = (filme) => {
    setFilmeSelecionado2(filme);
    setFilme2(filme);
    setImagemFundo2(`${imageUrl}${filme.backdrop_path}`);
    setModalState2("selecionado");
  };

  const excluirFilme1 = () => {
    setFilmeSelecionado1(null);
    setFilme1(null);
    setPesquisa1("");
    setImagemFundo1("");
    setModalState1("inicial");
  };

  const excluirFilme2 = () => {
    setFilmeSelecionado2(null);
    setFilme2(null);
    setPesquisa2("");
    setImagemFundo2("");
    setModalState2("inicial");
  };

  const definirFundoEFechar = (imagemFundo, setImagemFundo, setModalState) => {
    setImagemFundo(imagemFundo);
    setModalState("inicial");
    fecharModal();
  };

  return (
    <div id="FerramentaBox">
      <section id="container">
        <div
          id="addFilme1"
          className="addFilme"
          onClick={abrirModal1}
          style={{
            backgroundImage: filme1 ? `url(${imageUrl}${filme1.backdrop_path})` : "none",
          }}
        ><a href="#Modal1"></a></div>
        <p id="sinalSoma">+</p>
        <div
          id="addFilme2"
          className="addFilme"
          onClick={abrirModal2}
          style={{
            backgroundImage: filme2 ? `url(${imageUrl}${filme2.backdrop_path})` : "none",
          }}
        ><a href="#Modal2"></a></div>
      </section>

      <div id="Modal1" className="Modal" style={{ backgroundImage: filmeSelecionado1 ? `url(${imagemFundo1})` : 'none' }}>
        <div className="leftSide">
          <button className="fecharModal" onClick={fecharModal}>
            X
          </button>
          {modalState1 === "selecionado" ? (
            <section className="infoModal" id="infoModal1">
              <h2>{filmeSelecionado1.title}</h2>
              <p className="overviewModal">{filmeSelecionado1.overview}</p>
            </section>
          ) : (
            <>
              <input
                type="text"
                name="searchModal1"
                id="searchModal1"
                placeholder="Pesquisar Filme 1"
                value={pesquisa1}
                onChange={handlePesquisa1}
              />
              <div className="botoesModal">
                <button className="excluirFilme" onClick={excluirFilme1}>
                  Excluir Filme
                </button>
                <button
                  className="confirmaMovie"
                  onClick={() =>
                    definirFundoEFechar(
                      filmeSelecionado1
                        ? `${imageUrl}${filmeSelecionado1.backdrop_path}`
                        : "",
                      setImagemFundo1,
                      setModalState1
                    )
                  }
                >
                  Enviar
                </button>
              </div>
            </>
          )}
          {!filmeSelecionado1 && resultados1.length > 0 && (
            <section className="resultadosModal">
              {resultados1.map((filme) => (
                <div className="displayFilmes" key={filme.id} onClick={() => selecionarFilme1(filme)}>
                  <img
                    src={`${imageUrl}${filme.poster_path}`}
                    width="180"
                    alt={filme.title}
                  />
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      <div id="Modal2" className="Modal" style={{ backgroundImage: filmeSelecionado2 ? `url(${imagemFundo2})` : 'none' }}>
        <div className="leftSide">
          <button className="fecharModal" onClick={fecharModal}>
            X
          </button>
          {modalState2 === "selecionado" ? (
            <section className="infoModal" id="infoModal2">
              <h2>{filmeSelecionado2.title}</h2>
              <p className="overviewModal">{filmeSelecionado2.overview}</p>
            </section>
          ) : (
            <>
              <input
                type="text"
                name="searchModal2"
                id="searchModal2"
                placeholder="Pesquisar Filme 2"
                value={pesquisa2}
                onChange={handlePesquisa2}
              />
              <div className="botoesModal">
                <button className="excluirFilme" onClick={excluirFilme2}>
                  Excluir Filme
                </button>
                <button
                  className="confirmaMovie"
                  onClick={() =>
                    definirFundoEFechar(
                      filmeSelecionado2
                        ? `${imageUrl}${filmeSelecionado2.backdrop_path}`
                        : "",
                      setImagemFundo2,
                      setModalState2
                    )
                  }
                >
                  Enviar
                </button>
              </div>
            </>
          )}
          {!filmeSelecionado2 && resultados2.length > 0 && (
            <section className="resultadosModal">
              {resultados2.map((filme) => (
                <div className="displayFilmes" key={filme.id} onClick={() => selecionarFilme2(filme)}>
                  <img
                    src={`${imageUrl}${filme.poster_path}`}
                    width="180"
                    alt={filme.title}
                  />
                </div>
              ))}
            </section>
          )}
        </div>
      </div>


      <p
        className="buscarSemelhante"
        onClick={() => {
          buscarFilmeSemelhante();
          mostrarResultado();
          mostrarInfoResultado();
        }}
      >
        <a href="#ancoraFilme">Ver Resultado</a>
      </p>

      <section id="ancoraFilme" className="FilmeSemelhanteBox" style={{ opacity: 0, transition: 'opacity 0.5s' }}>
        {filmeSemelhante && (
          <>
            {filmeSemelhante.backdrop_path && (
              <div
                className="imgResultado"
                style={{
                  backgroundImage: `url(${imageUrl}${filmeSemelhante.backdrop_path})`,
                }}
              ></div>
            )}
            <div className="infoResultado" style={{ opacity: 0, transition: 'opacity 0.5s' }}>
              <h2>{filmeSemelhante.title}</h2>
              <p>{filmeSemelhante.overview}</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Ferramenta;
