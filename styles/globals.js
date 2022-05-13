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
	}
	
	a {
	  	color: inherit;
	  	text-decoration: none;
	}
	
	* {
	  	box-sizing: border-box;
	} 
  
`