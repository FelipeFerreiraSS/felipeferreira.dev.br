import styled from 'styled-components'

export const PostImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 10px;
  }

  @media(max-width: 430px) {
    img {
      max-width: 100%;
    }
  }
`;