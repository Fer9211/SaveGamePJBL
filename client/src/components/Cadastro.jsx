import { useState } from 'react';
import axios from 'axios';
import "../styles/Cadastro.css";

function Cadastro({ aoVoltar }) {
    const [arquivo, setArquivo] = useState(null);
    const [valores, setValores] = useState({
        nome: '',
        nota: '',
        descricao: '',
        plataformas: '',
        generos: ''
    });

    const handleChange = (e) => {
        setValores(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!arquivo) return alert("Por favor, selecione uma capa!");

        const formData = new FormData();
        formData.append('nome', valores.nome);
        formData.append('nota', valores.nota);
        formData.append('descricao', valores.descricao);
        formData.append('plataformas', valores.plataformas);
        formData.append('generos', valores.generos);
        formData.append('capa', arquivo); 

        try {
            await axios.post("http://localhost:3001/cadastrar", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Jogo cadastrado com sucesso! 🎉");
            aoVoltar();
        } catch (err) {
            const mensagemErro = err.response?.data?.erro || "Erro ao conectar com o servidor.";
            alert(mensagemErro);
        }
    };

    return (
        <div className="pagina-cadastro-cheia">
            <h2>Cadastrar Novo Jogo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="campo">
                        <label>Nome do Jogo:</label>
                        <input name="nome" type="text" placeholder="Nome do Jogo" onChange={handleChange} />
                    </div>

                    <div className="campo">
                        <label>Plataformas:</label>
                        <input name="plataformas" type="text" placeholder="Separadas por vírgula" onChange={handleChange} />
                    </div>

                    <div className="campo">
                        <label>Gêneros:</label>
                        <input name="generos" type="text" placeholder="Separados por vírgula" onChange={handleChange} />
                    </div>

                    <div className="campo">
                        <label>Descrição:</label>
                        <textarea name="descricao" placeholder="Descrição do jogo" className="campo-descricao" rows="5" onChange={handleChange}></textarea>
                    </div>

                    <div className="campo">
                        <label>Nota:</label>
                        <input name="nota" type="number" placeholder="1-5" onChange={handleChange} />
                    </div>

                    <div className="campo">
                        <label className="label-upload">Capa do Jogo:</label>
                        <input type="file" accept="image/*" onChange={(e) => setArquivo(e.target.files[0])} />
                    </div>
                </div>

                <div className="modalBotoes">
                    <button type="submit" className="btn-salvar">Salvar</button>
                    <button type="button" className="btn-cancelar" onClick={aoVoltar}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default Cadastro;