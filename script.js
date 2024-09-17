// Sample credentials for login (these could be hardcoded or retrieved from a database)
const credentials = {
    username: "Prashant",
    password: "1234"
};

// Function for login
function login() {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;
    
    if (enteredUsername === credentials.username && enteredPassword === credentials.password) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('car-form-section').style.display = 'block';
        displayUploadedCars();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

// Function to handle form submission
document.getElementById('car-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload on form submission

    const carName = document.getElementById('car-name').value;
    const carPhoto = document.getElementById('car-photo').files[0];
    const carAmount = document.getElementById('car-amount').value;

    if (carName && carPhoto && carAmount) {
        // Get existing cars from local storage, or start with an empty array
        let cars = JSON.parse(localStorage.getItem('cars')) || [];
        console.log("car phote", carPhoto)
        const newCar = {
            carName: carName,
            
            carPhoto: URL.createObjectURL(carPhoto), // Creating a URL for the uploaded image
            carAmount: carAmount
        };

        // Add new car to the cars array
        cars.push(newCar);

        // Save the updated cars array to local storage
        localStorage.setItem('cars', JSON.stringify(cars));

        // Show success message
        document.getElementById('submit-success').style.display = 'block';

        // Reset the form after submission
        document.getElementById('car-form').reset();

        // Display the newly uploaded cars
        displayUploadedCars();
    }
});

// Function to display uploaded cars on the same page
function displayUploadedCars() {
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    const carDisplay = document.getElementById('car-display');

    // Clear the display before adding cars
    carDisplay.innerHTML = '';

    cars.forEach((car, index) => {
        const carItem = document.createElement('div');
        carItem.classList.add('car-item');

        const carImage = document.createElement('img');
        carImage.src = car.carPhoto;
        carImage.alt = 'Car Image';
        carImage.style.maxWidth = '300px';

        const carName = document.createElement('p');
        carName.innerHTML = `<strong>Car Name:</strong> ${car.carName}`;

        const carAmount = document.createElement('p');
        carAmount.innerHTML = `<strong>Rent Amount:</strong> $${car.carAmount}`;

        carItem.appendChild(carImage);
        carItem.appendChild(carName);
        carItem.appendChild(carAmount);
        carDisplay.appendChild(carItem);
    });
}
