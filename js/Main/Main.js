import CardList from "../CardList/CardList.js";
import FilterForm from "../FilterForm/FIlterForm.js";

export default class Main{
    static create(){
        this.main = document.createElement('main');
        this.filterForm = FilterForm.create()
        this.deskCard = CardList.create().then(card => this.main.append(this.filterForm, card))
        return this.main
    }
}
