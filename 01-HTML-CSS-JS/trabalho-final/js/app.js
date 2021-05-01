var orderTotalAmount = 0;
var orderTotalPrice = 0;

const showCarrinhoVazio = () => {
    $("#alert-carrinho-vazio").attr("hidden", ($("#table-carrinho tbody tr").length !== 0));
}

refreshTotal(orderTotalPrice, orderTotalAmount);

function allowDrop(ev) {
    ev.preventDefault();
}

function endDrag(ev) {
    ev.preventDefault();
    $("#dropdown-carrinho").attr("hidden", true);
}

function startDrag(ev) {
    $("#dropdown-carrinho").removeAttr("hidden");
    const element = ev.target;

    let name = element.querySelector('.card-title').innerHTML;
    let price = element.querySelector('input[name="valor"]').value;
    let amount = element.querySelector('input[name="qtde"]').value;

    ev.dataTransfer.setData("name", name);
    ev.dataTransfer.setData("price", price);
    ev.dataTransfer.setData("amount", amount);
}

function dropped(ev) {
    ev.preventDefault();

    let name = ev.dataTransfer.getData("name");
    let price = ev.dataTransfer.getData("price");
    let amount = ev.dataTransfer.getData("amount");
    let totalPrice = price * amount;

    var tbody = $("#table-carrinho tbody");
    var tr = $("<tr></tr>");
    var tdAcao = $("<td><button type=\"button\" class=\"btn btn-danger\" onclick=\"remove(this)\">Remover</button></td>");
    var tdDesc = $(`<td>${name}</td>`);
    var tdQuant = $(`<td>${amount}</td>`);
    var tdValor = $(`<td>${totalPrice}</td>`);

    tr.append(tdDesc, tdQuant, tdValor, tdAcao);
    tbody.append(tr);

    $("#dropdown-carrinho").attr("hidden", true);

    refreshTotal(totalPrice, amount);
}

function refreshTotal(price, amount) {
    orderTotalPrice += Number(price);
    orderTotalAmount += Number(amount);

    $("#qtd-total").text(orderTotalAmount);
    $("#valor-total").text(orderTotalPrice);

    showCarrinhoVazio();
}

function remove(element) {
    const parents = $(element).parents('tr');

    let amount = - Number(parents[0].children[1].innerHTML)
    let price = - Number(parents[0].children[2].innerHTML)
    
    parents.remove();
    refreshTotal(price, amount);
}

