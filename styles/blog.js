import styled from 'styled-components'

export const DisplaysPosts = styled.div`
    display: flex;
    margin: 30px;
    img {
        width: 400px;
        border-radius: 10px;
        margin-right: 20px;
    }

    @media(max-width: 1030px) {
        width: 900px;
    }

    @media(max-width: 770px) {
        width: 740px;

        img {
            width: 300px;
        }
    }

    @media(max-width: 430px) {
        width: 500px;
        margin-left: 230px;
        display: flex;
        flex-direction: column;

        img {
            width: 500px;
        }
    }

    @media(max-width: 380px) {
        width: 480px;
        margin-left: 250px;

        img {
            width: 480px;
        }
    }

`;

export const DisplaysDescription = styled.div`
    h2 {
        font-size: 40px;
        cursor: pointer;
        margin: 0px;
        max-width: 700px;
    }

    div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        margin-bottom: -15px;

        time {
            margin-right: 10px;
        }

        p {
            margin-right: 10px;
        }
    }

    p {
        max-width: 700px;
    }
`
