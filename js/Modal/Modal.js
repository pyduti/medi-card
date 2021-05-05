import ElementForm from "../Elements/ElementForm.js";

export default class Modal{
  static self = document.createElement('div')
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
  
  static async createCardForm() {
    this.eventForm()
    new ElementForm(this.self, 'form-create-user').formCreateCard();
    return document.body.append(this.self);
  }

  static async createLoginForm() {
    this.eventForm()
    new ElementForm(this.self, 'login-form').formLogin();
    return document.body.append(this.self);
  }

}