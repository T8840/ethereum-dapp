import Admin from './Admin'
import Profile from './pages/profile'
import Settings from './pages/settings'
import Student from './pages/student'
import Teacher from './pages/teacher'
import { useContext } from "react";
import { VoterContext } from "./Context/Context";
import Home from './Home';

//Routing is present at RouteApp.jsx

function App() {

    // const { isManager, errorPage } = useContext(VoterContext)
    // return (<>{!errorPage ? (isManager ? <Admin /> : <Voter />) : <Home />}</>)
    const { nftRole, errorPage } = useContext(VoterContext)
    return (<>{!errorPage ? (nftRole == '2' ? <Teacher /> : <Student />) : <Home />}</>)

}

export default App