// gets the current date
const currentDate = moment().format('dddd, MMMM Do')

// displays the current date on the page
document.getElementById('currentDay').textContent = currentDate

// gets current hour
const currentHr = moment().hour()

// local storage for workday agenda app
let workday = JSON.parse(localStorage.getItem('workday')) || agenda

// changes the string time into integer time
const stringToInt = time => {
  switch (time) {
    case '9AM': return 9
    case '10AM': return 10
    case '11AM': return 11
    case '12PM': return 12
    case '1PM': return 13
    case '2PM': return 14
    case '3PM': return 15
    case '4PM': return 16
    case '5PM': return 17
  }
}

// loop to iterate for each time
for (let i = 9; i < 18; i++) {
  let timeCount = 'time' + i
  let stringTime = document.getElementById(timeCount).textContent
  let intTime = stringToInt(stringTime)

  // condition for coloring the textarea depending on the current time 
  if (currentHr === intTime) {
    document.getElementById(timeCount).nextElementSibling.children[0].classList.add('present')
  } else if (currentHr < intTime) {
    document.getElementById(timeCount).nextElementSibling.children[0].classList.add('future')
  } else if (currentHr > intTime) {
    document.getElementById(timeCount).nextElementSibling.children[0].classList.add('past')
  }

  // saves the note in the textarea, the saved note will stay even though you refresh
  let noteCount = 'note' + i
  document.getElementById(noteCount).textContent = workday[noteCount]
}

// created agenda object
const agenda = {
  'note9': '',
  'note10': '',
  'note11': '',
  'note12': '',
  'note13': '',
  'note14': '',
  'note15': '',
  'note16': '',
  'note17': '',
}

// when the save btn is clicked
document.addEventListener('click', event => {
  if (event.target.classList.contains('saveBtn')) {
    let note = event.target.previousElementSibling.children[0].value
    let noteId = event.target.previousElementSibling.children[0].id

    workday[noteId] = note

    localStorage.setItem('workday', JSON.stringify(workday))
  }
})