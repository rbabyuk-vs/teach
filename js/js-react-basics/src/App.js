// this is comment
/* 
This is a multi line comment
*/
/*
1. Variables
let name = 'Roman'; // mutable
name = 'Oksana'

const firstName = 'Smith'; // use const whenever possible, to simplify debugging

// firstName = 'Bond' // cannot over-write
2. Data Types
  - strings
    - single qoute
    - double qoute
    - backticks
  - number
    - integer
    - decimals
    - sientific
  - bool
  - undefined

let someVar; // Undefined -- look at console
let age = 18; // int
//age = 18.94;  // decimals
//age = 123e5;  // sientific(exponent)
//age = 123e-5; // sientific(exponent)
let x = 0.2 + 0.1;
const isLoading = false;
// const LastName = null

3. Strings
  - strings
    - single qoute
    - double qoute
let name = 'Roman'
const book = "The 'Hobbit'"
const part = 1;
const favoriteMovie = `Matrix ${part}`
const salutation = `Hello, ${name}, how are you?`

4. Objects
    * computed property names

const movie = {
  name: 'Matrix',
  genre: 'thriller',
  year: '1991'
};

movie.director = 'The Wachowskis' // update object
delete movie.year // delete element from object
// Question? it a const why we can add and remove elements?
// Answer: you cannot oveeride entire object with the new val, but you can manipulate elements

const movie2 = movie;
movie2.name = "The 'Hobbit'"
movie2.genre = 'action'
delete movie2.year
// look at console

// explanation: it's an object, movie and movie2 are links to an object 

// * computed property names
let variable = 'one'
variable = 'two'
const movie = {
  [variable]: 'Some string'
}

5. Arrays
    * Map
    * Push

const fruits = ['apple', 'peach', 'water melon']
fruits.push('mango') // like lst.append() in python
const fruit2  = fruits.map(function (item, index, array){
  console.log(`Fruit ${index}: ${item}`)})
  return `Fruit ${index}: ${item}`

6. Desctructing assignment
const movie = {
  name: 'Matrix',
  genre: 'thriller',
  year: '1991',
  director: 'The Wachovskies'
};

<h1>{movie.name} - by {movie['director']} </h1>
const {name:movieName, director, county = 'USA'} = movie;
<h1>{movieName} - by {director} {contry}</h1>

const author = 'J. Rolling'
const books = ["Harry Potter and the 'Philosopher's Stone'", "Harry Potter and the 'Chamber of Secrets'"]
const harryPotter = {
  author,
  books,
  seriesOne = {
    name: "Harry Potter and the 'Philosopher's Stone'"
    year: 2001
  }
};
const {author, books, year, seriesOne} = harryPotter; // books is an Array

<h2>{JSON.stringify(books)}</h2>
<p>{seriesOne.name}}</p>

const {author, books, year, seriesOne: {name:seriesOneName}} = harryPotter; // access ab object of an object
<p>{seriesOneName}}</p>

// destructing applies to Arrays as well

const myArray = ['aple', 'orange', 'clementine', 'peach'];
myArray.push('pear');
const [apple, orange] = myArray //apple = myArray[0], orange = myArray[1];
console.log(${apple});
console.log(${orange});

7. Rest parameters and spread syntax
const [apple, orange, ...restElements] = myArray // first two elements are assigned to new vars, all other elements are stored in restElements
<p>{JSON.stringify(restElements)}</p>

const {author, books, ...rest} = harryPotter; // same logic in an Object

// spread
const harryPotter2 = {
  ...harryPotter
  seriesOne: {
    ...harryPotter.seriesOne
  }
}; // copy values of `harryPotter` into new object `harryPotter2`, but objects inside objects are not copied until you do so!
*/

function App() {
  // console.log(name);
  // console.log(firstName);
  // console.log(someVar)
  return (
    <div className="Hello">
      <h1>Hello, JS</h1>
      {/*<h2>Age is: {age}</h2>*/}
      {/*<h6>{x}</h6>*/}
      {/*<h4>Movie: {favoriteMovie}</h4>*/}
      {/*
      Movie: {movie.name}
      Genre: {movie.genre}
      Year: {movie.year}
      */}
      {/*
      <div>
      Fruit 1: {fruits[0]}
      </div>
      */}
      {/*
        fruits.map(function (fruit, index){
          return <div key={fruit}>Fruit {index}: {fruit}</div>
        })
      */}
    </div>
  );
}

export default App;