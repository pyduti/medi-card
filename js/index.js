import Header from "./Header/Header.js";
import Main from "./Main/Main.js";

class Cabinet{
    static render(){
            this.wrapper = document.createElement('div');
            this.header = Header.create();
            if (sessionStorage.getItem('token')){
                this.wrapper.classList.add(`cabinet-wrapper`);
                this.main = Main.create();
                this.wrapper.append(this.header, this.main);
                return document.querySelector('body').append(this.wrapper); 
            } else {
                this.wrapper.classList.add(`cabinet-wrapper`);
                this.wrapper.append(this.header);
                return document.querySelector('body').append(this.wrapper); 
            }
    }
}

Cabinet.render()
