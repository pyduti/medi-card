export default class Input{
        static create(tp, ph, cl, data, label, required){
            this.input = document.createElement('input');
            if(label){
                this.label = document.createElement('label');
                this.label.for = `${label}`;
                this.input.append(this.label);
            }
            this.input.type = tp;
            this.input.placeholder = ph;
            this.input.className =`${cl}`;
            if (data) {
                this.input.dataset.value = `${data}`;
            }
            if (required) {
                this.input.setAttribute('required', '')
            }          
            return this.input
        };
};
