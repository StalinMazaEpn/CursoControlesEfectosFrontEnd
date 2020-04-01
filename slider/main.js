class IndexForSiblings {
    static get(el){
        //Obtener posicion respecto a sus hermanos
        let children = el.parentNode.children;
        for (let index = 0; index < children.length; index++) {
            const child = children[index];
            if(child == el){ return index}            
        }
    }
}

class Slider {
    constructor(selector, movimiento=true){
        this.move = this.move.bind(this);
        this.moveByButton = this.moveByButton.bind(this);
        this.restart = this.restart.bind(this);
        this.slider = document.querySelector(selector);
        this.movimiento = movimiento;
        this.interval = null;
        this.duration = 1000;
        this.contador = 0;
        this.itemsCount = document.querySelectorAll(`.container > *`).length;
        this.start();
        this.buildControls();
        this.bindEvents();
        
    }

    start(){
        if(!this.movimiento){return;}
        this.interval = window.setInterval(this.move, this.duration)
    }

    restart(){
        if(this.interval){
            window.clearInterval(this.interval);
            this.start();
        }
    }

    move(){
        //This es algo completamente
        // let itemsCount = document.querySelectorAll(`.container > *`).length;

        console.log('itemsCount', this.itemsCount);
        this.contador++;
        if(this.contador > (this.itemsCount-1)){
            this.contador = 0;
        }
        this.moveTo(this.contador);
    }

    moveByButton(ev){
        let index = IndexForSiblings.get(ev.currentTarget);
        console.log('index', index);
        this.contador = index;
        this.moveTo(index);
        this.restart();
    }

    moveTo(index){
        //mover al objeto
        let left = index * 100;
        this.resetIndicator();
        this.slider.querySelector(`.controls li:nth-child(${index+1})`).classList.add('active');
        this.slider.querySelector('.container').style.left = `-${left}%`
    }

    buildControls(){
        for(var i = 0; i < this.itemsCount; i++){
            let control = document.createElement('li');
            if(i == 0){
                control.classList.add('active');
            }
            this.slider.querySelector('.controls ul').appendChild(control)
        }
    }

    resetIndicator(){
        this.slider.querySelectorAll('.controls li.active')
        .forEach(item => {
            item.classList.remove('active');
        });
    }

    bindEvents(){
        this.slider.querySelectorAll('.controls li')
        .forEach(item => {
            item.addEventListener("click", this.moveByButton)
        });;
    }
}


(function(){
    new Slider('.slider', false)
})();