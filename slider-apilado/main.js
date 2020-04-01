let currentIndex = -1;
let elements = document.querySelectorAll('.element');
next();



function next(){
    currentIndex = currentIndex+1;
    if(currentIndex >= elements.length){
        currentIndex = 0;
    }
    let el = elements[currentIndex];
    let activeElement = document.querySelector('.element.active');
    if(activeElement){
        activeElement.classList.add('start-out');
        setTimeout(removeActive, 500, activeElement);
      
    }
    el.classList.add('active');

    function removeActive(activeElement){
        activeElement.classList.remove('active');
        activeElement.classList.remove('start-out');
    }
    setInterval(next, 2500);
}