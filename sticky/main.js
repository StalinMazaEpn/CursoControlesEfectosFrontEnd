(function(){
    let pinged = false;
    let nav = document.querySelector('.sm-nav ');
    let stickyScrollPoint = document.querySelector('.hero-image').clientHeight;
    function pingToTop(){
        if(pinged){ return;}
        nav.classList.add('pined');
        pinged = true;
    }
    function unPingFromTop(){
        if(!pinged){ return;}
        nav.classList.remove('pined');
        pinged = false;
    }

    window.addEventListener('scroll', (event) => {
        // console.log('coords nav', coords)
        if(window.scrollY < stickyScrollPoint){
            return unPingFromTop();
        }
        let coords = nav.getBoundingClientRect();
        if(coords.top <= 0){
            return pingToTop();
        }
        unPingFromTop();
    });
})();