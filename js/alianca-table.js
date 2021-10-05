const aliancaTable = (function($) {
    const ALIANCA_TABLE_BODY = $("#aliancaTable tbody");
    const token = encodeURI("Ana Paula Roos");

    function aliancaBuildTableRow(id, data) {
        const alianca = {id: id, ...data};
        const aliancaTpl = _.template($("#aliancaTemplate").html());

        return aliancaTpl(alianca);
    }

    function addToTable() {
        var formData = aliancaForm.getData();

        var newData = {
            name: formData.nome,
            planet: formData.planeta,
            birthDate: formData.data_nascimento,
            description: formData.descricao
        };
        var settings = {
            "url": `https://test-mais-a-educacao-v1.herokuapp.com?token=${token}`,
            "method": "POST",
            "contentType": "application/json",
            "dataType": "json",
            "timeout": 0,
            "data": JSON.stringify(newData)
        };

        $.ajax(settings).done(function (response) {
            loadTable();
        });
    }

    function _findBookRowById(id) {
        return $("#aliancaTable button[data-id='" + id + "']").parents("tr")[0];
    }

    function updateInTable(id) {
        const row = _findBookRowById(id);
        const $row = $(row);

        var updatedData = aliancaForm.getData();
        var data = {
            name: updatedData.nome,
            planet: updatedData.planeta,
            birthDate: updatedData.data_nascimento,
            description: updatedData.descricao
        }

        var settings = {
            "url": `https://test-mais-a-educacao-v1.herokuapp.com/${id}?token=${token}`,
            "method": "PUT",
            "contentType": "application/json",
            "dataType": "json",
            "timeout": 0,
            "data": JSON.stringify(data),
        };

        $.ajax(settings).done(function () {
            loadTable();
        });
    }

    function loadTable() {
        ALIANCA_TABLE_BODY.empty();
        var settings = {
            "url": `https://test-mais-a-educacao-v1.herokuapp.com?token=${token}`,
            "method": "GET",
            "timeout": 0,
          };

          $.ajax(settings).done(function (response) {
            for (var i = 0; i < response.length; i++) {
                var item = response[i];
                var data = {
                    nome: item.name,
                    planeta: item.planet,
                    data_nascimento: item.birthDate,
                    descricao: item.description
                };
                ALIANCA_TABLE_BODY.append(aliancaBuildTableRow(item.id, data));
            }
        });
    }

    function deleteItem(id) {
        const row = _findBookRowById(id);
        const $row = $(row);

        var settings = {
            "url": `https://test-mais-a-educacao-v1.herokuapp.com/${id}?token=${token}`,
            "method": "DELETE",
            "timeout": 0,
        };

        $.ajax(settings).done(function () {
            $row.remove();
        });
    }

    function startEdit(id) {
        var settings = {
            "url": `https://test-mais-a-educacao-v1.herokuapp.com/${id}?token=${token}`,
            "method": "GET",
            "timeout": 0,
        };
          
        $.ajax(settings).done(function (response) {
            aliancaForm.setData(response.name, response.planet, response.birthDate, response.description);
            aliancaForm.setSubmitButtonText("Atualizar");
        });
    }

    return {
        startEdit: startEdit,
        deleteItem: deleteItem,
        loadTable: loadTable,
        addToTable: addToTable,
        updateInTable: updateInTable
    }
})(jQuery);