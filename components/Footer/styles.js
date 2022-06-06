import styled from 'styled-components'

export const SiteFooter = styled.div`
  display: flex;
  justify-content: space-between;
  height: 200px;
  border-top: solid #4D4D4D 1px;
  margin-top: 20px;
  h2 {
    font-size: 35px;
    margin-bottom: -5px;
    margin-top: 10px;
    cursor: pointer;
  }

  @media(max-width: 770px) {
    width: 700px;
    margin-left: 70px;
  }

  @media(max-width: 400px) {
    width: 360px;
    height: 300px;
    margin-top: 20px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      width: 240px;
    }
  }

  @media(max-width: 330px) {
    width: 310px;
    margin-top: 20px;

    h2 {
      width: 250px;
      
    }
  }
`;

export const Links = styled.div`
  display: flex;

  div {
    margin-right: 100px;

  }

  h4 {
    font-size: 20px;
  }

  li {
    padding-bottom: 10px;
    margin-left: -40px;
    list-style-type: none;
  }

  @media(max-width: 400px) {
    div {
      width: 130px;
      margin-right: 0px;
    }
  }
`;

export const Copyright = styled.div`
  text-align: center;

  @media(max-width: 400px) {
    p {
      width: 380px;
      margin: auto;
      margin-top: 30px;
    }
  }

  @media(max-width: 330px) {
    p {
      width: 260px;
    }
  }
`;
