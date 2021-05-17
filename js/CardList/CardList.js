import Btn from "../Elements/ElementBtn.js"
import CardRed from "./CardRed.js"
export default class CardList{
    static async deletCard(id){
        await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            })
        window.location.reload()
    }
    static async create(){
        const array = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'GET',
            headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        })
        .then(response => response.json())
        .then(response => response)
        this.self = document.createElement('div');
        if (array.length === 0){
            this.p = document.createElement('p')
            this.p.textContent = `No items`
            this.p.className = `no-items-added`
            this.self.append(this.p)
            return this.self;
        }
        array.forEach(elements => {
            this.ul = document.createElement('ul')
            this.btn = Btn.create(`button`, `btn card-list__btn`, `Show more`)
            this.btnRedact = Btn.create(`button`, `redact`, ``)
            this.btnRedact.innerHTML = `&#9998;`
            this.btnDelet = Btn.create(`button`, `close`, `X`)
            for (let prop in elements){
                this.li = document.createElement('li')
                if (prop === 'id') {
                    this.li.classList.add('bd-id')
                    this.li.dataset.value = prop
                    this.li.textContent = `${elements[prop]}`
                    this.ul.append(this.li, this.btn, this.btnRedact, this.btnDelet)
                } else if (prop === 'doctor' || prop === 'fio'){
                    this.li.dataset.value = prop
                    this.li.classList.add(`short-card-info`)
                    this.li.textContent = `${elements[prop]}`
                    this.ul.append(this.li, this.btn, this.btnRedact, this.btnDelet)
                } else {
                    this.li.dataset.value = prop
                    this.li.classList.add('hidden')
                    this.li.textContent = `${elements[prop]}`
                    this.ul.append(this.li, this.btn, this.btnRedact, this.btnDelet)
                }
            }
            this.btn.addEventListener('click', (e) => {
                e.target.parentElement.childNodes.forEach(elements => {
                    if (elements.classList.contains('visible') && !elements.classList.contains(`short-card-info`) && !elements.classList.contains(`btn`) && !elements.classList.contains(`redact`) && !elements.classList.contains(`close`)) {
                        elements.classList.remove('visible')
                        elements.classList.add('hidden')
                    } else if (elements.dataset.roll === 'roll'){
                        elements.dataset.roll = 'false'
                        elements.textContent ='Show more'
                    }
                    else {
                    if (elements.classList.contains(`card-list__btn`)){
                        elements.dataset.roll = 'roll';
                        elements.textContent = `Roll up`;
                    }
                    elements.classList.add('visible')
                    elements.classList.remove('hidden')
                    }
                })
            })
            this.btnDelet.addEventListener('click', (e) => {
                e.preventDefault()
                if (confirm('Точно?')){
                e.target.parentElement.childNodes.forEach(el => {
                   if (el.classList.contains('bd-id')){
                       this.deletCard(el.textContent)
                    }
                })
            }
        })
        this.btnRedact.addEventListener('click', (e) => {
            let arrayCorect = [];
            e.target.parentElement.childNodes.forEach(el => {
                if (el.dataset.value){
                    arrayCorect.push(el)
                }
            })
            CardRed.create(arrayCorect)
           })
            this.self.append(this.ul)
        })
        this.self.classList.add(`card-wrapper`)
        return this.self
    }
}
