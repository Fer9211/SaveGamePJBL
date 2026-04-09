import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/DetalhesJogos.css";

function DetalhesJogo({ id, aoVoltar }) {
    const [jogo, setJogo] = useState(null);
    const [aberto, setAberto] = useState(false);
    const [arquivo, setArquivo] = useState(null);
    
    const [valores, setValores] = useState({
        nome: '',
        plataformas: '',
        generos: '',
        descricao: '',
        nota: ''
    });

    useEffect(() => {
        axios.get('http://localhost:3001/jogos')
            .then(res => {
                const jogoEncontrado = res.data.find(j => j.idgame === id);
                setJogo(jogoEncontrado);
            })
            .catch(err => console.log("Erro ao buscar detalhes:", err));
    }, [id]);

    const handleChange = (e) => {
        setValores(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const ativarEdicao = () => {
        setValores({
            nome: jogo.nome,
            plataformas: jogo.plataformas,
            generos: jogo.generos,
            descricao: jogo.descricao,
            nota: jogo.nota
        });
        setAberto(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nome', valores.nome);
        formData.append('plataformas', valores.plataformas);
        formData.append('generos', valores.generos);
        formData.append('descricao', valores.descricao);
        formData.append('nota', valores.nota);
        if (arquivo) formData.append('capa', arquivo);

        try {
            await axios.put(`http://localhost:3001/jogos/${id}`, formData);
            alert("Jogo atualizado com sucesso!");
            setAberto(false);
            window.location.reload();
        } catch (err) {
            console.error("Erro ao editar:", err);
            alert("Erro ao salvar alterações.");
        }
    };

    const handleExcluir = () => {
        if (window.confirm(`Você tem certeza que deseja excluir o jogo "${jogo.nome}" permanentemente?`)) {
            
            axios.delete(`http://localhost:3001/jogos/${id}`)
                .then((res) => {
                    alert("Jogo excluído com sucesso!"); 
                    aoVoltar();
                })
                .catch(err => {
                    console.error("Erro ao excluir:", err);
                    const msg = err.response?.data?.erro || "Não foi possível excluir o jogo. Tente novamente.";
                    alert(msg);
                });
        }
    };

    const getPlatformIcon = (nome) => {
        const n = nome.toLowerCase();
        if (n.includes('pc') || n.includes('computador')) return "fa-solid fa-computer";
        if (n.includes('playstation') || n.includes('ps')) return "fa-brands fa-playstation";
        if (n.includes('xbox')) return "fa-brands fa-xbox";
        if (n.includes('switch') || n.includes('nintendo')) return "fa-solid fa-gamepad";
        return "fa-solid fa-gamepad";
    };

    return (
        <div className="paginaDetalhesJogo">            
            {jogo ? (
                <div className="infoJogo">
                    <div className='infoJogoEsquerda'>
                        <div className='capaJogo'><img src={"." + jogo.url} alt={jogo.nome} /></div>    
                        <div className="estrelasDiv">
                            {[1, 2, 3, 4, 5].map((v) => (
                                <i key={v} className={`fa-solid fa-star ${v <= jogo.nota ? 'estrela-ativa' : 'estrela-inativa'}`}></i>
                            ))}
                        </div>
                    </div>

                    <div className='infoJogoDireita'>
                        <div className='botoes'>
                            <button className="btn-voltar" onClick={aoVoltar}> Voltar </button>
                            <button className="btn-editar" onClick={ativarEdicao}> Editar </button>
                            <button className="btn-excluir" onClick={handleExcluir}> Excluir </button>
                        </div>
                        
                        <div className='fichaTecnica'>
                            <div className='tituloDiv'>
                                <div>Título:</div>
                                <div>{jogo.nome}</div>
                            </div>
                            <div className="plataformasDiv">
                                <div>Plataformas:</div>
                                <div className='divPlataformas'>
                                    {jogo.plataformas?.split(', ').map((plat, i) => (
                                        <div key={i} className="icon-plataforma">
                                            <i className={getPlatformIcon(plat)}></i> {plat} 
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="generoDiv">
                                <div>Gêneros:</div>
                                <div className='generosDiv'>
                                    {jogo.generos?.split(', ').map((gen, i) => (
                                        <div key={i}>{gen}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='descricaoDiv'>
                            <h3>Descrição:</h3>
                            <p>{jogo.descricao}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loading"><p>Carregando...</p></div>
            )}
            {aberto && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h2>Editar Jogo</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form">
                                <div className="campo">
                                    <div className="campoEsquerdo"><label>Nome:</label></div>
                                    <div className="campoDireito">
                                        <input name="nome" type="text" value={valores.nome} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="campo">
                                    <div className="campoEsquerdo"><label>Plataformas:</label></div>
                                    <div className="campoDireito">
                                        <input name="plataformas" type="text" value={valores.plataformas} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="campo">
                                    <div className="campoEsquerdo"><label>Gêneros:</label></div>
                                    <div className="campoDireito">
                                        <input name="generos" type="text" value={valores.generos} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="campo">
                                    <div className="campoEsquerdo"><label>Descrição:</label></div>
                                    <div className="campoDireito">
                                        <textarea name="descricao" rows="5" value={valores.descricao} onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <div className="campo">
                                    <div className="campoEsquerdo"><label>Nota:</label></div>
                                    <div className="campoDireito">
                                        <input name="nota" type="number" value={valores.nota} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="campo">
                                    <div className="campoEsquerdo"><label>Capa (Opcional):</label></div>
                                    <div className="campoDireito">
                                        <input type="file" accept="image/*" onChange={(e) => setArquivo(e.target.files[0])} />
                                    </div>
                                </div>
                            </div>
                            <div className="modalBotoes">
                                <button type="submit" className="btn-salvar">Salvar</button>
                                <button type="button" className="btn-cancelar" onClick={() => setAberto(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetalhesJogo;