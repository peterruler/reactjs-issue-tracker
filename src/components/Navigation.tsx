import CSS from 'csstype';

export const Navigation = () => {

    const navStyle: CSS.Properties = {
        backgroundColor: '#073642',
    };

    const headerStyle : CSS.Properties = {
        paddingBottom : '20px'
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
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            <i className="fas fa-bars"></i>     
                        </button>
                        <div className="navbar-collapse collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#about">Über</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="mailto:peter.stroessler@bluewin.ch?subject=todoapp">Kontakt</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
