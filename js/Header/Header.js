import Img from "../Elements/ElementImg.js"
import Btn from "../Elements/ElementBtn.js"
import Modal from "../Modal/Modal.js"


export default class Header{
    static header = document.createElement('header');
    static btnLogin = Btn.create('button', 'btn login', `Sign in`);
    static btnCreateVisit = Btn.create('button', 'btn create-user', `Create User`);
    static create(){
        this.btnLogin.addEventListener('click', () => {
            Modal.createLoginForm()
        })
        this.btnCreateVisit.addEventListener('click', () => {
            Modal.createCardForm()
        }) 
        if (sessionStorage.getItem('token')){
            this.header.append(Img.create(`logo`, `./img/logo.svg`, ``, 70, 70), this.btnCreateVisit)
        } else {
            this.header.append(Img.create(`logo`, `./img/logo.svg`, ``, 70, 70), this.btnLogin)
        }
        return this.header
    } 
}