import React, { Component } from 'react';
// Classes
// example 1
class User { // as ususal starts with capital letter
  constructor(userName, userAge, userEmail) {
    this.name = userName;
    this.age = userAge;
    this.email = userEmail;
  }

  getName () {
    console.log(this.name);
  }
  sayHello() {
    console.log('Hi, I am ', this.age, ' old')
  }
}

class Admin extends User { // inheritance (polymorphism, incapsulation, abstraction)
  constructor(name, age, email, city) {
    super(name, age, email); // constructor of father's class -- e.g. keep attrs from fathers's class
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
      name: "Peter"
    };
  }
  // automatic function binding
  onClick = () => {
    console.log('onClick')
    this.setState({
      name: 'User Name'
    })
  }
  render() {
    const vit = new User('Pavlo', '42', 'pablo.the.alien@nasa.com')
    vit.getName();
    vit.sayHello();
    const admin = new Admin('Oxi', 38, 'oxi@emaple.com');
    admin.getName();
    admin.sayHello();
    
    return (
      <div className='App'>
        Hello, {this.state.name}
        <br></br>
        <button onClick={this.onClick}>Change name</button>
      </div>
    )
  }
}

export default App;