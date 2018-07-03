var ingsList = {

    ings : [],

    //add
    addIng : function (newIng){
        this.ings.push({
            ingDesc : newIng,
            ingQty : 0,
            ingUom :"",
            ingSelected : false
        });
    },
    // Update
    changeIng : function (position, newValue){
        this.ings[position].ingDesc = newValue;
    },
    //delete
    deleteIng : function (position){
        this.ings.splice(position, 1);
    },
    toggleIng : function (position){
        var currIng  = this.ings[position];
        currIng.ingSelected = ! currIng.ingSelected;
    },
    toggleAll : function() {
        var totalIngs = this.ings.length;
        var selectedIngs = 0;

        for(var i = 0; i < totalIngs; i++){
            if(this.ings[i].ingSelected == true){
                selectedIngs ++;
            };
        };

        if (totalIngs == selectedIngs){
            for ( var i = 0; i < totalIngs; i++ ){
                this.ings[i].ingSelected = false;
            };
        }
        else {
            for ( var i = 0; i < totalIngs; i++ ){
                this.ings[i].ingSelected = true;
            };
        };
    }

    
};

var handlers =  {

    toggleAll : function () {
        ingsList.toggleAll();
        view.displayIngs();
    }, 
    addIngs : function(){
        var addIngTextInput = document.getElementById("addIngTextInput");
        ingsList.addIng(addIngTextInput.value);
        addIngTextInput.value = '';
        view.displayIngs();
    },
    changeIngs : function(){
        var changeIngTextInput = document.getElementById("changeIngTextInput");
        var changeIngPositionInput = document.getElementById("changeIngPositionInput");
        ingsList.changeIng(changeIngPositionInput.value, changeIngTextInput.value);

        changeIngTextInput.value = '';
        changeIngPositionInput.value = null;
        view.displayIngs();
    },
    deleteIngs : function(){
        var deleteIngPositionInput = document.getElementById("deleteIngPositionInput");
        ingsList.deleteIng(deleteIngPositionInput.value);

        deleteIngPositionInput.value = null;
        view.displayIngs();
    },
    toggleIngs : function() { 
        var togglePositionInput = document.getElementById("togglePositionInput");
        ingsList.toggleIng(togglePositionInput.valueAsNumber) ;

        togglePositionInput.value = '';
        view.displayIngs();
    }
};

var view = {
    displayIngs :   function() {
        
        var ingsUl = document.querySelector('ul');
        ingsUl.innerHTML = ' ';

        for(var i = 0; i < ingsList.ings.length; i++ ){

            var ings = ingsList.ings[i];
            var ingsLi = document.createElement('li');
            var ingDisplayString = ' ';


            if(ings.ingSelected == true){
                ingDisplayString = "(x)" + ings.ingDesc ;
            } else {
                ingDisplayString = "( )" + ings.ingDesc ;
            }

            ingsLi.textContent = ingDisplayString;
            ingsUl.appendChild(ingsLi);
        }
    }
};


