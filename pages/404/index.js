import { Content, Menssagem, Imagem } from './styles.js'

import { Button } from '../../styles/home.js';
import Link from 'next/link.js';
import HeadTag from '../../components/HeadTag/index.js';

export default function Error404() {
  return (
    <Content>
      <HeadTag
        title={"Felipe Ferreira | Dev Front-End"}
        description={"Desenvolvedor Front-End Jr"}
      />
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
        <picture>
          <img src='/404-error.svg'/>        
        </picture>
        <a href="https://storyset.com/web" target="_blank" rel="noopener noreferrer">Web illustrations by Storyset</a>
      </Imagem>
      
    </Content>
  );
}