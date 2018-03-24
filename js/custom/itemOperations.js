const itemOperations = {


    itemList: [],

    add(itemObject) {

        this.itemList.push(itemObject);
    },
    sortById() {
        var a = this.itemList.sort((a, b) => a.id - b.id);
        console.log(a);
        return a;
    },

    searchById() {

        var id = document.querySelector("#id-button").value;
        var object = this.itemList.filter(e => e.id == id);

        return object;
    },
    deleteRec() {

        console.log("inside deleteRec in itemOperations...");
        console.log(this.itemList);
        this.itemList = this.itemList.filter(itemObject => itemObject.markForDelete == false);
        console.log(this.itemList);
    },

    toggleMark(id) {

        // this.itemList.filter(itemObject=>itemObject.id==id)[0].markForDelete=!this.itemList.filter(itemObject=>itemObject.id==id)[0].markForDelete;
        for (let i = 0; i < this.itemList.length; i++) {

            if (this.itemList[i].id == id) {
                this.itemList[i].markForDelete = !this.itemList[i].markForDelete;

            }

            console.log("toggleMark itemList is" + this.itemList);

        }

    }


}
