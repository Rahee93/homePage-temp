import React from 'react';
import emailjs from 'emailjs-com';
import "./Mailer.scss";


function Mailer (){

    function sendEmail(e){
        e.preventDefault();
        emailjs.sendForm('service_k9qf7kj',
        'template_5lbfvth',
        e.target,
        'user_dzzPoKpS5jaXzrHsiQxGu'
        ).then(res=>{
            console.log(res);
        }).catch(err=> console.log(err));

        e.preventDefault();
        alert('Thank you, we will contact you soon.');

        document.forms['form'].reset();

      }
    
    return (

        <div className="container">
             <div className="section ContactPage">
                <div className="ContactPage-banner">
                    <h1 className="ContactPage-banner__title">Contact Us</h1>
                </div>

        <div className="ContactPage-content">
        <p className="ContactPage-text">
          If you would like to contact us, contribute to our gallery, report any
          technical difficulties you experience with our website, or provide
          suggestions for improvement, please email us
        </p>
        <p className="ContactPage-text">We appreciate your help!</p>

            <form method="POST" className="form" onSubmit={sendEmail} name="form">
                <div className="row">
                <label className="labels">Name</label>
                <input type="text" name="name" className="input"/>
                </div>

                <div className="row">
                <label className="labels">Email</label>
                <input type="email" name="email" className="input"/>
                </div>
                <div className="row">
                <label className="labels">Message</label>                
                <textarea name="message" rows='4' className="input"/>
                <input type="submit" value="Send" onClick="submit_form();"/>
                </div>
            </form>
            
            </div>
        </div>
        </div>
    );
};



export default Mailer;

