// check for document ready
$(document).ready(function () {
  // ================
  // variable declarations
  // ================

  const submitBtn = $('#nameSubmit');
  const formContainer = $('#formContainer');
  const addMoreBtn = $('#addMoreNames');
  // participants => user input in the name fields get stored here
  const participants = [];
  // count => used to set numbers for additional name fields
  let count = 4;

  // ================
  // event listeners
  // ================
  // "add more names" button event listener
  addMoreBtn.on('click', () => {
    count++;
    console.log('test');
    formContainer.append(`
      <div class="form-group">
        <input
          class="form-control form-control-lg name-field"
          type="text"
          placeholder="Enter name ${count}"
          id="inputLarge${count}"
          data-name="${count}"
        />
      </div>
  `);
  });

  // submit button event listener
  submitBtn.on('click', function (e) {
    console.log('test');
    // store the individual names from the input fields
    for (let i = 1; i <= count; i++) {
      let input = $(`#inputLarge${i}`).val().trim();
      if (!input) break;
      // push each entry into the participants array
      participants.push(input);
    }
    const shuffledArr = shuffleParticipants(participants);
    buildPairs(shuffledArr);
    // return the participants array for use elsewhere
    return participants;
  });

  // ================
  // helper functions
  // ================
  // find a match for each of the participants
  const shuffleParticipants = (array) => {
    // shuffle the array
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    // reverse the array
    // array = array.reverse();
    return array;
  };

  // loop through the array and build objects with 2 people in each people
  const buildPairs = (array) => {
    for (let i = 0; i < array.length; i++) {
      currentIndex = array[i];
      nextIndex = array[i + 1];
      let obj = {
        person1: currentIndex,
        person2: function () {
          if (nextIndex === undefined) {
            return array[0];
          } else {
            return nextIndex;
          }
        }
      };

      console.log(obj);
    }
  };

  // push those objects to the final array, and push to the ejs page template

  // *! RULES **
  // there must be an even number of participants
  // each participant must be randomly matched with another participant
  // each participant can only draw one name
  // no participant can be drawn more than once
  // no participant can draw their own name
});

/* Logic
DONE - Get peoples names
DONE - Store them in an array
Shuffle the array
Reverse the array 
Loop through the array and build objects with 2 people in each object
Push those objects to the final array, and push to the ejs page template
*/
