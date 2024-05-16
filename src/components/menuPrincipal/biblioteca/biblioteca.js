import './biblioteca.css'
import livroInicial from './img/livros.png'
import { useEffect, useState } from 'react';
import iconeCadaLivro from './img/livro-de-capa-preta-fechado.png'

function Biblioteca({ listaEmprestimo,setTelaMenu }) {
    class Livro {
        constructor(titulo, genero, autor, id, avaliacao) {
            this.tituloLivro = titulo;
            this.generoLivro = genero;
            this.autorLivro = autor;
            this.idLivro = id;
            this.avaliacaoLivro = avaliacao || [];
        }

        get titulo() {
            return this.tituloLivro;
        }

        set titulo(Titulo) {
            this.tituloLivro = Titulo;
        }

        get genero() {
            return this.generoLivro;
        }

        set genero(novoGenero) {
            this.generoLivro = novoGenero;
        }

        get autor() {
            return this.autorLivro;
        }

        set autor(novoAutor) {
            this.autorLivro = novoAutor;
        }

        get id() {
            return this.idLivro;
        }

        set id(novoId) {
            this.idLivro = novoId;
        }

        get avaliacao(){
            return this.avaliacaoLivro;
        }

        set avaliacao(Avaliacao){
            this.avaliacaoLivro = Avaliacao;
        }
    }

    const [screen, setScreen] = useState('inicialScreen');
    const [exibidorLivros, setExibidorLivros] = useState([]);
    const [title, setTitle] = useState('');
    const [genero, setGenero] = useState('');
    const [autor, setAutor] = useState('');
    const [idLivro, setIdLivro] = useState(0);
    const [idOperacoes, setIdOperacoes] = useState(0);

    useEffect(() => {
        setExibidorLivros(listaEmprestimo.livroEmprestimo);
    }, [listaEmprestimo.livroEmprestimo]);

    const adicionarLivro = () => {
        const newLivro = new Livro(title, genero, autor, idLivro,[]);
        var novoId = idLivro + 1;
        setIdLivro(novoId);
        const novaLista = [...listaEmprestimo.livroEmprestimo, newLivro];
        listaEmprestimo.livroEmprestimo = novaLista;
    }

    const editarLivro = () => {
        for (let i = 0; i < listaEmprestimo.livroEmprestimo.length; i++) {
            if (listaEmprestimo.livroEmprestimo[i].id === idOperacoes) {
                listaEmprestimo.livroEmprestimo[i].titulo = title;
                listaEmprestimo.livroEmprestimo[i].autor = autor;
                listaEmprestimo.livroEmprestimo[i].genero = genero;
            }
        }
    }

    const removerLivro = (id) => {
        const novaLista = listaEmprestimo.livroEmprestimo.filter(livro => livro.id !== id);
        listaEmprestimo.livroEmprestimo = novaLista;
        setScreen('inicialScreen');
        setTimeout(function () {
            setScreen('removeLivro');
        }, 1);
    }

    return (
        <div className="container">
            <div id="operacoes" className="operacoes">
                <div className="side">
                    <h1 className="LivroButtonsTitulo" style={{ alignSelf: 'center' }}>Livro</h1>
                    <button id="addLivroButton" onClick={() => setScreen('addLivro')}>Adicionar</button>
                    <button id="listaLivrosButton" onClick={() => setScreen('exibirLivros')}>Listar</button>
                    <button id="updateLivroButton" onClick={() => setScreen('attLivros')}>Atualizar</button>
                    <button id="deleteLivroButton" onClick={() => setScreen('removeLivro')}>Remover</button>
                    <button onClick={() => setTelaMenu('inicial')}>Voltar</button>
                </div>
                <div className="divider"></div>
                {screen === 'inicialScreen' && (
                    <div id="primeiraTela" className="primeiraTela">
                        <h1>Biblioteca Virtual</h1>
                        <img alt='' className="livroImagem" src={livroInicial} width="50%"></img>
                    </div>
                )}

                {screen === 'addLivro' && (
                    <div className="livroOperacoes" id="addLivro">
                        <h1>Cadastrar Livro</h1>
                        <input id="nomeLivro" type="text" placeholder="Digite o título do livro" onChange={(e) => setTitle(e.target.value)}></input>
                        <input id="generoLivro" type="text" placeholder="Digite o gênero" onChange={(e) => setGenero(e.target.value)}></input>
                        <input id="autorLivro" type="text" placeholder="Digite o autor" onChange={(e) => setAutor(e.target.value)}></input>
                        <button id="adicionarLivroEvent" onClick={adicionarLivro}>Adicionar</button>
                    </div>
                )}

                {screen === 'exibirLivros' && (
                    <div className='containerLista'>
                        {exibidorLivros.map(livro => (
                            <div className='listadorContainer' key={livro.id}>
                                <p>Título: {livro.titulo}</p>
                                <p>Gênero: {livro.genero}</p>
                                <p>Autor: {livro.autor}</p>
                                <img style={{ marginBottom: '10px' }} src={iconeCadaLivro} alt='' width={'40%'}></img>
                            </div>
                        ))}
                    </div>
                )}
                {screen === 'attLivros' && (
                    <div className='containerLista'>
                        {exibidorLivros.map(livro => (
                            <div className='listadorContainer' key={livro.id}>
                                <p>Título: {livro.titulo}</p>
                                <p>Gênero: {livro.genero}</p>
                                <p>Autor: {livro.autor}</p>
                                <button onClick={() => { setScreen('attLivrosCampos'); setIdOperacoes(livro.id) }} style={{ borderRadius: '0', width: '100%' }}>Atualizar</button>
                            </div>
                        ))}
                    </div>
                )}
                {screen === 'attLivrosCampos' && (
                    <div className="livroOperacoes" id="addLivro">
                        <h1>Editar Livro</h1>
                        <input id="nomeLivro" type="text" placeholder="Digite o novo título do livro" onChange={(e) => setTitle(e.target.value)}></input>
                        <input id="generoLivro" type="text" placeholder="Digite o novo gênero" onChange={(e) => setGenero(e.target.value)}></input>
                        <input id="autorLivro" type="text" placeholder="Digite o novo autor" onChange={(e) => setAutor(e.target.value)}></input>
                        <button id="adicionarLivroEvent" onClick={editarLivro}>Editar</button>
                    </div>
                )}

                {screen === 'removeLivro' && (
                    <div className='containerLista'>
                        {exibidorLivros.map(livro => (
                            <div className='listadorContainer' key={livro.id}>
                                <p>Título: {livro.titulo}</p>
                                <p>Gênero: {livro.genero}</p>
                                <p>Autor: {livro.autor}</p>
                                <button onClick={() => removerLivro(livro.id)} style={{
                                    borderRadius: '0', width: '100%',
                                    backgroundColor: 'red'
                                }}>Remover</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Biblioteca;