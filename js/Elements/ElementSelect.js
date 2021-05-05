export default class Select{
        static optionAppend(element, select){
            this.option = document.createElement('option');
            this.option.className = element.cl;
            this.option.textContent = `${element.text}`;
                if (this.option.data) {
                    btn.dataset.value = `${element.data}`;
                };
                select.append(this.option);
        };
        static create(arr, selectClass, dataSelect, lableSelect){
            this.arr = arr;
            this.select = document.createElement('select');
            this.select.className = `${selectClass}`
            if (dataSelect) {
                this.select.dataset.value = `${dataSelect}`;
            } else if (lableSelect) {
                this.select.labels
            };
            this.arr.forEach(element => {this.optionAppend(element, this.select)});
            return this.select;
        };
};
