const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Skf6445*', 
    database: 'games'
}).promise();

async function relacionarItem(gameId, nomes, tabelaPrincipal, colNome, colId, tabelaLigacao, colGameId, colRelId) {
    if (!nomes) return;
    const lista = nomes.split(',').map(n => n.trim());

    for (const nome of lista) {
        const [rows] = await db.query(`SELECT ${colId} FROM ${tabelaPrincipal} WHERE ${colNome} = ?`, [nome]);
        let idItem = rows.length > 0 ? rows[0][colId] : (await db.query(`INSERT INTO ${tabelaPrincipal} (${colNome}) VALUES (?)`, [nome]))[0].insertId;

        await db.query(`INSERT INTO ${tabelaLigacao} (${colGameId}, ${colRelId}) VALUES (?, ?)`, [gameId, idItem]);
    }
}

const upload = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, '../client/public/capas'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
})});

app.get('/jogos', async (req, res) => {
    const sql = `
        SELECT g.*, 
        GROUP_CONCAT(DISTINCT p.nomePlataforma SEPARATOR ', ') AS plataformas,
        GROUP_CONCAT(DISTINCT gen.nomeGenero SEPARATOR ', ') AS generos
        FROM game g
        LEFT JOIN jogos_plataformas jp ON g.idgame = jp.game_id
        LEFT JOIN plataformas p ON jp.plataformas_id = p.idplataformas
        LEFT JOIN jogos_generos jg ON g.idgame = jg.id_jogos
        LEFT JOIN generos gen ON jg.id_generos = gen.idgeneros
        GROUP BY g.idgame`;
    try {
        const [result] = await db.query(sql);
        res.json(result);
    } catch (err) { res.status(500).json(err); }
});

app.post("/cadastrar", upload.single('capa'), async (req, res) => {
    const { nome, nota, descricao, plataformas, generos } = req.body;

    if (!nome || !nota || !descricao || !req.file) {
        return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos!" });
    }

    const url = `/capas/${req.file.filename}`;

    try {
        const [resGame] = await db.query("INSERT INTO game (nome, descricao, nota, url) VALUES (?, ?, ?, ?)", [nome, descricao, nota, url]);
        const id = resGame.insertId;

        await relacionarItem(id, plataformas, 'plataformas', 'nomePlataforma', 'idplataformas', 'jogos_plataformas', 'game_id', 'plataformas_id');
        await relacionarItem(id, generos, 'generos', 'nomeGenero', 'idgeneros', 'jogos_generos', 'id_jogos', 'id_generos');

        res.status(200).json("Cadastrado com sucesso!");
    } catch (err) { 
        console.error(err);
        res.status(500).json({ erro: "Erro interno ao cadastrar no banco de dados." }); 
    }
});
app.delete('/jogos/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ erro: "ID não fornecido." });

    try {
        await db.query("DELETE FROM jogos_plataformas WHERE game_id = ?", [id]);
        await db.query("DELETE FROM jogos_generos WHERE id_jogos = ?", [id]);

        const [result] = await db.query("DELETE FROM game WHERE idgame = ?", [id]);

        if (result.affectedRows > 0) {
            res.status(200).json("Jogo excluído com sucesso!");
        } else {
            res.status(404).json("Jogo não encontrado.");
        }
    } catch (err) {
        res.status(500).json({ erro: "Erro ao excluir o jogo no banco de dados." });
    }
});
app.put('/jogos/:id', upload.single('capa'), async (req, res) => {
    const { id } = req.params;
    const { nome, nota, descricao, plataformas, generos } = req.body;

    if (!nome || !nota || !id) {
        return res.status(400).json({ erro: "Dados insuficientes para atualização." });
    }
    
    try {
        let sqlUpdate = "UPDATE game SET nome = ?, descricao = ?, nota = ? WHERE idgame = ?";
        let paramsUpdate = [nome, descricao, nota, id];

        if (req.file) {
            sqlUpdate = "UPDATE game SET nome = ?, descricao = ?, nota = ?, url = ? WHERE idgame = ?";
            paramsUpdate = [nome, descricao, nota, `/capas/${req.file.filename}`, id];
        }

        await db.query(sqlUpdate, paramsUpdate);
        await db.query("DELETE FROM jogos_plataformas WHERE game_id = ?", [id]);
        await db.query("DELETE FROM jogos_generos WHERE id_jogos = ?", [id]);
        await relacionarItem(id, plataformas, 'plataformas', 'nomePlataforma', 'idplataformas', 'jogos_plataformas', 'game_id', 'plataformas_id');
        await relacionarItem(id, generos, 'generos', 'nomeGenero', 'idgeneros', 'jogos_generos', 'id_jogos', 'id_generos');

        res.status(200).json("Jogo atualizado com sucesso!");
    } catch (err) {
        res.status(500).json({ erro: "Falha ao atualizar o jogo." });
    }
});

app.listen(3001, () => console.log("Servidor rodando na 3001"));