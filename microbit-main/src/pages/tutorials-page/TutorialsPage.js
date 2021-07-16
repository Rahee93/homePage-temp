import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import "./TutorialsPage.scss"

const TutorialsPage = () => {
    return (
        <div>
            <Header />
            <div className="section TutorialsPage">
                
                <div className="TutorialsPage-banner">
                    <h1 className="TutorialsPage-banner__title">Tutorials</h1>
                </div>
                <div className="TutorialsPage-content">
                    <div className="TutorialsPage-Paragraph">
                        <p>This is an example tutorial - read through below or try it here: <a href="https://makecode.microbit.org/#tutorial:github:justinblack0454/hello-tutorial/tutorial">MakeCodeExampleTutorial</a></p>
                    </div>
                    <div className="TutorialsPage-Instructions">
                        <iframe className="TutorialsPage-Instructions__frame" src="https://justinblack0454.github.io/hello-tutorial/tutorial"></iframe>
                    </div>
                    <div className="TutorialsPage-Paragraph">
                        <p>This is the example tutorial nested in an iframe (not appearing correctly):</p>
                    </div>
                    
                    <div className="TutorialsPage-Simulator">
                        <iframe className="TutorialsPage-Simulator__frame" src="https://makecode.microbit.org/#tutorial:github:justinblack0454/hello-tutorial/tutorial" allowfullscreen="allowfullscreen" frameborder="0" sandbox="allow-scripts allow-same-origin"></iframe>
                    </div>
                </div>
            </div>  
            <Footer />
        </div>
    );
};


export default TutorialsPage;