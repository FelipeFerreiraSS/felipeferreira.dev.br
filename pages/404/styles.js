import styled from 'styled-components'

export const Content = styled.div`
    height: 400px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media(max-width: 770px) {
        justify-content: space-evenly;
    }

    @media(max-width: 400px) {
        flex-direction: column-reverse;
        height: 700px;
    }

    @media(max-width: 330px) {
        
    }
`;

export const Menssagem = styled.div`
    display: flex;
    flex-direction: column;

    @media(max-width: 770px) {
        
    }

    h1 {
        font-size: 70px;
        line-height: 0.1;
    }

    h2 {
        line-height: 0.5;
    }

    div {
        margin-bottom: 20px;
    }

    p {
        line-height: 0.1;
    }
`;

export const Imagem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
        width: 500px;
        margin-top: -30px;

        @media(max-width: 770px) {
            width: 400px;
            margin-right: -100px;
        }

        @media(max-width: 400px) {
            width: 350px;
            margin-right: 0px;
        }

        @media(max-width: 330px) {
            width: 300px;
        }
    }

    a {
        font-size: 8px;
        color: ${({theme}) => theme.colors.gray};
        margin-top: -80px;

        @media(max-width: 770px) {
            margin-top: -60px; 
            
        }

        @media(max-width: 400px) {
            margin-top: -40px; 
            
        }
    }
`;