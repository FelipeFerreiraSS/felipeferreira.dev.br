import styled from 'styled-components'

export const MainPost = styled.main`
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  div {
    width: 800px;
  }

  h1 {
    text-align: center;
    font-size: 45px;
  }

  @media(max-width: 770px) {
    width: 800px;

    div {
        width: 600px;
    }
  }

  @media(max-width: 400px) {
    width: 380px;
    margin: auto;

    div {
        width: 350px;
    }

    h1 {
        font-size: 39px;
    }
  }

  @media(max-width: 330px) {
    width: 320px;
    margin: auto;

    div {
        width: 290px;
    }

    h1 {
        font-size: 29px;
    }
  }
`;

export const Thumbnail = styled.div`
    img {
        border-radius: 20px;
        width: 100%;
        margin-top: 30px;
    }
`;

export const PostData = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -15px;

    time {
        margin-right: 20px;
    }

    span {
        margin-right: 20px;
    }

    @media(max-width: 330px) {
        flex-direction: column;
    }
`;

export const Post = styled.article`
    pre {
        border-radius: 20px;
    }

    h2 {
        font-size: 28px;
    }

    p {
        font-size: 20;
    }
`;
