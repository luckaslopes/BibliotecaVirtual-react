import Menu from './components/menuPrincipal/menu';
import Usuario from './components/usuario/usuario';
import { useState } from 'react';

function App() {
  const [telaPrincipal, setTelaPrincipal] = useState('login');
  const [listaUsuarios,setListaUsuarios] = useState('');
  const [idLogado, setIdLogado] = useState(0);

  const procuraLogado = () =>{
    for(let i=0;i<listaUsuarios.length;i++){
      if(listaUsuarios[i].idUser === idLogado){
        return listaUsuarios[i];
      }
    }
    return null;
  }

  return (
    <div className="App">
      {telaPrincipal === 'login' && (
        <Usuario listaUsuarios={listaUsuarios} setListaUsuarios={setListaUsuarios} setIdLogado={setIdLogado} setTelaPrincipal={setTelaPrincipal}/>
      )}
      {telaPrincipal === 'menu' && (
        <Menu procuraLogado={procuraLogado()} setTelaPrincipal={setTelaPrincipal}/>
      )}
    </div>
  );
}

export default App;
