import styled from 'styled-components'

export const Main = styled.main`

  @media(max-width: 1030px) {
    width: 900px;
  }
  
  @media(max-width: 770px) {
    width: 700px;
    margin: auto;
  }

  @media(max-width: 400px) {
    width: 350px;
    margin: auto;
  }

  @media(max-width: 330px) {
    width: 300px;
  }
`;

// Principal
export const Cover = styled.section`
  height: 550px;
  display: flex;

  @media(max-width: 1030px) {
    height: 400px;
  }

  @media(max-width: 400px) {
    height: 330px;
  }
`;

export const Description = styled.div`
  width: 50%;
  margin-top: 60px;

  h1 {
    font-size: 80px;
    line-height: 0.2;
  }

  h3 {
    font-size: 30px;
  }

  @media(max-width: 1030px) {
    margin-top: 30px;
  
    h1 {
      font-size: 60px;
      width: 450px;
    }
  }

  @media(max-width: 770px) {
    margin-top: 0px;

    h1 {
      font-size: 50px;
      width: 350px;
    }

    h3 {
      font-size: 30px;
      width: 250px;
    }
  }

  @media(max-width: 400px) {
    width: 100%;
    margin-top: 30px;
    text-align: center;

    h3 {
      font-size: 27px;
      width: 100%;
    }

    div {
      button {
        margin: 10px;
        margin-top: 20px;
      }
    }
  }

  @media(max-width: 330px) {
    h1 {
      font-size: 44px;
      width: 300px;
    }

    h3 {
      font-size: 22px;
      width: 100%;
    }

    div {
      button {
        margin: 10px;
        margin-top: 20px;
      }
    }
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

  @media(max-width: 770px) {
    margin-left: 0px;
  }

  @media(max-width: 400px) {
    display: none;
  }
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

  @media(max-width: 400px) {
    flex-direction: column;
    height: 1050px;

    h2 {
      text-align: center;
    }

    p {
      width: 100%;
    }
  }
`

export const AboutMe = styled.div`
  width: 50%;

  p {
    margin-top: -13px;
  }

  @media(max-width: 770px) {
    p {
      width: 300px;
    }
  }

  @media(max-width: 400px) {
    width: 100%;

    p {
      width: 350px;
      text-align: center;
    }

    div {
      button {
        margin: 13px;
        margin-top: 20px;
      }
    }
  }

  @media(max-width: 330px) {
    p {
      width: 300px;
    }

    div {
      button {
        margin: auto;
        margin-top: 20px;
        display: block;
      }
    }
  }
  
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

  @media(max-width: 400px) {
    ul {
      justify-content: center;
    }
  }
`

export const Knowledge = styled.div`
  width: 50%;

  @media(max-width: 400px) {
    h2 {
      width: 350px;
      text-align: center;
    }
  }  

  @media(max-width: 330px) {
    h2 {
      font-size: 38px;
      width: 300px;
    }
  }
`
export const Technology = styled.div`
  width: 500px;

  @media(max-width: 1030px) {
    width: 450px;
  }

  @media(max-width: 770px) {
    width: 370px;
    margin-left: -20px;
  }

  @media(max-width: 400px) {
    width: 350px;
    margin: auto;
  }

  @media(max-width: 330px) {
    width: 300px;
  }
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

  @media(max-width: 400px) {
    height: 850px;

    h2 {
      width: 350px;
      text-align: center;
    }
  }

  @media(max-width: 330px) {
    h2 {
      width: 300px;
    }
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
    border-radius: 10px;
  }

  @media(max-width: 770px) {
    img {
      width: 300px;
      height: 170px;
    }

    p {
      width: 300px;
    }
  }

  @media(max-width: 400px) {
    flex-direction: column;

    div {
      width: 100%;
    }

    img {
      margin-left: 30px;
    }

    h3 {
      font-size: 22px;
      text-align: center;
    }

    p {
      width: 350px;
      text-align: center;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
    }
  }

  @media(max-width: 330px) {
    img {
      margin-left: 3px;
    }

    p {
      width: 300px;
    }
  }
`

// LatestPosts

export const Posts = styled.section`
  height: 840px;

  h2 {
    font-size: 45px;
  }

  @media(max-width: 400px) {
    height: 1500px;

    h2 {
      text-align: center;
    }
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
    border-radius: 15px;
  }

  @media(max-width: 1030px) {
    width: 100%;
  }

  @media(max-width: 400px) {
    div {
      flex-direction: column;
      align-items: center;
    }

    img {
      margin: auto;
    }
  }
  
`

export const DescriptionPost = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;

  h3 {
    font-size: 30px;
    max-width: 500px;
    cursor: pointer;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  span {
    width: 700px;
  }

  p {
    width: 500px;
  }

  time {
    width: 420px;
    margin-right: 10px;
  }

  div {
    width: 330px;
    height: 30px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  @media(max-width: 770px) {
    h3 {
      max-width: 400px;
    }

    p {
      max-width: 400px;
    }

    span {
      max-width: 200px;
    }
  }

  @media(max-width: 400px) {
    h3 {
      text-align: center;
    }

    p {
      max-width: 350px;
      text-align: center;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      width: 350px;

      time {
        width: 120px;
        margin-right: 0px;
      }

      span {
        width: 150px;
      }
    }

    @media(max-width: 330px) {
      div {
        width: 300px;
      }
    }
  }

  @media(max-width: 330px) {
    h3 {
      width: 300px;
    }

    p {
      width: 300px;
    }
  }

`
export const AllPosts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width: 1030px) {
    width: 900px;
  }

  @media(max-width: 770px) {
    width: 700px;
  }

  @media(max-width: 400px) {
    width: 350px;
    div {
      button {
        margin: auto;
        margin-top: -10px;
      }
    }
  }

  @media(max-width: 330px) {
    width: 300px;
  }
`

export const Tags = styled.div`
  width: 30%;
  text-align: center;

  @media(max-width: 1030px) {
    display: none;
  }
`

export const AllTagsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    width: 100px;
    height: 45px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.blue};
    margin: 10px;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    width: 100px;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  @media(max-width: 1030px) {
    display: none;
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

  @media(max-width: 1030px) {
    height: 600px;
  }

  @media(max-width: 400px) {
    height: 700px;
  }

  @media(max-width: 330px) {
    h2 {
      font-size: 37px;
      margin-top: 70px;
    }
  }
  
`

export const BoxMenssages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  @media(max-width: 1030px) {
    img {
      width: 400px;
    }
  }

  @media(max-width: 770px) {
    img {
      width: 300px;
    }
  }

  @media(max-width: 400px) {
    display: block;
    img {
      display: none;
    }
  }
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

  @media(max-width: 1030px) {
    textarea {
      height: 230px;
    }
  }

  @media(max-width: 400px) {
    width: 100%;
    margin-left: 0px;
  }
`