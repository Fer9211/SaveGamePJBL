import { useState } from 'react';
import "./styles/AppStyle.css";
import './App.css';
import Lista from "./components/lista.jsx";
import Pesquisa from "./components/pesquisa.jsx";
import DetalhesJogo from "./components/DetalhesJogo.jsx";
import Cadastro from "./components/Cadastro.jsx";

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('lista');
  const [idSelecionado, setIdSelecionado] = useState(null);

  const navegarParaDetalhes = (id) => {
    setIdSelecionado(id);
    setPaginaAtiva('detalhes');
  };

  const voltarParaLista = () => {
    setPaginaAtiva('lista');
    setIdSelecionado(null);
  };

  return (
    <div className='app'>
      <nav className='navApp'>
        <h1 className='title' onClick={voltarParaLista} style={{cursor: 'pointer'}}>
          SAVE GAME
        </h1>
      </nav>
    
      <div className="conteiner">

        {paginaAtiva === 'lista' && (
          <>
            <Pesquisa aoAbrirCadastro={() => setPaginaAtiva('cadastro')} />
            <Lista aoSelecionarJogo={navegarParaDetalhes} />
          </>
        )}

        {paginaAtiva === 'detalhes' && (
          <DetalhesJogo id={idSelecionado} aoVoltar={voltarParaLista} />
        )}

        {paginaAtiva === 'cadastro' && (
          <Cadastro aoVoltar={voltarParaLista} />
        )}
      </div>

      <footer className='footer'>
        <p>Save Game - Desenvolvido por: <strong>Fernanda Costa Moraes</strong></p>
      </footer>
    </div>
  );
}

export default App;