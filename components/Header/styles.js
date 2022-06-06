import styled from 'styled-components'

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;

  svg {
    display: none;
  }

  @media(max-width: 1030px) {
    width: 900px;
  }

  @media(max-width: 770px) {
    width: 800px;
  }

  @media(max-width: 400px) {
    max-width: 380px;
    margin: auto;
    margin-top: 10px;

    svg {
      display: initial;
      margin-right: 10px;
    }
  }

  @media(max-width: 330px) {
    max-width: 310px;
  }
`;

export const Avatar = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  img {
    border-radius: 100%;
    cursor: pointer;
  }
  h2 {
    padding-left: 20px;
    font-size: 30px;
    cursor: pointer;
  }

  @media(max-width: 770px) {
    padding-left: 40px;
  }

  @media(max-width: 400px) {
    width: 90%;
    margin-left: -30px;

    h2 {
      width: 300px;
      font-size: 23px;
    }
  }

  @media(max-width: 330px) {
    h2 {
      font-size: 19px;
    }
  }
`

export const MenuBig = styled.div`
  width: 50%;
  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  li {
    padding: 20px;
    font-size: 20px;
    list-style-type: none;
  }

  @media(max-width: 430px) {
    display: none;
  }
    
`