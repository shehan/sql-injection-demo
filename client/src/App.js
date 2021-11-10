import React, {Component} from "react";
import Login from "./Login";
import UserSearch from "./UserSearch";
import UserCreate from "./UserCreate";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            role: 'User'
        }
    }
    handleLoginCallback = (status, role) =>{
        this.setState({authenticated: status, role:role})
    }

    render() {
        return (
            // <div>
            //     {!this.state.authenticated ? <Login loginCallback={this.handleLoginCallback} /> :
            //         <div>Welcome! Role: {this.state.role}</div>}
            // </div>

            // <div>
            //     <UserSearch/>
            // </div>

            <div><UserCreate/></div>
        )
    }


}

export default App;
