let inc = document.querySelector(".plus");
let dec = document.querySelector(".minus");
let ticket = document.querySelector("input.ticket");
let num = document.querySelector(".numSeat");
inc.addEventListener("click", function () {
    if (parseInt(num.value) > parseInt(ticket.value)) {
        ticket.value = parseInt(ticket.value) + 1;
    }
})
dec.addEventListener("click", function () {
    if (parseInt(ticket.value) > 1) {
        ticket.value = parseInt(ticket.value) - 1;
    }

})
