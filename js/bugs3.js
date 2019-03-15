// Avoiding message : "There no contacts saved"
function update_table_status() {}

// Deleting the last contact character when the user save
function extract_contact_data(form) {
    var name = $("#contact-name",form).val();
    return {"id": $("#contact-id", form).val(), "name": name.substring(0,name.length-1), "mail": $("#contact-mail",form).val()};
}

// Doubling contacts when the user edit
function remove_contact_to_edit(id) { }

