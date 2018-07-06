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

        // Get no of completed todos
        this.ings.forEach(function (ingParam) {
            if(ingParam.ingSelected === true){
                selectedIngs ++;
            }
        });

        // set (x) or not 
        this.ings.forEach(function(ingParam) {
            // case 1 if everyhting is true, make all false
            if(totalIngs === selectedIngs){
                ingParam.ingSelected = false;
            } else {
                //case 2 If any true make all true
                ingParam.ingSelected = true;
            }

        });
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
    deleteIngs : function(position){
        ingsList.deleteIng(position);
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

        ingsList.ings.forEach(function(ings, position){
            var ingsLi = document.createElement('li');
            var ingDisplayString = ' ';

            if(ings.ingSelected == true){
                ingDisplayString = "(x)" + ings.ingDesc ;
            } else {
                ingDisplayString = "( )" + ings.ingDesc ;
            }

            ingsLi.id = position;
            ingsLi.textContent = ingDisplayString;
            ingsLi.appendChild(this.createDeleteButton());
            ingsUl.appendChild(ingsLi);
        }, this );
    },

    createDeleteButton : function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    }, 

    setupEventListeners : function() {

        var ingsUl = document.querySelector('ul');
        ingsUl.addEventListener('click', function() {
            // get element clicked on
            var elementClicked = event.target;

            // check if element clicked is delete button
            if(elementClicked.className === "deleteButton" ){
                handlers.deleteIngs(parseInt(elementClicked.parentNode.id));
            }
        })
    }
};

view.setupEventListeners();



