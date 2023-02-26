let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');

//Open Modal
function openModal(){
    console.log('Modal is open');
    modal.classList.add("active");
    overlay.classList.add("overlayactive");
};

//close Modal
function closeModal(){
    console.log('Modal is Close');
    modal.classList.remove("active");
    overlay.classList.remove("overlayactive");
}
