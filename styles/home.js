import styled from 'styled-components'

export const Main = styled.main`
    //border: solid red;
`;

export const Cover = styled.section`
  height: 550px;
  display: flex;
`;

export const Description = styled.div`
  width: 50%;
  margin-top: 80px;

  h1 {
      font-size: 80px;
      line-height: 0.2;

  }

  h3 {
      font-size: 30px;
  }

  button {
      width: 140px;
      height: 40px;
      font-size: 18px;
      margin-right: 20px;
      margin-top: 20px;
      cursor: pointer;
      background-color: ${({theme}) => theme.colors.blue};
      color: ${({theme}) => theme.colors.text};
      border: none;
      border-radius: 10px;
      transition: 0.6s;

      &:hover,
      &:focus{
        background-color: ${({theme}) => theme.colors.blueHover};
        transform: translateY(-0.25em);
      }
  }
`;

export const Img = styled.div`
    margin-left: 90px;
`