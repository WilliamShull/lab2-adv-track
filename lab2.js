'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/
function Blob() {
  this.victims = 0;
}

var blob = new Blob();
var hour = 0;

while (blob.victims < 1000) {
  hour++;
  blob.victims += hour;
}

var hoursSpentInDowington = hour; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  this.population = population;
  this.peoplePerHour = peoplePerHour;
  this.timeElapsed = 0;
  this.newVictims = 0;

  if (population > 0) {
    while (this.newVictims < this.population) {
      this.newVictims += peoplePerHour;
      peoplePerHour++;
      this.timeElapsed++;
    }
    return this.timeElapsed;
  } else {
    return 0;
  }
};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

// var hello = {
//   klingon: 'nuqneH',  // home planet is Qo'noS
//   romulan: 'Jolan\'tru', // home planet is Romulus
//   'federation standard': 'hello' // home planet is Earth
// };

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(planet, language) {
  this.planet = planet;
  this.language = language;
}

// sb is a SentientBeing object
SentientBeing.prototype.sayHello = function(sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating
    console.log(this.language);
    return sb.language;
    //TODO: put this on the SentientBeing prototype
  };

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).
function Klingon() {}
Klingon.prototype = new SentientBeing('Qo\'noS', 'nuqneH');

function Romulan() {}
Romulan.prototype = new SentientBeing('Romulus', 'Jolan\'tru');

function Human() {}
Human.prototype = new SentientBeing('Earth', 'Hello');

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru', 'The romulan should hear Jolan\'tru');
assert((new Klingon()).sayHello(new Human()) === 'Hello', 'The human should hear Hello');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru', 'The Romulan should hear Jolan\'tru');
assert((new Romulan()).sayHello(new Human()) === 'Hello', 'The human should hear Hello');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH', 'The Klingon should hear nuqneH');
// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    var aLast = a.substr(a.length - 1);
    var bLast = b.substr(b.length - 1);

    if (aLast < bLast) {
      return -1;
    } else if (aLast > bLast) {
      return 1;
    } else {
      return 0;
    }
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
  }
  stringArray.sort(byLastLetter);
  return stringArray;
}

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach(function(element) {
    sum += element;
  });
  numberArray = sum;
  return numberArray;
}

function sumSort(arrayOfArrays) {
  for (var i = 0; i < arrayOfArrays.length; i++) {
    arrayOfArrays[i] = sumArray(arrayOfArrays[i]);
  }

  function arraySort(a, b) {
    return a - b;
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
  }
  return arrayOfArrays.sort(arraySort);
}

var strArray = ['apple', 'orange', 'banana', 'onion', 'peach'];
var secondStrArray = ['this', 'is', 'a', 'string', 'to', 'sort', 'by', 'last', 'letter'];
var arr = [1, 2, 3, 4, 5];
var arrTwo = [10, 23, 19, 80, 3, 93, 77, 1, 19];
var arrOfArrs = [[1, 2, 3, 4], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6, 7]];
var secondArrOfArrs = [[28, 30, 16, 88, 99], [72, 5, 19, 80, 7, 15], [91, 82, 73, 64, 55], [11, 12, 13, 14, 15, 16]];

assert(lastLetterSort(strArray).indexOf('banana') === 0, 'The sorted string array does not match the answer');
assert(lastLetterSort(secondStrArray).indexOf('a') === 0, 'String sort didn\'t work');
assert(sumArray(arr) === 15, 'sumArray is not adding up the array elements properly');
assert(sumArray(arrTwo) === 325, 'sumArray did not work on the second array');
assert(sumArray(sumSort(arrOfArrs)) === 74, 'sumSort is either not adding up the nested arrays or not sorting them');
assert(sumArray(sumSort(secondArrOfArrs)) > 50, 'Well, something didn\'t work');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
