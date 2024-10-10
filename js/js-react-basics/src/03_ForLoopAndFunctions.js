/*
// loop for

for (let i = 0; i < cars.length; i++) {
  text += cars[i] + "<br>";
}

for (let i = 0; i < 10; i++) {
  console.log(i, movie)
}

for (let i = 0; i < dishes.length; i++) {
  console.log(i, dishes[i])
}

let html = [];

for (let i = 0; i < dishes.length; i++) {
  html.push(<p>{i} -- {dishes[i]}</p>)
}


// Functions

function sum(a, b) {
  console.log(a,b);
  console.log(a + b);
  return a+b;
}

// expression
// anonymous function
// not defined at begining until initialized after declaration
const multiply = function(a, b) {
  return a * b;
}
// can only call it after declaration
multiply(2, 6)


// arrow function
const sum2 = (a, b) => {
  console.log("sum 2  func");
  return a+b+1;
}
// shorter writing
// same attributes as in `expression`
// and equals to
const sum2 = (a, b) => return a+b+1;


// more examples
const myFavoriteFood = (dishes) => {
  let html = [];

  for (let i = 0; i < dishes.length; i++) {
     html.push(<p>{i} -- {dishes[i]}</p>)
  };
  return html;
}
const dishesToEat = myFavoriteFood(dishes)
{dishesToEat}

// error handling
// what if dishes = undef?
const myFavoriteFood = (dishes) => {
  let html = [];
  try {
    for (let i = 0; i < dishes.length; i++) {
      html.push(<p>{i} -- {dishes[i]}</p>)
    }
  }
  catch(e) {
    console.error('New error :',e)
    // html.push(<h1>No Dishes received</h1>)
  }
  return html;
}

// default values
const myFavoriteFood = (dishes = []) => {
  let html = [];
  for (let i = 0; i < dishes.length; i++) {
    html.push(<p>{i} -- {dishes[i]}</p>)
  }

  return html;
}

// loop and rest arguments
const sum3 = (...rest)  => {
  let sum = 0;
  for(let i = 0; i < rest.length; i++) {
    sum += rest[i]
  }
  return sum;
}
// console.log('Sum is: ', sum3(3,5,7,8))

// simpplification
function Imovie(name) {
  return (name && <h1>{name}</h1>) || <p>No Data</p>
}

// to this
const IMovie2 =  ({name}) => (name && <h1>{name}</h1>) || <p>No Data</p>
// or with default
const IMovie2 =  ({name = "Matrix"}) => <h1>{name}</h1>
*/

// anonymous function

const multiply = function(a, b) {
  return a * b;
}

// defined at begining
function sum(a, b) {
  console.log(a,b);
  console.log(a + b);
  return a+b;
}

// arrow function
const sum2 = (a, b) => {
  console.log("sum 2  func");
  return a + b + 1;
}

const movie = {
  name: "Star Wars",
  director: "George Lucas",
  desc: "The science fiction series that discusses the eternal war between good and evil and consists of nine films."
};

const {name, director} = movie;
const dishes = ["pizza", "burger", "fish and chips", "fries"];


const myFavoriteFood = (dishes) => {
  let html = [];

  for (let i = 0; i < dishes.length; i++) {
     html.push(<p>{i} -- {dishes[i]}</p>)
  };
  return html;
}


function Second() {
  // console.log(name);
  // console.log(firstName);
  // console.log(someVar)
  for (let i = 0; i < dishes.length; i++) {
    console.log(i, dishes[i])
  }
  sum(2, 4);
  //const dishesToEat = myFavoriteFood(dishes)
  return (
    <div className="Hello">
      <h1>This is a Third part of JS course</h1>
      {/*{html}*/}
      <p>{multiply(3,3)}</p>
      <p>{sum2(2, 1)}</p>
      {/*dishesToEat*/}
    </div>
  );
}

export default Second;