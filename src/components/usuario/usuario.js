import './usuario.css';
import React, { useState } from 'react';

function Usuario({ listaUsuarios, setListaUsuarios, setIdLogado, setTelaPrincipal}) {
    class User {
        constructor(nome, email, senha, id,emprestimos) {
            this.nomeUser = nome;
            this.emailUser = email;
            this.senhaUser = senha;
            this.idUser = id;
            this.emprestimosUser = emprestimos || [];
        }

        get nome() {
            return this.nomeUser;
        }

        set nome(Nome) {
            this.nomeUser = Nome;
        }

        get email() {
            return this.email;
        }

        set email(Email) {
            this.emailUser = Email;
        }

        get senha() {
            return this.senhaUser;
        }

        set senha(Senha) {
            this.senhaUser = Senha;
        }

        get id() {
            return this.idUser;
        }

        set id(Id) {
            this.idUser = Id;
        }

        get emprestimos(){
            return this.emprestimosUser;
        }

        set emprestimos(Emprestimos){
            this.emailUser = Emprestimos;
        }
    }

    const [screen, setScreen] = useState('login');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idAux, setIdAux] = useState(0);
    const [mensagem,setMensagem] = useState('');

    const checarEmail = () => {
        for (let i = 0; i < listaUsuarios.length; i++) {
            if (listaUsuarios[i].emailUser === email) {
                return false;
            }
        }
        return true;
    }

    const addUser = () => {
        if (checarEmail()) {
            const novoUsuario = new User(nome, email, senha, idAux);
            setIdLogado(idAux);
            var novoId = idAux + 1;
            setIdAux(novoId);
            const novaLista = [...listaUsuarios, novoUsuario];
            setListaUsuarios(novaLista);
            setTelaPrincipal('menu');
        }
        else{
            setMensagem('E-mai já existente no sistema');
        }
    }

    const verificaLogin = () =>{
        for (let i = 0; i < listaUsuarios.length; i++) {
            if (listaUsuarios[i].emailUser === email && listaUsuarios[i].senhaUser === senha) {
                setIdLogado(listaUsuarios[i].idUser);
                return true;
            }
        }
        return false;
    }  

    const entrar = () =>{
       if(verificaLogin()){
        setTelaPrincipal('menu');
       }
       else{
        setMensagem('Login incorreto');
       }
    }

    return (
        <div className="container">
            {screen === 'login' && (
                <div id="operacoes" className="operacoes login">
                    <h1>Login</h1>
                    <input type='text' placeholder='Digite seu e-mail' onChange={(e) => setEmail(e.target.value)}></input>
                    <input type='password' placeholder='Digite sua senha' onChange={(e) => setSenha(e.target.value)}></input>
                    <p style={{color:'white', marginTop:'0', marginBottom:'0'}}>{mensagem}</p>
                    <div className='botoesLogin'>
                        <button onClick={entrar}>Entrar</button>
                        <button onClick={() => { setScreen('sigin'); setEmail(''); setSenha('');setMensagem('')}}>Cadastre-se</button>
                    </div>
                </div>
            )}

            {screen === 'sigin' && (
                <div id="operacoes" className="operacoes login">
                    <h1>Cadastre-se</h1>
                    <input type='text' placeholder='Digite seu nome' onChange={(e) => setNome(e.target.value)}></input>
                    <input type='text' placeholder='Digite seu e-mail' onChange={(e) => setEmail(e.target.value)}></input>
                    <input type='password' placeholder='Digite sua senha' onChange={(e) => setSenha(e.target.value)}></input>
                    <p style={{color:'white', marginTop:'0', marginBottom:'0'}}>{mensagem}</p>
                    <div className='botoesLogin'>
                        <button onClick={addUser}>Cadastre-se</button>
                    </div>
                    <p className='voltar' onClick={() => { setScreen('login'); setEmail(''); setNome(''); setSenha('');setMensagem('')}}>Voltar para login</p>
                </div>
            )}
        </div>
    )
}
export default Usuario;