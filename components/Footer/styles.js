import styled from 'styled-components'

export const SiteFooter = styled.div`
  display: flex;
  justify-content: space-between;
  height: 200px;
  border-top: solid #4D4D4D 1px;
  h2 {
    font-size: 35px;
    margin-bottom: -5px;
    margin-top: 10px;
    cursor: pointer;
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
`;

export const Copyright = styled.div`
  text-align: center;
`;
