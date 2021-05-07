import Input from "../Elements/ElementInput.js";
import Btn from "../Elements/ElementBtn.js";

export default class CardRed{
    static async redSubmit(e, id){
      const magic = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify(this.createUserElements(e, id))
        })
          .then(response => response.json())
          .then(response => console.log(response))
          window.location.reload()
    }
    static createUserElements = (e, id) => {
      this.objUser = {};
      this.objUser['id'] = id;
      for (let i = 0; i < e.target.length - 1; i++){
          let prop = e.target[i].dataset.value
          this.objUser[prop] = e.target[i].value
      }
      return this.objUser
    }
    static closeForm = (e, self) => {
        if (e.target.className === 'modal-wrapper') {
          if (self.firstChild){self.firstChild.remove()}
          self.remove()
        }
      }
      static async eventForm() {
        this.self.className = 'modal-wrapper'
        this.self.addEventListener('mousedown', e => this.closeForm(e, this.self))
      }
    static async create(arr){
        this.form = document.createElement('form');
        this.form.className = `redac-form`
        this.id = ``;
        arr.forEach(el => {
            if (el.dataset.value === 'id'){
              this.id = el.textContent
            } else {
              let input = Input.create('text', '', `form-red-user__input`, el.dataset.value, ``, true)
              input.value = el.textContent
              this.form.append(input)
            }
            
        });
        this.btn = Btn.create(`submit`, `btn red-btn`, `REDACT`)
        this.form.addEventListener('submit', e => {
          e.preventDefault()
          this.redSubmit(e, this.id)
        })
        this.form.append(this.btn)
        this.self = document.createElement('div')
        this.self.append(this.form)
        this.eventForm()
        return document.querySelector('body').append(this.self)
    }
}
