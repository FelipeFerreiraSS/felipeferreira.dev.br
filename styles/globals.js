import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
	html,
	body {
		background-color: ${({theme}) => theme.colors.background};
		color: ${({theme}) => theme.colors.text};
	  	padding: 0;
	  	margin: 0;
	  	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
	    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		
		display: flex;
		justify-content: center;
		align-items: center;

		scroll-behavior: smooth;

	}

	body::-webkit-scrollbar {
		width: 8px; 
	}

	body::-webkit-scrollbar-track {
		background: ${({theme}) => theme.colors.background}; 
	}

	body::-webkit-scrollbar-thumb {
		background-color: ${({theme}) => theme.colors.gray}; 
		border-radius: 20px; 
	}
	
	a {
	  	color: inherit;
	  	text-decoration: none;
	}

	p {
		font-size: 18px;
	}
	
	* {
	  	box-sizing: border-box;
	} 
  
`