// Function to load car data from localStorage and display it
function loadCars() {
    const cars = JSON.parse(localStorage.getItem('cars')) || [];

    if (cars.length > 0) {
        const carList = document.getElementById('car-list');
        carList.innerHTML = ''; // Clear any previous car display

        cars.forEach((car, index) => {
            const carItem = document.createElement('div');
            carItem.classList.add('car-item');
          //  console.log("inside loop creating car element: " + car)
          //  console.log(car, index)

            const carImage = document.createElement('img');
           
            carImage.src = car.carPhoto;
            console.log("inside loop creating car image: " + carImage)
            carImage.alt = 'Car Image';
            carImage.style.maxWidth = '300px';

            const carName = document.createElement('p');
            carName.innerHTML = `<strong>Car Name:</strong> ${car.carName}`;

            const carAmount = document.createElement('p');
            carAmount.innerHTML = `<strong>Rent Amount:</strong> $${car.carAmount}`;

            // Add remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove Car';
            removeButton.classList.add('button');
            removeButton.style.backgroundColor = '#ff5555';
            removeButton.onclick = () => removeCar(index);

            carItem.appendChild(carImage);
            carItem.appendChild(carName);
            carItem.appendChild(carAmount);
            carItem.appendChild(removeButton);

            carList.appendChild(carItem);
        });
    } else {
        const carList = document.getElementById('car-list');
        carList.innerHTML = '<p>No cars available for rent.</p>';
    }
}

// Function to remove a car from localStorage and refresh the list
function removeCar(index) {
    let cars = JSON.parse(localStorage.getItem('cars')) || [];
    if (confirm('Are you sure you want to remove this car?')) {
        cars.splice(index, 1); // Remove the selected car
        localStorage.setItem('cars', JSON.stringify(cars)); // Update local storage
        loadCars(); // Refresh the car list after removal
    }
}

// Load cars when the page is loaded
window.onload = loadCars;
