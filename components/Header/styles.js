import styled from 'styled-components'

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1200px;

  @media(max-width: 1030px) {
    width: 900px;
  }

  @media(max-width: 770px) {
    width: 800px;
  }

  @media(max-width: 430px) {
    width: 600px;
  }
`;

export const Avatar = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  
  img {
    border-radius: 100%;
  }
  h2 {
    padding-left: 20px;
    font-size: 30px;
  }

  @media(max-width: 770px) {
    padding-left: 40px;
  }

  @media(max-width: 430px) {
    width: 70%;
    margin-left: 180px;
  }
`

export const Menu = styled.div`
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
    width: 30%;
  }
    
`