var CONTACT_ROW_TEMPLATE = "<tr>"
                         +   "<td class='contact-id' name='contact-id' style='display:none'>${id}</td>"
                         +   "<td class='contact-date' name='contact-date'>${date}</td>"
                         +   "<td class='contact-name sortable' name='contact-name'>${name}</td>"
                         +   "<td class='contact-mail sortable' name='contact-mail'>${email}</td>"
                         +   "<td class='contact-address sortable' name='contact-address'>${address}</td>"
                         +   "<td class='contact-phone sortable' name='contact-phone'>${phone}</td>"
                         +   "<td class='contact-city sortable' name='contact-city'>${city}</td>"
                         +   "<td><i class='icon-pencil' onclick='edit_contact(this)'></i> / <i class='icon-remove' onclick='remove_contact(this);'></i></td>"
                         + "</tr>";
var CURRENT_ID = 0;

function remove_contact_to_edit(id) {
    $("tr", "#contacts-table tbody").each(function() {
        var row_id = $("td.contact-id", this).text()
        if (row_id == id) {
            $(this).remove();
            return false;
        }
    });
}

function extract_contact_data(form) {
    return {
        "id": $("#contact-id", form).val(),
        "date": $("#contact-date",form).val(),
        "name": $("#contact-name",form).val(),
        "email": $("#contact-mail",form).val(),
        "address": $("#contact-address",form).val(),
        "city": $("#contact-city",form).val(),
        "phone": $("#contact-phone",form).val()
    };
}

function get_new_id() {
    rv = CURRENT_ID;
    CURRENT_ID += 1;
    return rv;
}

function save_contact() {
    var form = $("#contact-form");
    $(".control-group", form).each(function() {
        cleanup_errors(this);
    });
    if (!validate_form(form)) {
        return false;
    }
    var data = extract_contact_data(form);
    if (!data.id) {
        data.id = get_new_id();
        if (data.id == -1) {
            return;
        }
    } else {
        remove_contact_to_edit(data.id);
    }
    insert_sorted($("#contacts-table"), generate_contact_row(data));
    update_table_status();
    cleanup_form();
    form.fadeOut();
};

function generate_contact_row(data){
   return $.tmpl( CONTACT_ROW_TEMPLATE, {"id": data.id, "date": data.date, "name": data.name, "email": data.email, "address":data.address, "phone":data.phone, "city":data.city});
}

function confirm_use_of_form(form) {
    return form.css('display') == 'none' || confirm('Are you sure that you want to leave without save?');
}

function edit_contact(icon) {
    var form = $("#contact-form");
    console.log (form);
    if (confirm_use_of_form(form)) {
        var row = $(icon).parent().parent()[0];
        $("#contact-id",form).val($(".contact-id", row).text());
        $("#contact-date",form).val($(".contact-date", row).text());
        $("#contact-name",form).val($(".contact-name", row).text());
        $("#contact-mail",form).val($(".contact-mail", row).text());
        $("#contact-address",form).val($(".contact-address", row).text());
        $("#contact-city",form).val($(".contact-city", row).text());
        $("#contact-phone",form).val($(".contact-phone", row).text());

        form.fadeIn();
        $("#contact-name",form).focus();
    }
}

function confirm_contact_removal(contact) {
    return confirm("¿Are you sure that you want to delete " + contact + "?");
}

function remove_contact(icon) {
    var row = $(icon).parent().parent()[0];
    var contact = $(".contact-name", row).text();
    if (confirm_contact_removal(contact)){
        $(row).fadeOut(300, function() {
            $(this).remove();
            update_table_status();
        });
        var form = $("#contact-form");
        if ($("#contact-id", form).val() == $(".contact-id", row).text()) {
            form.fadeOut();
        }
    }
}

function cleanup_form(form) {
    $("input", form).each(function(){$(this).val('');});
}

function validate_field(field, validator, error_message) {
    if (!validator(field)) {
        field.parent().addClass("error");
        $("<span class='help-inline'>"+error_message+"</span>").appendTo(field.parent());
        return false;
    }
    return true;
}

function value_already_exists(value, target_class, id) {
    var exists = false;
    $(target_class).each(function(){
        if (this.innerHTML == value && id != $(".contact-id",$(this).parents("tr"))[0].innerHTML) {
            exists = true;
            return false;
        }
    });
    return exists;
}

function is_valid_email_address(address) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    return pattern.test(address);
}

MIN_NAME_LENGTH = 0;
MAX_NAME_LENGTH = 35;
MAX_PHONE_LENGTH= 11
MIN_MAIL_LENGTH = 0;
MAX_MAIL_LENGTH = 35;

function is_valid_numeric(phone) {
       var pattern = new RegExp (/^([0-9])*$/);
       return pattern.test(phone);
       }

function validate_form(form) {
    var item_id = $("#contact-id", form).val();
    var valid_name = validate_field($("#contact-name",form), function(field) {
                        return $.trim(field.val()).length > MIN_NAME_LENGTH;
                     }, "The contact name is required") &&
                     validate_field($("#contact-name",form), function(field) {
                        return !value_already_exists($.trim(field.val()), "."+field.attr("id"), item_id);
                     }, "The contact name already exists") &&
                     validate_field($("#contact-name",form), function(field) {
                        return $.trim(field.val()).length < MAX_NAME_LENGTH;
                     }, "The contact name cannot have more than 35 characters");

    valid_email = validate_field($("#contact-mail",form), function(field) {
                        return $.trim(field.val()).length > MIN_MAIL_LENGTH;
                  },    "The contact email is required") &&
                  validate_field($("#contact-mail",form), function(field) {
                        return $.trim(field.val()).length < MAX_MAIL_LENGTH;
                     }, "The contact email cannot have more than 35 characters") &&
                  validate_field($("#contact-mail",form), function(field) {
                        return is_valid_email_address(field.val());
                  },    "The email format is not correct") &&
                  validate_field($("#contact-mail",form), function(field) {
                        return !value_already_exists($.trim(field.val()), "."+field.attr("id"), item_id);
                  },    "A contact with this email already exists");
    valid_phone = validate_field($("#contact-phone",form), function(field) {
                        return $.trim(field.val()).length < MAX_PHONE_LENGTH;
                        }, "The contact phone cannot have more than 10 numbers")&&
                  validate_field($("#contact-phone",form), function(field) { ;
                        return is_valid_numeric (field.val());
                        },    "The phone format is not correct")
    return valid_name && valid_email && valid_phone;
}

function cleanup_errors(input) {
    $(".help-inline", input).remove();
    $(input).removeClass("error");
}

function new_contact() {
    var form = $("#contact-form");
    if (confirm_use_of_form(form)) {
        $(form).fadeIn();
        cleanup_form(form);
        $("#contact-date",form).focus();
    }
}

function cancel_contact() {
    $("#contact-form").fadeOut();
}


function update_table_status() {
    var table = $("#contacts-table tbody");
    var num_rows = $("tr", table).length;
    if (num_rows == 0) {
        $(table).addClass("empty");
    } else {
        $(table).removeClass("empty");
    }
}

function getURLParameter(name) {
    var rv = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
    return rv ? decodeURI(rv) : rv;
}

$(document).ready(function() {
    var version = getURLParameter('v');
    if (version) {
        $("#version").text('v'+version);
        $.ajax({
            url: 'js/bugs' + version + '.js',
            dataType: "script",
            async: false
        });
    }
    cleanup_form($('#contact-form'));
    $(".control-group").change(function() {
        cleanup_errors(this);
    });
    update_table_status();
    update_current_sort({'field':'contact-name','direction':'asc'});
});
