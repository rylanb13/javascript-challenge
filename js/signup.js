"use strict";

/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('signup');
    populateStates(form.elements);
    form.addEventListener('submit', onSubmit);
    document.getElementById('cancelButton').addEventListener('click', redirect);
    document.getElementById('occupation').addEventListener('change', updateOccupation);
});

var updateOccupation = function() {
    var optionForm = document.getElementById('signup').elements['occupationOther'];
    if (this.options[this.selectedIndex].value == 'other') {
        optionForm.style.display = 'block';
    } else {
        optionForm.style.display = 'none';
    }
}

var populateStates = function(formElements) {
    usStates.forEach(function(obj) {
        var option = document.createElement('option');
        option.value = obj.code;
        option.innerHTML = obj.name;
        formElements['state'].appendChild(option);
    });
}

var redirect = function() {
    if(confirm('Do you really want to leave?')) {
        location = ('https://www.google.com');
    }
}

function onSubmit(evt) {
    try {
        evt.returnValue = validate(this);
    } catch (exception) {
        alert(exception);
    }

    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
}

function validate(form) {
    var required = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var valid = true;

    required.forEach(function(value, index) {
        valid &= validateField(form.elements[value]);
    });

    if(form.elements['occupation'].value === 'other') {
        valid &= validateField(form.elements['occupationOther']);
    }

    return valid;
}

function validateField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;

    //console.log(field);

    if(field.name === 'zip') {
        var zipRegExp = new RegExp('^\\d{5}$');
        valid = zipRegExp.test(value);
    }

    if(field.name === 'birthdate') {
        var dob = field.value;
        var age = moment().diff(dob, 'years');
        valid = age >= 13;
    }

    if(valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid-field';
    }
    return valid;
}