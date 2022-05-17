import styled from 'styled-components'

export const Main = styled.main`

`;

// Principal
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
`;


export const Button = styled.div`
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
`

export const Img = styled.div`
    margin-left: 90px;
`

// Sobre

export const About = styled.section`
  height: 580px;
  display: flex;
  h2 {
    font-size: 45px;
  }

  p {
    width: 400px;
    font-size: 20px;
  }
`

export const AboutMe = styled.div`
  width: 50%;
`

export const SocialIcons = styled.div`
  margin-left: -40px;
  
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  li {
    width: 50px;
    height: 50px;
    list-style-type: none;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  img {
    width: 40px;
    height: 40px;
  }
`

export const Resume = styled.div`
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
`

export const Knowledge = styled.div`
  width: 50%;
`
export const Technology = styled.div`
  width: 500px;
`
export const TechnologyGrid = styled.div`
  display: flex;
  justify-content: space-between;
  
  div {
    width: 127px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 70px;
    height: 70px;
  }

  p {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`

// Projects

export const Projects = styled.section`
  height: 550px;

  h2 {
    text-align: center;
    font-size: 45px;
  }
  
`

export const AllProjects = styled.div`
  display: flex;

  div {
    width: 50%;
  }

  p {
    width: 400px;
  }

  img {
    width: 450px;
    height: 218px;
  }
`
