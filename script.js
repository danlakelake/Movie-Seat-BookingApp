const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// Llama función para traer lo que esta almacenando en el LocalStorage
getDataFromLS();

// Almacena el valor del precio en un número entero
let ticketPrice = parseInt(movieSelect.value);

// Almacena el valor de la pelicula seleccionada (0,1,2, etc..) y su precio en LocalStorage
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Actualiza el numero de asientos y el total
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    /* Agrega el número de los asientos seleccionados en un array 
    con el spread operator, retorna el array con el método map, 
    y va agregando el índice de los asientos seleccionados con el metodo 
    indexOf a dicho array.
    */
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });

    // Almacena los números de los asienstos seleccionados al LocalStorage
    // En formato cadena de texto con JSON.stringify en el array
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Trae los datos del LocalStorage al DOM
function getDataFromLS(){
    // Trae los valores en formato Json(objeto)
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index)) {
                
            }
        });
    }
    console.log(selectedSeats);
    
}

// Actualiza el total dependiendo la película seleccionada
movieSelect.addEventListener('change', function(e){
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Al seleccionar los asientos disponibles, cambia la clase y llama función updateSelectedCount
container.addEventListener('click', function(e){
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});


