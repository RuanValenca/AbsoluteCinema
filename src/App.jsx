import Header from './components/Header'
import './App.css'
import Filmes from './components/Filmes'
import Streamings from './components/Streamings'
import Ferramenta from './components/Ferramenta'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="App">
      <Header />

      <div id='pag2'>
        <h2 id='catalogo-title'>Catálogo</h2>
        <Filmes />
      </div>

      <div id='pag3'>
        <h2 id='streaming-title'>Mais votados</h2> <br /><h4 id='streaming-subtitle'>Por Streaming</h4>
        <Streamings />
      </div>

      <div id='pag4'>
        <h2 id='ferramenta-title'>Encontre um Filme</h2> <br />
        <p id='descricao-pag4'>Não consegue decidir um filme? Escolha dois filmes de sua preferência para ver recomendações baseadas nos seus gostos.</p>
        <Ferramenta />
      </div>

      <div id='pag5'>

        <Footer />
      </div>

    </div>
  )
}

