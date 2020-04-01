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

class TabsManager {
    constructor(selector_tabs, selector_controls, selector_indicador){
        this.tabs = document.querySelector(selector_tabs);
        this.controls = document.querySelectorAll(selector_controls);
        this.indicator = document.querySelector(selector_indicador);
        this.handleClick = this.handleClick.bind(this);
        this.openTab = this.openTab.bind(this);
        this.setIndicatorWidth();
        this.bindEvents();
        console.log('this.controls', this.controls);
        console.log('this.tabs', this.tabs);
        console.log('this.indicator', this.indicator);
    }

    setIndicatorWidth(){
        this.indicator.style.width = this.controls[0].clientWidth + 'px';
    }

    bindEvents(){
        this.controls.forEach(button => {
            button.addEventListener('click', this.handleClick)
        });
    }
    handleClick(event){
        event.preventDefault();
        let button = event.currentTarget;
        let indice = IndexForSiblings.get(button);
        console.log('posicion', indice);
        this.indicator.style.left = (indice*this.indicator.clientWidth)+"px";
        this.openTab(button.hash)
        console.log('hash', button.hash);
    }

    openTab(hash){
        let tab = document.querySelector(hash);
        let indice = IndexForSiblings.get(tab);
        this.tabs.querySelector('.container').style.left = -(indice*100)+"%";
    }
}

new TabsManager('.tabs', '.tabs-control a', '.indicator')