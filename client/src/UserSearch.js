import React, {Component} from "react";

class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_result: '',
            search_string: ''
        }
    }

        handleChange = (event) => {
        const target = event.target;
        if (target.type === 'text')
            this.setState({'search_string': target.value});
    }
        render() {
        return (
            <div id='users'>
                <div>
                    <label>Enter User Name</label>
                    <input type='text' placeholder='search text' onChange={this.handleChange}/>
                    <button type='button' onClick={this.perform_search}>Search</button>
                    <br/><br/>
                    <p>SQL injection: <pre>';select * from users;--';</pre> or <pre>';select * from pg_tables;--';</pre></p>
                </div>
                <br/><br/>
                <div>
                    {this.state.search_result}
                </div>
            </div>
        )
    }

    perform_search = () => {
        fetch('http://localhost:5000/search?q='+this.state.search_string, { method: 'GET'})
            .then(res => res.text())
            .then((data) => {
                this.setState({search_result: data})
                console.log(JSON.parse(data))
            })
            .catch(console.log)
    }

}

export default UserSearch;
