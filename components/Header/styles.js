import styled from 'styled-components'

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1200px;
`;

export const Avatar = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    img {
      border-radius: 100%;
    }

    h2 {
        padding-left: 20px;
        font-size: 30px;
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
    
`