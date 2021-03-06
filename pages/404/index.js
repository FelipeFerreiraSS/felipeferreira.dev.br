import { Content, Menssagem, Imagem } from './styles.js'

import { Button } from '../../styles/home.js';
import Link from 'next/link.js';

export default function Error404() {
  return (
    <Content>
      <Menssagem>
        <h1>404</h1>
        <div>
          <h2>Ooops!</h2>
          <h2>Página não encontrada</h2>  
        </div>
        <p>Esta página não existe ou foi removida!</p>
        <p>Recomendo que volte para a Home</p> 
        <Button>
          <Link href={"/"}>
            <button>Home</button>
          </Link>
        </Button>
      </Menssagem>
      <Imagem>
        <img src='/404-error.svg'/>        
        <a href="https://storyset.com/web">Web illustrations by Storyset</a>
      </Imagem>
      
    </Content>
  );
}