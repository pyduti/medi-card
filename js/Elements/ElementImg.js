export default class Img{
    static create(cl, s, data, w, h){
            this.img = document.createElement('img');
            this.img.className = `${cl}`;
            this.img.src = `${s}`;
            if (w && h) {
                this.img.width = `${w}`;
                this.img.height = `${h}`;
            };
            if (data) {
                this.img.dataset.value = `${data}`;
            };
            return this.img;
    }
};