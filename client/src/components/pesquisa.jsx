import "../styles/pesquisa.css";

function Pesquisa({ aoAbrirCadastro }) {
    return(
        <div className="pesquisa">
            <button className="btn-pesquisa" onClick={aoAbrirCadastro}>
                Adicionar novo jogo
            </button>
        </div>
    );
}
export default Pesquisa;