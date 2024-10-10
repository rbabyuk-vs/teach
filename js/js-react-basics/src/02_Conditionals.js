/*
// Comparizon operators
==	equal to
===	equal value and equal type
!=	not equal
!==	not equal value or not equal type
>	greater than
<	less than
>=	greater than or equal to
<=	less than or equal to

if (age < 18) text = "Too young to buy alcohol";

// Logical Operators
&&	and
||	or
!	not

// Conditional (Ternary) Operator
let voteable = (age < 18) ? "Too young":"Old enough";
*/
const movie = {
  name: "Star Wars",
  director: "George Lucas",
  desc: "The science fiction series that discusses the eternal war between good and evil and consists of nine films."
};

const {name, director} = movie;


// option 1
function Movie({name, director, ...rest}) {
  if (!name) {
    return null
  } else {
    return (
        <div>
            <h1>{name}</h1>
            <h2>{director}</h2>
            <p>{JSON.stringify(rest)}</p>
        </div>
    )
  }
}

// option 2
 function User({name="Pavlo", gender="male"}) {
  return name ? (
    <h1>{name}</h1>
  ) : (
    <p>"No user"</p>
  )
}

// option 3
function User2({name="Pavlo", gender="male"}) {
  const salutation = `Привіт, ${gender === 'male' ? 'пан ' : 'пані '} ${name}`
  return name ? (
    <h1>{salutation}</h1>
  ) : (
    <p>"No user"</p>
  )
}

// option 4
function User3({name="Pavlo", gender="male"}) {
  const salutation = `Привіт, ${gender === 'male' ? 'пан ' : 'пані '} ${name}`
  return (name && <h1>{name}</h1> || <p>No DATA</p>)
}

function Second() {
  // console.log(name);
  // console.log(firstName);
  // console.log(someVar)
  return (
    <div className="Hello">
      <h1>This is a second part of JS course</h1>
      <Movie {...movie}/>
      <User/>
      <User2/>
      <User3/>
    </div>
  );
}

export default Second;