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
      id: '',
      user: {}
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
    fetch(`https://swapi.dev/api/people/${this.state.id}`)
      .then( (response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({
          user: data
        })
      })
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
    // or descruction assignment
    // const (id, user) = this.state  
    return (
      <div className='App'>
        Hello, {this.state.user.name}
        <br></br>
        <form onSubmit={this.onSubmit}>
          <input value={this.state.id} onChange={this.onChange} name='id' type='text' placeholder='Enter your ID'></input>
          <button onClick={this.onClick}>Submit</button>
        </form>
        <hr></hr>
        {JSON.stringify(this.state.user)}
      </div>
    )
  }
}

export default App;