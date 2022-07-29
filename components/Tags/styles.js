import styled from 'styled-components'

export const ListTags = styled.div`

    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    button {
      width: 140px;
      height: 45px;
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

    @media(max-width: 430px) {
        display: none;
    }
`;