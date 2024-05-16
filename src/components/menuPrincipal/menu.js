import { useState } from "react";
import './menu.css'
import Biblioteca from "./biblioteca/biblioteca";

function Menu({ procuraLogado, setTelaPrincipal }) {
    class Emprestimo {
        constructor(pegou, entregar, id, livro) {
            this.dataPegouEmprestimo = pegou;
            this.dataEntregouEmprestimo = entregar;
            this.idEmprestimo = id;
            this.livroEmprestimo = livro || [];

        }

        get dataPegou() {
            return this.dataPegouEmprestimo;
        }

        get dataEntregou() {
            return this.dataEntregouEmprestimo;
        }

        get id() {
            return this.idEmprestimo;
        }

        get livro() {
            return this.livroEmprestimo;
        }

        set dataPegou(novaDataPegou) {
            this.dataPegouEmprestimo = novaDataPegou;
        }

        set dataEntregou(novaDataEntregou) {
            this.dataEntregouEmprestimo = novaDataEntregou;
        }

        set id(novoId) {
            this.idEmprestimo = novoId;
        }

        set livro(Livro) {
            this.livroEmprestimo = Livro;
        }
    }

    class Avaliacao {
        constructor(data, comentario, nota) {
            this.dataAvaliacao = data;
            this.comentarioAvaliacao = comentario;
            this.notaAvaliacao = nota;
        }

        get data() {
            return this.dataAvaliacao;
        }

        get comentario() {
            return this.comentarioAvaliacao;
        }

        get nota() {
            return this.notaAvaliacao;
        }

        set data(novaData) {
            this.dataAvaliacao = novaData;
        }

        set comentario(Comentario) {
            this.comentarioAvaliacao = Comentario;
        }

        set nota(Nota) {
            this.notaAvaliacao = Nota;
        }
    }

    const [dataPegar, setDataPegar] = useState('');
    const [dataEntregar, setDataEntregar] = useState('');
    const [idAux, setIdAux] = useState(0);
    const [tela, setTela] = useState('inicial');
    const [idLivroAvaliar, setIdLivroAvaliar] = useState(0);
    const [notaAvaliar, setNotaAvaliar] = useState(0);
    const [dataAvaliar, setDataAvaliar] = useState('');
    const [comentario, setComentario] = useState('');
    const [avalicoesExibir, setAvaliacoesExibir] = useState([]);

    const realizaEmprestimo = () => {
        const newEmprestimo = new Emprestimo(dataPegar, dataEntregar, idAux, []);
        var novoId = idAux + 1;
        setIdAux(novoId);
        const listaAux = [...procuraLogado.emprestimosUser, newEmprestimo];
        procuraLogado.emprestimosUser = listaAux;
    }

    const procuraEmprestimo = () => {
        var aux = idAux - 1;
        for (let i = 0; i < procuraLogado.emprestimosUser.length; i++) {
            if (procuraLogado.emprestimosUser[i].idEmprestimo === aux) {
                return procuraLogado.emprestimosUser[i];
            }
            console.log(procuraLogado);
        }
    }

    const devolverLivro = (emprestimoId, livroId) => {
        const emprestimoIndex = procuraLogado.emprestimosUser.findIndex(emprestimo => emprestimo.idEmprestimo === emprestimoId);
        if (emprestimoIndex !== -1) {
            const emprestimo = procuraLogado.emprestimosUser[emprestimoIndex];
            const livroIndex = emprestimo.livroEmprestimo.findIndex(livro => livro.id === livroId);
            if (livroIndex !== -1) {
                emprestimo.livroEmprestimo.splice(livroIndex, 1);
                const updatedEmprestimos = [...procuraLogado.emprestimosUser];
                updatedEmprestimos[emprestimoIndex] = emprestimo;
                procuraLogado.emprestimosUser = updatedEmprestimos;
            }
        }
        setTela('pegarEmprestado');
        setTimeout(function () {
            setTela('inicial');
        }, 1);
    }

    const livroAvaliar = () => {
        const newAvalicao = new Avaliacao(dataAvaliar, comentario, notaAvaliar);
        var avAux = {
            titulo: "",
            comentario: "",
            nota: 0,
            data: ''
        }
        for (let i = 0; i < procuraLogado.emprestimosUser.length; i++) {
            for (let j = 0; j < procuraLogado.emprestimosUser[i].livroEmprestimo.length; j++) {
                if (procuraLogado.emprestimosUser[i].livroEmprestimo[j].id === idLivroAvaliar) {
                    const aux = procuraLogado.emprestimosUser[i].livroEmprestimo[j].avaliacaoLivro || [];
                    procuraLogado.emprestimosUser[i].livroEmprestimo[j].avaliacaoLivro = [...aux, newAvalicao]
                    avAux.titulo = procuraLogado.emprestimosUser[i].livroEmprestimo[j].titulo;
                    avAux.comentario = comentario;
                    avAux.nota = notaAvaliar;
                    avAux.data = dataAvaliar;
                }
            }
        }
        setAvaliacoesExibir([...avalicoesExibir, avAux]);
    }

    return (
        <div className="container">
            {tela === 'inicial' && (
                <div id="operacoes" className="operacoes">
                    <div className="side menuPrincipal">
                        <h1 className="LivroButtonsTitulo" style={{ alignSelf: 'center' }}>Bem vindo, {procuraLogado.nome}</h1>
                        <button onClick={() => setTela('pegarEmprestado')}>Empréstimo</button>
                        <button onClick={() => setTela('avaliacoes')}>Avaliações</button>
                        <button onClick={() => setTelaPrincipal('login')}>Sair</button>
                    </div>
                    <div className="divider"></div>
                    <div className='containerLista'>
                        {procuraLogado.emprestimosUser.map(emprestimos =>
                            emprestimos.livroEmprestimo.map(livro =>
                                <div className='listadorContainer' >
                                    <p>Título: {livro.titulo} </p>
                                    <p>Emprestimo: {emprestimos.dataPegou}</p>
                                    <p>Devolução: {emprestimos.dataEntregou}</p>
                                    <div style={{ width: '100%' }}>
                                        <button onClick={() => devolverLivro(emprestimos.id, livro.id)} style={{
                                            borderRadius: '0', width: '100%',
                                            backgroundColor: 'red'
                                        }}>Devolver</button>
                                        <button onClick={() => { setTela('avaliar'); setIdLivroAvaliar(livro.id); }} style={{ width: '100%', borderRadius: '0' }}>Avaliar</button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
            {tela === 'pegarEmprestado' && (
                <div id="operacoes" className="operacoes">
                    <div className="side">
                        <h1 className="LivroButtonsTitulo" style={{ alignSelf: 'center' }}>Bem vindo, {procuraLogado.nome}</h1>
                        <button onClick={() => setTela('inicial')}>Voltar</button>
                    </div>
                    <div className="divider"></div>

                    <div id="primeiraTela" className="primeiraTela emprestimo">
                        <label htmlFor="pegar">Data de empréstimo: </label>
                        <input style={{ marginTop: '0' }} onChange={(e) => setDataPegar(e.target.value)} id="pegar" type="date"></input>
                        <label htmlFor="entregar">Data de entrega: </label>
                        <input style={{ marginTop: '0' }} onChange={(e) => setDataEntregar(e.target.value)} id="entregar" type="date"></input>
                        <button className="buttonPegarEmprestado" onClick={() => { setTela('livros'); realizaEmprestimo() }} style={{ width: '30%' }}>Confirmar</button>
                    </div>
                </div>
            )}
            {tela === 'livros' && (
                <Biblioteca listaEmprestimo={procuraEmprestimo()} setTelaMenu={setTela} />
            )}
            {tela === 'avaliar' && (
                <div id="operacoes" className="operacoes">
                    <div className="side">
                        <h1 className="LivroButtonsTitulo" style={{ alignSelf: 'center' }}>Avaliar</h1>
                        <button onClick={() => setTela('inicial')}>Voltar</button>
                    </div>
                    <div className="divider"></div>

                    <div id="primeiraTela" className="primeiraTela emprestimo">
                        <input type="text" placeholder="Deixe um comentário" onChange={(e) => setComentario(e.target.value)}></input>
                        <input type="number" min={0} max={10} placeholder="Deixe uma nota de 0 a 10" onChange={(e) => setNotaAvaliar(e.target.value)}></input>
                        <label htmlFor="pegar">Data de empréstimo: </label>
                        <input style={{ marginTop: '0' }} onChange={(e) => setDataAvaliar(e.target.value)} id="pegar" type="date"></input>
                        <button onClick={() => { setTela('inicial'); livroAvaliar() }} style={{ width: '30%' }}>Confirmar</button>
                    </div>
                </div>
            )}
            {tela === 'avaliacoes' && (
                <div id="operacoes" className="operacoes">
                    <div className="side">
                        <h1 className="LivroButtonsTitulo" style={{ alignSelf: 'center' }}>Avaliações</h1>
                        <button onClick={() => setTela('inicial')}>Voltar</button>
                    </div>
                    <div className="divider"></div>
                    <div className='containerLista'>
                        {avalicoesExibir.map(avaliacoes =>
                            <div className='listadorContainer' >
                                <p>Título: {avaliacoes.titulo} </p>
                                <p>Nota: {avaliacoes.nota}</p>
                                <p>Comentário: {avaliacoes.comentario}</p>
                                <p>Data: {avaliacoes.data}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Menu;