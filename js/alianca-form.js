const aliancaForm = (function($) {
    const ALIANCA_NOME = $("[name='nome']");
    const ALIANCA_PLANETA = $("[name='planeta']");
    const ALIANCA_DATA_NASCIMENTO = $("[name='data_nascimento']");
    const ALIANCA_DESCRICAO = $("[name='descricao']");
    const ALIANCA_UPDATE_BUTTON = $("#updateButton");

    function clear() {
        setData();
        ALIANCA_NOME.focus();
    }

    function hasErrors() {
        return ALIANCA_NOME.val() === null || ALIANCA_PLANETA.val() === '' || ALIANCA_DATA_NASCIMENTO.val() === '' || ALIANCA_DESCRICAO.val() === '';
    }

    function getData() {
        return {
            nome: ALIANCA_NOME.val(),
            planeta: ALIANCA_PLANETA.val(),
            data_nascimento: ALIANCA_DATA_NASCIMENTO.val(),
            descricao: ALIANCA_DESCRICAO.val(),
        };
    }

    function setData(nome='', planeta='', data_nascimento='', descricao='') {
        ALIANCA_NOME.val(nome);
        ALIANCA_PLANETA.val(planeta);
        ALIANCA_DATA_NASCIMENTO.val(data_nascimento);
        ALIANCA_DESCRICAO.val(descricao);
    }

    function setSubmitButtonText(str) {
        ALIANCA_UPDATE_BUTTON.text(str);
    }

    function getSubmitButtonText() {
        return ALIANCA_UPDATE_BUTTON.text();
    }

    return {
        clear: clear,
        hasErrors: hasErrors,
        getData: getData,
        setData: setData,
        setSubmitButtonText: setSubmitButtonText,
        getSubmitButtonText: getSubmitButtonText,
    };
})(jQuery);