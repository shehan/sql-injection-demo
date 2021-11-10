import React, {Component} from "react";

class UserCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            status:''
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
            <div id='create'>
                <label>Username</label>
                <input type='text' value={this.state.username} placeholder='username' onChange={this.handleChange}/>
                <br/>
                <label>Password</label>
                <input type='password' value={this.state.password} placeholder='password' onChange={this.handleChange}/>
                <br/>
                <button type='button' onClick={this.perform_save}>Save</button>
                <br/>{this.state.status}<br/>

                <br/><br/>
                <div>SQL injection. Enter the following text in the password textbox:
                <pre>'); DELETE FROM users; --</pre> OR <pre>'); drop table if exists users; --</pre>
                </div>
            </div>
        )
    }

    perform_save = () => {
        fetch('http://localhost:5000/user', {
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
                    console.log("Item saved!")
                    this.setState({status:'Item saved!'})
                }
                else{
                    console.log("Item NOT saved!")
                    this.setState({status:'Item NOT saved!'})
                }

            })
            .catch(console.log)
    }

}

export default UserCreate;
