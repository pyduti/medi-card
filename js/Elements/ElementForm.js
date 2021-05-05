import Input from "./ElementInput.js";
import Select from "./ElementSelect.js";
import Textarea from "./ElementTextarea.js";
import Btn from "./ElementBtn.js";

export default class ElementForm{
    constructor(parent, c){
        this.elements = {
            parent: parent,
            defaultClass: c,
        };
// *---------------------------------------------------------CreateCard
        this.elementsForCrateCard = {
            title: document.createElement('h3'),
            selectDoctor: Select.create([{cl: 'make-ch', text: 'Сделайте вибор'}, {cl: 'cardiologist-option', text: 'Кардиолог'},{cl: 'dentist-option', text: 'Стоматолог'},{cl: 'therapist-option', text: 'Терапевт'}], 'select' ,'doctor'),
            inputPurpose: Input.create('text', 'Цель визита', `form-create-user__input`, `purpose`, ``, true),
            textareaShortInfo: Textarea.create(`form-create-user__textarea`,'Краткое описание визита', `shortinfo`),
            selectOrder: Select.create([{cl: 'cardiologist-option', text: 'Обычная'},{cl: 'dentist-option', text: 'Приоритетная'},{cl: 'therapist-option', text: 'Неотложная'}], 'select' , 'order'),
            InputFIO: Input.create('text', 'ФИО', `form-create-user__input`, `fio`, ``, true),
            createCardBtn: Btn.create(`sumbit`, `btn create-user__btn`, `Create visit`),
        }
        this.elementsForDoctors = {
            inputPressure:  Input.create('text', 'Давление', `form-cardiologist`, `pressure`, ``, true),
            inputBmi: Input.create('text', 'Индекс массы тела', `form-cardiologist`, `bmi`, ``, true),
            textareaInfo: Textarea.create(`form-cardiologist`, 'Перенесенные заболевания сердечно-сосудистой системы', `pastDiseases`, ``, true),
            inputAge: Input.create('number', 'Возраст', `form-cardiologist`, `age`, ``, true),
            inputDate:  Input.create('date', 'Дата последнего посещения', `form-create-user__date`, `date`, ``, true),
        }
        this.selectChange = (e) => {
            const {parent, defaultClass} = this.elements;
            const {title, selectDoctor, inputPurpose, textareaShortInfo, selectOrder, InputFIO, createCardBtn} = this.elementsForCrateCard;
            const {inputPressure, inputBmi, textareaInfo, inputAge, inputDate} = this.elementsForDoctors;
            document.querySelector(`.${defaultClass}`)?document.querySelector(`.${defaultClass}`).remove():true;
            this.form = document.createElement('form');
            this.form.addEventListener('submit', e => {this.formCreateCardSubmit(e)})
            switch (e.target.value) {
                case 'Кардиолог': {
                    this.form.className = `${defaultClass}`;
                    this.form.append(title, selectDoctor, inputPurpose, textareaShortInfo, selectOrder, InputFIO, inputPressure, inputBmi, textareaInfo, inputAge, inputDate, createCardBtn);
                    parent.append(this.form);
                    break;
                };
                case 'Стоматолог': {
                    this.form.className = `${defaultClass}`;
                    this.form.append(title, selectDoctor, inputPurpose, textareaShortInfo, selectOrder, InputFIO, inputDate, createCardBtn);
                    parent.append(this.form);
                    break;
                };
                case 'Терапевт': {
                    this.form.className = `${defaultClass}`;
                    this.form.append(title, selectDoctor, inputPurpose, textareaShortInfo, selectOrder, InputFIO, inputAge, inputDate, createCardBtn);
                    parent.append(this.form);
                    break;
                };
                default: {
                    this.form.className = `${defaultClass}`;
                    this.form.append(title, selectDoctor, inputPurpose, textareaShortInfo, selectOrder, InputFIO, createCardBtn);
                    parent.append(this.form);
                    break;
                };
            };
        };
        this.createUserElements = (e) => {
            this.objUser = {};
            for (let i = 0; i < e.target.length - 1; i++){
                let prop = e.target[i].dataset.value
                this.objUser[prop] = e.target[i].value
            }
            return this.objUser
          }
        
        this.formCreateCardSubmit = (e) => {
            e.preventDefault()
            fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(this.createUserElements(e))
            })
            .then(res => {
                res.json()
                window.location.reload()
            })
        }
        this.formCreateCard = () => {
            const {parent, defaultClass} = this.elements;
            const {title, selectDoctor, inputPurpose, textareaShortInfo, selectOrder, InputFIO, createCardBtn} = this.elementsForCrateCard;
            title.className = `form-title`
            title.textContent = `Create User Card`
            this.form = document.createElement('form');
            this.form.className = `${defaultClass}`;
            this.form.append(title, selectDoctor, inputPurpose, textareaShortInfo, selectOrder, InputFIO, createCardBtn);
            selectDoctor.addEventListener('change', e => this.selectChange(e));
            this.form.addEventListener('submit', e => {this.formCreateCardSubmit(e)})
            parent.append(this.form);
        };
// *---------------------------------------------------------CreateCard

// *---------------------------------------------------------LoginForm
        this.elementsForLogin = {
            title: document.createElement('h3'),
            inputEmail: Input.create('text', 'Email', `login-input`, ``, ``, true),
            inputPwd: Input.create('password', 'Password', `login-input`, ``, ``, true),
            btnLogin: Btn.create(`submit`, `btn login-btn`, `LOGIN`),
        }
         this.loginSubmit = (e) => {
            e.preventDefault()
            fetch("https://ajax.test-danit.com/api/v2/cards/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: e.target[0].value, password: e.target[1].value})
            })
            .then(response => response.text())
            .then(token => {
                sessionStorage.setItem('token', token)
                window.location.reload()
            }) 
        }
        this.formLogin = () => {
            const {parent, defaultClass} = this.elements;
            const {title, inputEmail, inputPwd, btnLogin} = this.elementsForLogin
            title.className = `form-title`;
            title.textContent = `Sign in`
            inputPwd.id = `password`;
            this.form = document.createElement('form');
            this.form.className = `${defaultClass}`;
            this.form.addEventListener('submit', e => {this.loginSubmit(e)})
            this.form.append(title, inputEmail, inputPwd, btnLogin)
            parent.append(this.form)
        }
// *---------------------------------------------------------LoginForm
    };
};
