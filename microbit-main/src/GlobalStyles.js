import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
        height: 100%;
        margin: 0;
    }

    body {
        height: 100%;
        margin: 0;
        font-size: 18px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        line-height: 1.6;
        color: black;
    }

    a {
        text-decoration: none;
    
    }
    a:hover {
        text-decoration: none;
    }
    
    .MuiButton-containedPrimary:hover {
        color: white;
    }

    h1,h2,h3,h4,h5 {
        font-family: Boogaloo;
    }

    
`;
