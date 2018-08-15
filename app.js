//Task-List container
const Ul = document.querySelector('.calcList')
console.log(Ul)


// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});


// Calculate Results
function calculateResults() {
  console.log('Calculating...');
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');



  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';
    //Create the UI for List items

    //create a li element
    let li = document.createElement('li')
    //add the class
    li.className = 'list-item'
    //add text-content to li
    let LiData = li.textContent = 'Loan Amount :' + monthlyPayment.value
    //Create an Anchor Tag (X) button
    let removeBtn = document.createElement('a')
    //add the class
    removeBtn.className = 'remove-item ml-4'
    //add text-content to a
    removeBtn.textContent = 'X'
    //append the Anchor tag to li
    li.appendChild(removeBtn)
    //append the li to the Ul
    Ul.appendChild(li)
    console.log(li)
    //Add to LS
    addDataLocalStorage(LiData)


  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}


//Delegation
Ul.addEventListener('click', removeListItem)

//removing on click X
function removeListItem(e) {
  //console.log(e.target.parentElement)
  if (e.target.parentElement.classList.contains('list-item')) {
    e.target.parentElement.remove()
  }
  //Remove List From LS
  removeListLocalStorage(e.target.parentElement);
}


//Remove from LS
function removeListLocalStorage(li) {
  let ListData = getDataLocalStorage()
  let deleteList = li.textContent.substring(0, li.textContent.length - 1)

  ListData.forEach(function (List, index) {
    console.log(List)
    if (deleteList === List) {
      ListData.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(ListData))

}
//Adding to LS
function addDataLocalStorage(data) {
  console.log(data)
  let dataFromLS = getDataLocalStorage() //its an array

  //push the current data to Existing data in LS
  dataFromLS.push(data)

  //convert whole data back to String and send to LS
  localStorage.setItem('tasks', JSON.stringify(dataFromLS))
}

function getDataLocalStorage() {
  let dataLS;
  let LSdata = (localStorage.getItem('tasks'))
  if (LSdata === null) {
    dataLS = [];
  } else {
    dataLS = JSON.parse(LSdata)
  }
  console.log(dataLS)
  return dataLS
}

//When Dom gets Ready 
//Show tweets from LS when DOM ready(Loaded)

document.addEventListener('DOMContentLoaded', ShowTextLS)

function ShowTextLS() {
  let data = getDataLocalStorage()
  console.log(data)

  data.forEach(function (tweet) {
    //create a li element
    let li = document.createElement('li')
    //add the class
    li.className = 'list-item'
    //add text-content to li
    let LiData = li.textContent = tweet
    //Create an Anchor Tag (X) button
    let removeBtn = document.createElement('a')
    //add the class
    removeBtn.className = 'remove-item ml-4'
    //add text-content to a
    removeBtn.textContent = 'X'
    //append the Anchor tag to li
    li.appendChild(removeBtn)
    //append the li to the Ul
    Ul.appendChild(li)
    console.log(li)
  })

}