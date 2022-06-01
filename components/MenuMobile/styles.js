import styled from 'styled-components'

export const Conteiner = styled.div`
  display: none;

  li {
    list-style-type: none;
    font-size: 30px;
    margin-bottom: 20px;
  }

  .bm-item {
    display: inline-block;
    margin-bottom: 10px;
    text-align: left;
    transition: color 0.2s;
  }

  .bm-menu {
    background: black;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
    top: 40px;
  }

  .bm-menu-wrap {
    top: 0px;
  }

  .bm-cross-button {
    width: 40px !important;
    height: 40px !important;
    top: 20px !important;
    right: 20px !important;
  }

  .bm-burger-button {
    position: relative;
    width: 70px;
    height: 60px;
    left: -30px;
  }

  .bm-cross {
    top: 50px;
    right: 50px;
  }

  .bm-overlay {
    top: 0px;
    left: -50px;
    background: rgba(0, 0, 0, 0.6) !important;
  }

  @media(max-width: 430px) {
    display: initial;
  }
`