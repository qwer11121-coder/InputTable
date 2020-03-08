var CellType = {
    text: 1,
    select: 2
};

(function ($) {
    let row_index = 0;
    let table_header_list = {};
    let id_table = {};

    function build_table_cell(cellType, id, placeholder, data) {
        let html = "";
        switch (cellType) {
        case CellType.text:
            html = `<td><input type="text" id="${id}" list="${id}_datalist" class="form-control" placeholder="${placeholder}">`;
            if (Array.isArray(data)) {
                html += `<datalist id="${id}_datalist">`;
                data.forEach(element => {
                    html += `<option value="${element}"></option>`;
                });
                html += '</datalist>';
            }
            html += '</td>';
            break;
        case CellType.select:
            html = `<td><select id="${id}" class="form-control"><option disabled selected>${placeholder}</option>`;
            if (Array.isArray(data)) {
                data.forEach(element => {
                    html += `<option value="${element}">${element}</option>`;
                });
            }
            html += '</select></td>';
            break;
        }
        return html;
    }

    $.extend($.fn, {
        initTable: function (columnName) {
            let table_id = $(this).attr("id");
            let thead = '<thead><tr>';
            for (let i = 0; i < columnName.length; i++) {
                thead += `<th>${columnName[i]}</th>`;
            }
            thead += "<th></th></tr></thead><tbody></tbody>";
            $(this).html(thead);
            id_table[table_id] = [];
            table_header_list[table_id] = columnName;
        },
        addRow: function (cells) {
            let cell_content_id_list = [];
            let table_id = $(this).attr("id");
            let cell_index = 0;
            html = `<tr id="${table_id}_row${row_index}">`;
            cells.forEach(el => {
                let cell_content_id = `${table_id}_row${row_index}_cell${cell_index}`;
                html += build_table_cell(el.type, cell_content_id, el.placeholder, el.data);
                cell_content_id_list.push(cell_content_id);
                cell_index++;
            });
            html += `<td class="mt-10"><button class="btn btn-danger" onclick="$('#${table_id}_row${row_index}').remove();">Delete</button></td></tr>`;
            $(this).children('tbody').append(html);
            id_table[table_id].push(cell_content_id_list);
            row_index++;
        },
        export: function (options) {
            let table_id = $(this).attr("id");
            let output = "[";
            let row_count = id_table[table_id].length;
            let column_count = table_header_list[table_id].length;
            for (let row = 0; row < row_count; row++) {
                output += "{";
                for (let column = 0; column < column_count; column++) {
                    output += `"${table_header_list[table_id][column]}": "${$("#"+id_table[table_id][row][column]).val()}"`;
                    if (column < column_count - 1) { output += ","; }
                }
                output += "}";
                if (row < row_count - 1) { output += ","; }
            }
            output += "]"
            return output;
        }
    });
})(jQuery);