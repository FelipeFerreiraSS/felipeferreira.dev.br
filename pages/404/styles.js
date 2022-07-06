import styled from 'styled-components'

export const Content = styled.div`
    height: 400px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const Menssagem = styled.div`
    display: flex;
    flex-direction: column;

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
    flex-direction: column;

    img {
        width: 500px;
        margin-top: -30px;
    }

    a {
        font-size: 8px;
        color: ${({theme}) => theme.colors.gray};
        margin: auto;
        margin-top: -80px;
    }
`;