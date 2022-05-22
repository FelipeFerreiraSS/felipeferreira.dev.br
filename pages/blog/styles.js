import styled from 'styled-components'

export const MainPost = styled.main`
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 800px;
  }

  h1 {
    text-align: center;
    font-size: 45px;
  }
`;

export const Thumbnail = styled.div`
    img {
        border-radius: 20px;
        width: 100%;
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
