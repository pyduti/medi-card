import Btn from "../Elements/ElementBtn.js";
import Input from "../Elements/ElementInput.js";
import Select from "../Elements/ElementSelect.js";

export default class FilterForm{
        static async filterForm(e){
            const arr = await fetch("https://ajax.test-danit.com/api/v2/cards", {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        },
                        }).then(response => response.json())
                        .then(response => response)
            const filter = arr.filter((prop) => {
                let today = new Date();
                let strDate = prop.date; 
                let arrStr = strDate.split('-');
                let year = Number(arrStr[0]);
                let month = Number(arrStr[1]) - 1;
                let day = Number(arrStr[2]);
                let meetDay = new Date(year, month, day)
                let status = ``
                today < meetDay ? status = 'Open': status = 'Done';
                if (document.querySelector('.search-input').value === ``) {
                    return prop.order === document.querySelector('.order-search').value && status === document.querySelector('.status-search').value
                } else {
                    return prop.doctor === document.querySelector('.search-input').value && prop.order === document.querySelector('.order-search').value && status === document.querySelector('.status-search').value
                }    
            })
            e.target.parentElement.nextSibling.remove()
            this.self = document.createElement('div')
            this.self.classList.add('card-wrapper')
            if (filter.length === 0) {
                this.self.classList.add('no-item')
                this.p = document.createElement('p')
                this.p.textContent = `No items`
                this.p.className = `no-items-added`
                this.self.append(this.p)
                return document.querySelector('main').append(this.self);
            }
            document.querySelector('main').append(this.self)
            filter.forEach(elements => {
                this.ul = document.createElement('ul')
                this.btn = Btn.create(`button`, `btn card-list__btn`, `Show more`)
                this.btnRedact = Btn.create(`button`, `redact`, ``)
                this.btnRedact.innerHTML = `&#9998;`
                this.btnDelet = Btn.create(`button`, `close`, `X`)
                for (let prop in elements){
                    this.li = document.createElement('li')
                    if (prop === 'id') {
                        this.li.classList.add('bd-id')
                        this.li.textContent = `${elements[prop]}`
                        this.ul.append(this.li, this.btn, this.btnRedact, this.btnDelet)
                    } else if (prop === 'doctor' || prop === 'fio'){
                        this.li.classList.add(`short-card-info`)
                        this.li.textContent = `${elements[prop]}`
                        this.ul.append(this.li, this.btn, this.btnRedact, this.btnDelet)
                    } else {
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
                this.self.append(this.ul)
            })
        }
       static create(){
        this.self = document.createElement('div')
        this.self.className = `filter-wrapper`
        this.searchInput = Input.create('text', 'search', `search-input`, ``, ``, true)
        this.statusSelect = Select.create([{cl: 'status-open', text: 'Open'},{cl: 'status-done', text: 'Done'}], 'status-search' , 'order')
        this.urgencySelect = Select.create([{cl: 'status-option', text: 'Обычная'},{cl: 'status-option', text: 'Приоритетная'},{cl: 'status-option', text: 'Неотложная'}], 'order-search' , 'order')
        this.reset = Btn.create(`button`, `btn reset`, `Reset`)
        this.search = Btn.create(`button`, `btn search`, `Search`)
        this.reset.addEventListener('click', () => {
            window.location.reload()
        })
        this.search.addEventListener('click', (e) => {this.filterForm(e)})
        this.self.append(this.searchInput, this.statusSelect, this.urgencySelect, this.reset, this.search)
        return this.self
        }
}