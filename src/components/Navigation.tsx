import { useState, useEffect } from 'react'
import CSS from 'csstype';

export const Navigation = () => {

    const [state,setState]  = useState('navbar-collapse collapse');

    useEffect(() => {
        setState('navbar-collapse collapse');
    }, [])

    const navStyle: CSS.Properties = {
        backgroundColor: '#073642',
    };

    const headerStyle : CSS.Properties = {
        paddingBottom : '20px'
    }

    const updateNavi = () => {
        setState("navbar-collapse collapse");
        let element = document.getElementById('navbarNavDropdown') as HTMLElement;
        element.style.display = "none";
    }

    const resetNavi = () => {
        const toggler = document.querySelector("button.navbar-toggler") as HTMLElement;
        toggler.click();
        toggler.className = 'navbar-toggler collapsed'
        toggler.setAttribute('aria-expanded',"false");
        let element = document.getElementById('navbarNavDropdown') as HTMLElement;
        element.style.display = "block";
        setState("navbar-collapse collapse show");
    }

    return (
        <>
            <header style={headerStyle}>
                <nav className="navbar navbar-expand-lg" style={navStyle}>
                    <div className="container-fluid container">
                        <a className="navbar-brand" href="/"><img
                        src="./img/bug-white-32.png"
                        alt="bug tracker"
                        className="bug-logo" /><span className="title">Issue
                                Tracker</span></a>
                        <button onClick={resetNavi} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            <i className="fas fa-bars"></i>     
                        </button>
                        <div className={state} id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/" onClick={updateNavi}>Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#about"  onClick={updateNavi}>Über</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="mailto:peter.stroessler@bluewin.ch?subject=todoapp" onClick={updateNavi}>Kontakt</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
