import React, {Component} from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginFailed:false
        }
    }

    handleChange = (event) => {
        const target = event.target;
        if (target.type === 'text')
            this.setState({'username': target.value});

        if (target.type === 'password')
            this.setState({'password': target.value});
    }

    render() {
        return (
            <div id='login'>
                <label>Username</label>
                <input type='text' value={this.state.username} placeholder='username' onChange={this.handleChange}/>
                <br/>
                <label>Password</label>
                <input type='password' value={this.state.password} placeholder='password' onChange={this.handleChange}/>
                <br/>
                <button type='button' onClick={this.perform_login}>Login</button>
                <br/>
                {this.state.loginFailed? <p>Login Failed!</p>:null}
                <br/><br/>
                <div>Bypass login using SQL injection. Enter the following text:
                <pre>' or ''='</pre>
                </div>
            </div>
        )
    }

    perform_login = () => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        })
            .then(res => res.json())
            .then((data) => {
                if (data.status === 'True'){
                    this.props.loginCallback(true,data.role)
                }
                else{
                    this.setState({loginFailed:true})
                    this.props.loginCallback(false,'')
                }

            })
            .catch(console.log)
    }

}

export default Login;
