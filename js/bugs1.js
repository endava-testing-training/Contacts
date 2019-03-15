// Avoid the message "There none contacts'
function update_table_status() {}
    
// Avoiding sorting
function leq(a,b) { return ((Math.random()*2)-1) <= 0; }
function geq(a,b) { return ((Math.random()*2)-1) >= 0; }
var COMPARATORS = {'asc':  leq, 'desc': geq };
function sort_keys(keys, order) {
    return keys.sort(leq);
}

// Supporting sorting only in Mozilla browsers
$(document).ready(function(){
    if (!$.browser.mozilla ) {
        $("a","th.sortable").each(function(){
            $(this).attr('onclick','return false');
        });
    }
});

// Erasing  the option to delete contacts  in Mozilla browsers
$(document).ready(function() {
    if ($.browser.mozilla ) {
        CONTACT_ROW_TEMPLATE = "<tr>"
                         +   "<td class='contact-id' name='contact-id' style='display:none'>${id}</td>"
                         +   "<td class='contact-name sortable' name='contact-name'>${name}</td>"
                         +   "<td class='contact-mail sortable' name='contact-mail'>${mail}</td>"
                         +   "<td><i class='icon-pencil' onclick='edit_contact(this)'></i></td>"
                         + "</tr>";

    }
});

// Just supporting maisl ended in .com
function is_valid_email_address(address) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/);
    return pattern.test(address);
}

// Doing that cancel also save
function cancel_contact() {
    var item_id = $("#contact-id", "#contact-form").val();
    if (item_id) {
        var validation_bkup = validate_form;
        validate_form = function(form) {return true;}; // Disable validations
        save_contact();
        validate_form = validation_bkup;
    } else {
        $("#contact-form").fadeOut();
    }
}

// Editing an  element that is not the element to be edited
function edit_contact(icon) {
    var form = $("#contact-form");
    if (confirm_use_of_form(form)) {
        var row = $(icon).parent().parent()[0];
        fake_row = $(row).siblings().length > 0 ? $(row).siblings()[0] : row;
        $("#contact-id",form).val($(".contact-id", row).text());
        $("#contact-name",form).val($(".contact-name", fake_row).text());
        $("#contact-mail",form).val($(".contact-mail", fake_row).text());
        form.fadeIn();
        $("#contact-name",form).focus();
    }
}

// Changing the title of the app
document.title = 'Contacts Library';

// Allowing names empty
MIN_NAME_LENGTH = -1;
