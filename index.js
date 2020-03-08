String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}


var faqs_row = 0;

function test() {
    $("#table0").initTable(["name", "gender"]);
    $("#table1").initTable(["name", "gender"]);
}

function test2() {
    let cell0 = { type: CellType.text, placeholder: "User name", data: ["aa", "bb", "cc"] };
    let cell1 = { type: CellType.select, placeholder: "select one", data: ["111", "222", "333"] };
    $("#table0").addRow([cell0, cell1]);
    $("#table1").addRow([cell0, cell1]);
}

function addfaqs() {
    html = '<tr id="faqs-row' + faqs_row + '">';
    html += '<td><input type="text" class="form-control" placeholder="User name"></td>';
    html += '<td><select class="form-control"><option selected>Open this select menu</option>\
    <option value="1">One</option><option value="2">Two</option><option value="3">Three</option>\
    </select></td>';
    html += '<td class="mt-10"><button class="btn btn-danger" onclick="$(\'#faqs-row' + faqs_row + '\').remove();">Delete</button></td>';

    html += '</tr>';

    $('#faqs tbody').append(html);

    faqs_row++;
}