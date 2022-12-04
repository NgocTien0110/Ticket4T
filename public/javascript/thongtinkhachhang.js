var inc=document.querySelector(".plus");
var dec=document.querySelector(".minus");
var ticket=document.querySelector("input.ticket");
inc.addEventListener("click",function(){
    ticket.value=parseInt(ticket.value)+1;
})
dec.addEventListener("click",function(){
    if(parseInt(ticket.value)>1){
        ticket.value=parseInt(ticket.value)-1;
    }
})
