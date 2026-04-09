import "../styles/lista.css";
import "../assets/fontawesome-free-web/fontawesome-free-web/css/all.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Lista({ aoSelecionarJogo }) {
    const [jogos, setJogos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/jogos')
            .then(res => setJogos(res.data))
            .catch(err => console.log("Erro ao buscar jogos:", err));
    }, []);

    const getPlatformIcon = (nome) => {
        const n = nome.toLowerCase();
        if (n.includes('pc') || n.includes('computador')) return "fa-solid fa-computer";
        if (n.includes('playstation') || n.includes('ps')) return "fa-brands fa-playstation";
        if (n.includes('xbox')) return "fa-brands fa-xbox";
        if (n.includes('switch') || n.includes('nintendo')) return "fa-solid fa-gamepad";
        return "fa-solid fa-gamepad";
    };

    return (
        <div className="lista">
            {jogos.map((jogo) => (
                <div 
                    className="componentes" 
                    key={jogo.idgame} 
                    onClick={() => aoSelecionarJogo(jogo.idgame)}
                >
                    <div className="componenteEsquerda">
                        <img src={jogo.url} alt={jogo.nome} className="capaJogo" />
                    </div>
                    
                    <div className="componenteDireita">
                        <div className="titulo">{jogo.nome}</div>
                        
                        <div className="plataformas">
                            {jogo.plataformas?.split(', ').map((plat, i) => (
                                <div key={i} className="icon-plataforma">
                                    <i className={getPlatformIcon(plat)}></i> {plat}
                                </div>
                            ))}
                        </div>

                        <div className="generos">
                            {jogo.generos?.split(', ').map((gen, i) => (
                                <div key={i}>{gen}</div>
                            ))}
                        </div>

                        <div className="estrelas">
                            {[1, 2, 3, 4, 5].map((valorEstrela) => (
                                <i 
                                    key={valorEstrela} 
                                    className={`fa-solid fa-star ${valorEstrela <= jogo.nota ? 'estrela-ativa' : 'estrela-inativa'}`}
                                ></i>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Lista;