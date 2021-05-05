export default class Btn{
    static create(t, c, text, data){
        this.btn = document.createElement('button');
        this.btn.type = `${t}`;
            this.btn.className = `${c}`;
            this.btn.textContent = `${text}`;
            if (data) {
                this.btn.dataset.value = `${data}`;
            };
            return this.btn;
    }
};
