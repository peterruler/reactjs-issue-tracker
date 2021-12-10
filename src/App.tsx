import './App.css';
import CSS from 'csstype';
import { Navigation } from './../src/components/Navigation'
import { CreateProject } from './../src/components/CreateProject'
import { ProjectsDropdown } from './../src/components/ProjectsDropdown'
import { IssuesList } from './components/IssuesList';
import { NewIssue } from './components/NewIssue';
import { Footer } from './components/Footer';
import Util from './components/Util';

function App() {

  const titleStyle: CSS.Properties = {
    paddingBottom: '16px',
    color: "#fff",
    fontSize: '16px'
  }
  const hiddenStyle: CSS.Properties = {
    display : "none"
  }

  const utl = new Util();
  utl.attachClick()
  return (<>
  <h1 style={hiddenStyle}>Peter Strössler</h1>
    <Navigation />
    <div className="container">
      <div className="row align-items-center">

        <h2 className="projekte" style={titleStyle}>Projekte</h2>
        <div className="col-md-3">
          <ProjectsDropdown />
        </div>
        <div className="col-md-9 create-project-inpt-grp">
          <CreateProject />
        </div>
      </div>
      <hr className="kitn-section-divider" />
      <h2 className="issues" style={titleStyle}>Issues</h2>
      <NewIssue />
      <IssuesList />
      <Footer/>
    </div>
  </>
  );
}

export default App;
