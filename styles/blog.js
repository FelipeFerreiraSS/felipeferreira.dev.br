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

    @media(max-width: 400px) {
        width: 380px;
        margin: auto;
        padding-left: 10px;
        margin-top: 30px;
        display: flex;
        flex-direction: column;

        img {
            width: 350px;
        }
    }

    @media(max-width: 330px) {
        width: 290px;
        margin: auto;

        img {
            width: 280px;
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

    @media(max-width: 400px) {
        p {
            max-width: 350px;
            text-align: center;
        }

        h2 {
            font-size: 35px;
            width: 350px;
            text-align: center;
        }

        div {
            width: 360px;
        }
    }

    @media(max-width: 330px) {
        h2 {
            font-size: 32px;
            max-width: 280px;
            text-align: center;
        }

        p {
            width: 280px;
        }

        div {
            width: 280px;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            p {
                width: auto;
                margin-bottom: 0px;
                margin-top: 5px;
            }
        }
    }
`
