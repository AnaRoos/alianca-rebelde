// Próximo ID para adicionar um novo registro
let _nextId = 1;
// ID do registro que está sendo editado
let _activeId = 0;

function handleAliancaEdit() {
    const row = $(this).parents("tr");
    const cols = row.children("td");

    _activeId = $($(cols[4]).children("button")[0]).data("id");
    aliancaTable.startEdit(_activeId);
}

function handleAliancaDeleteClick() {
    const row = $(this).parents("tr");
    const cols = row.children("td");

    _activeId = $($(cols[4]).children("button")[0]).data("id");
    aliancaTable.deleteItem(_activeId);
}

function handleAliancaSubmission(e) {
    e.preventDefault();

    if (aliancaForm.hasErrors()) {
        return;
    }

    if (aliancaForm.getSubmitButtonText() === "Atualizar") {
        aliancaTable.updateInTable(_activeId);
        aliancaForm.setSubmitButtonText("Adicionar Solicitação");
    } else {
        aliancaTable.addToTable(_activeId);
        _nextId += 1;
    }

    aliancaForm.clear();
}

$(document).ready(() => {
    const ALIANCA_FORM = $("#alianca-form");
    const ALIANCA_TABLE = $("#aliancaTable");

    ALIANCA_TABLE.on('click', '.alianca-edit', handleAliancaEdit)
    .on('click', '.alianca-delete', handleAliancaDeleteClick);

    ALIANCA_FORM.on('submit', handleAliancaSubmission);
    aliancaTable.loadTable();
});
