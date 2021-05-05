export default class Textarea{
        static create(cl, pl, data){
            this.textarea = document.createElement('textarea');
            this.textarea.placeholder = `${pl}`;
            this.textarea.className = `${cl}`;
            if (data) {
                this.textarea.dataset.value = `${data}`;
            };
            return this.textarea;
        };
};
