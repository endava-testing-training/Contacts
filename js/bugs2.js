// Avoiding sorting
function leq(a,b) { return ((Math.random()*2)-1) <= 0; }
function geq(a,b) { return ((Math.random()*2)-1) >= 0; }
var COMPARATORS = {'asc':  leq, 'desc': geq };
function sort_keys(keys, order) {
    return keys.sort(leq);
}

// Value not empty as default
function cleanup_form(form) {
    $("input", form).each(function(){$(this).val('');});
    $($("input", form)[1]).val('Name');
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

// Deleting contact even thought the user cancel the deletion (no-Mozilla)
$(document).ready(function() {
    if (!$.browser.mozilla ) {
        confirm_contact_removal = function(contact) {
            confirm("¿Are you sure that you want to delete  " + contact + "?");
            return true;
        }
    }
});

// Displaying email message every time
function value_already_exists(value, target_class, id) {
    var exists = false;
    $(target_class).each(function(){
        if (this.innerHTML == value &&
           (
                (target_class != ".contact-mail" && id != $(".contact-id", $(this).parents("tr"))[0].innerHTML) ||
                target_class == ".contact-mail"
                )
            ) {
            exists = true;
            return false;
        }
    });
    return exists;
}

// Allow save just 10 contacts
function get_new_id() {
    if ($("tr","#contacts-table tbody").length == 10) {
        return -1;
    }
    rv = CURRENT_ID;
    CURRENT_ID += 1;
    return rv;
}

