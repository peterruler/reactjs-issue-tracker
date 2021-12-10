import React from 'react'
import CSS from 'csstype';


export const Footer = () => {
    const style: CSS.Properties = {
        paddingTop: "20px",
    };
    let date = new Date().getFullYear();
    return (<footer style={style} id="about" className="mt-auto text-white-50 text-center">
         <a href="https://peterruler.github.io" className="text-white"> Made with <i className="fa fa-heart" aria-hidden="true"></i> by peter &copy; {date}</a>
         </footer>
    )
}
