import React, { Component } from 'react';
// Classes and Forms
// example 2
class User { // as ususal starts with capital letter
  constructor(userName, userAge, userEmail) {
    this.username = userName;
    this.age = userAge;
    this.email = userEmail;
  }

  getName () {
    console.log(this.username);
  }
  sayHello() {
    console.log('Hi, I am ', this.age, ' old')
  }
}

class Admin extends User { // inheritance (polymorphism, incapsulation, abstraction)
  constructor(username, age, email, city) {
    super(username, age, email); // constructor of father's class -- e.g. keep attrs from fathers's class
    this.city = city;
  }
  getName () {
    console.log('I am Admin, my name is: ', this.name);
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "Peter",
      email: ''
    };
  }
  // automatic function binding
  onClick = () => {
    console.log('onClick')
    this.setState({
      username: 'User Name'
    })
  }

  onSubmit = (e) => {
    e.preventDefault() // do not refresh page
    console.log(e)
  }

  onChange = (e) => {
    const {value, name} = e.target
    // calculated properties names
    this.setState({ 
      [name]: value
    })
  }
  render() {
    console.log(this.state);
    return (
      <div className='App'>
        Hello, {this.state.username}
        <br></br>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.username} name='username' type='text' placeholder='Enter your name'></input>
          <input onChange={this.onChange} value={this.state.email} name='email' type='text' placeholder='Enter your email'></input>
          <button onClick={this.onClick}>Submit</button>
        </form>
      </div>
    )
  }
}

export default App;