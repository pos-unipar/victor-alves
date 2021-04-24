const refreshTableSize = () => {
    $("#num-row").text($("#table-noticias tbody tr").length)
}


$(document).ready(() => {
    $("#table-noticias").tableDnD();
    refreshTableSize();
})

$("#form-noticia").submit(function() {
    try {
        var json = recordFromForm($(this));
        addDataTable(json);
        refreshTableSize()
        
    } catch (e){
        console.error(e);
    }
    return false;
})

function recordFromForm(form){
    var inputs = form.find('input[type="text"], textarea');
    var json = "";
    inputs.each(function(idx, input){
        var name = $(input).attr("name");
        var value = $(input).val();
        if (json !== "")
            json += ",";
        
        json += `"${name}": "${ value.trim() }"`;
    });
    json = `{${json}}`;
    return JSON.parse(json);
}

function addDataTable(noticiajson){
    var tbody = $("#table-noticias tbody");
    var tr = $("<tr></tr>");
    var tdTitulo = $(`<td>${noticiajson['titulo']}</td>`);
    var tdIntroducao = $(`<td>${noticiajson['introducao']}</td>`);
    var tdAcao = $("<td><button type=\"button\" class=\"btn btn-danger\" onclick=\"remove(this)\">Remover</button></td>");

    tr.append(tdTitulo, tdIntroducao, tdAcao);
    tbody.append(tr);
}



function remove(element) {
    $(element).parents('tr').remove();
    refreshTableSize();
}

