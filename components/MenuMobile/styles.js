import styled from 'styled-components'

export const Conteiner = styled.div`
  display: none;

  li {
    list-style-type: none;
    font-size: 25px;
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
    width: 50px;
    height: 40px;
    left: -10px;
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

  @media(max-width: 330px) {
    .bm-burger-button {
      width: 45px;
      height: 35px;
    }

    .bm-cross-button {
      width: 30px !important;
      height: 30px !important;
    }

    li {
      font-size: 20px;
    }
  }
`