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

// LatestPosts

export const Posts = styled.section`
  height: 840px;

  h2 {
    font-size: 45px;
  }
  
`

export const LatestPosts = styled.div`
  display: flex;
  
`

export const DisplayingPosts = styled.div`
  width: 70%;

  div {
    display: flex;
    margin-bottom: 20px;
  }

  img {
    width: 300px;
    height: 169px;
    margin-right: 20px;
  }

  
`

export const DescriptionPost = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;

  h3 {
    font-size: 30px;
    width: 500px;
    cursor: pointer;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  p {
    width: 500px;
  }

  time {
    margin-right: 10px;
  }

  div {
    width: 160px;
    height: 30px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`
export const AllPosts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Tags = styled.div`
  width: 30%;
  text-align: center;
`

export const AllTagsGrid = styled.div`
  display: flex;
  justify-content: space-evenly;

  div {
    display: flex;
    width: 110px;
    height: 40px;
    border-radius: 20px;
    background-color: ${({theme}) => theme.colors.blue};
    margin: 10px;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    width: 100px;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`

// Contact 
export const Contact = styled.section`
  height: 670px;

  h2 {
    font-size: 45px;
    margin-bottom: 8px;
    text-align: center;
  }

  p {
    text-align: center;
  }
  
`

export const BoxMenssages = styled.div`
  display: flex;
  margin-top: 50px;
`

export const Menssages = styled.div`
  width: 50%;
  margin-left: 70px;

  div {
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    height: 45px;
    font-size: 20px;
    border-radius: 20px;
    border: solid ${({theme}) => theme.colors.text} 1px;
    background-color: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.text};
    padding-left: 20px;
    ::placeholder {
      color: ${({theme}) => theme.colors.text};
      font-size: 20px;
    }
  }



  textarea{
    width: 100%;
    height: 270px;
    font-size: 20px;
    border-radius: 20px;
    border: solid ${({theme}) => theme.colors.text} 1px;
    background-color: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.text};
    padding-left: 20px;
    padding-top: 10px;
    resize: none;
    ::placeholder {
      color: ${({theme}) => theme.colors.text};
      font-size: 20px;
    }
  }

  button {
    width: 100%;
    height: 40px;
    font-size: 20px;
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