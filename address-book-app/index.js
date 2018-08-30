(function() {//Imediately Invoked Function Expression with all the code

    window.Contacts = window.Contacts || [];//if it exists or if not create an empty array (data structure)

    window.Contacts.getContact = function(id) {//fetches the contact with id (helper function)
        return window.Contacts[getContactsIndexFromId(id)];
    }
    window.Contacts.addContact = function(first, last, phone, addr) {//takes the values from the dom, sets an id and pushes it to the Contacts array
        let maxId = 0;
        for (let i = 0; i < window.Contacts.length; i++) {
            if (window.Contacts[i].id > maxId) {
                maxId = window.Contacts[i].id;
            }
        }
        maxId++;

        window.Contacts.push({//pushes values from the form into Contacts
            id: maxId,
            firstname: first,
            lastname: last,
            phone: phone,
            address: addr
        });

        console.log("Adding " + window.Contacts.getContact(maxId).firstname);//logs added person to the console

        //injects the contact first and last name html into the DOM

        document.getElementById('name-area').innerHTML += '<div class="all-contacts-container" id="name'+ maxId + '"><div class="contact-display">' + first + ' ' + last + '</div><div class="button-trash-icon tooltip" onclick="deleteContact('+maxId+')"><i class="fa fa-trash"></i><span class="tooltext">Delete Contact</span></div></div>';
    }

    //work in progress - to edit existing contacts
/*
    window.Contacts.update = function(id, first, last, phone, addr) {
        let idx = getContactsIndexFromId(id);
        window.Contacts[idx].firstname = first;
        window.Contacts[idx].lastname = last;
        window.Contacts[idx].phone = phone;
        window.Contacts[idx].address = addr;
    }

    */

    window.Contacts.deleteContact = function(id) {//takes injected html function and passes the maxId on-click and hides the contact div
        let idx = getContactsIndexFromId(id);
        window.Contacts.splice(idx, 1);
        document.getElementById("name" + id).style.display = "none";
    }

    function getContactsIndexFromId(id) {//helper function retrieves the index of of a contact with an id number param
        for (let i = 0; i < window.Contacts.length; i++) {
            if (window.Contacts[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    window.Contacts.addContact("Aaron", "Smith", "613-262-1846", "3415 Uplands Dr");//adds the first contact place holder

    // form inputs
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let phoneNumber = document.getElementById('phone');
    let address = document.getElementById('address');

    document.getElementById('submit-new').onclick = function() {//takes the values in the text fields and adds them to the Contacts array
        
        document.getElementById('theModal').style.display = "none";
        window.Contacts.addContact(
            firstName.value,
            lastName.value,
            phoneNumber.value,
            address.value
        );
        (function(){//resets values in the form fields 
            if(firstName || lastName || phoneNumber || address){
                firstName.value="";
                lastName.value="";
                phoneNumber.value="";
                address.value="";
            }
        }());
    }

    window.deleteContact = function(i) {//displays delete modal then on-click deletes contact (hides)
        document.getElementById('deleteModal').style.display = "block";
        document.getElementById('delete-contactz').onclick = function() {//deletes contact
            console.log("Deleting: " + window.Contacts.getContact(i).firstname);//console logs action
            document.getElementById("name"+ i).style.display = "none";
            document.getElementById('deleteModal').style.display = "none";
        }
    }

    //the add contact and delete modals
    
    document.getElementById('no-delete').onclick = function() {//the no button closes(hides) the delete prompt
        document.getElementById('deleteModal').style.display = "none";
    }

    
    document.getElementById('add-button').onclick = function() {//displays the add contact form
        let modal = document.getElementById('theModal');
        modal.style.display = "block";
    }
    
    document.getElementById('closeButton').onclick = function() {//closes the add contact form
        let modal = document.getElementById('theModal');
        modal.style.display = "none";
    }

    window.onclick = function(event) {//clicking anywhere will close the add contact form
        let modal = document.getElementById('theModal');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    window.onclick=function(event){//clicking anywhere will close the delete prompt
        if (event.target == document.getElementById('deleteModal')) {
            document.getElementById('deleteModal').style.display = "none";
        }
    }

    
}());

