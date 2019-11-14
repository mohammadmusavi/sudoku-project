var boards = [];
var final_values = [];

function build_board() {
    var row = '';
    for (var r = 0; r < 9; r++) {
        if (r % 3 == 2 && r != 8) {
            row += '<tr class="border-bottom">';
        } else {
            row += '<tr>';
        }
        for (var c = 0; c < 9; c++) {
            var square = '<td>';
            if (c % 3 == 2 && c != 8) {
                square += '<td class="border-right">';
            }
            square += '<input id="row' + r + '-col' + c + '" class="square" type= "text" onchange="check_val(this)">';
            square += '</td>';
            row += square;
        }
        row += '</tr>';
    }
    var output = document.getElementById('sudoku-board');
    output.innerHTML = row;
}

function refresh() {
    boards = sudoku.board_string_to_grid(sudoku.generate());
    var solved_board = sudoku.solve(sudoku.board_grid_to_string(boards));
    final_values = sudoku.board_string_to_grid(solved_board);
    display_puzzle(boards, false);
}

function solve() {
    display_puzzle(final_values, true);
}

function display_puzzle(board, highlight) {
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            var square = document.getElementById('row' + r + '-col' + c);
            square.classList.remove("green-text");
            square.classList.remove("red-text");
            if (board[r][c] != '.') {
                var board_val = board[r][c];
                var square_val = square.value;
                if (highlight && board_val != square_val) {
                    square.classList.add("green-text");
                }
                square.value = board_val;
            } else {
                square.value = '';
            }
        }
    }
}

var input_id = function(id) {
    var temp = [];
    temp = id.split('row');
    temp = temp[1].split('-col');
    temp[0] = Number(temp[0]);
    temp[1] = Number(temp[1]);
    return temp;
}

function check_val($this) {
    var id_val = $this.getAttribute('id');
    var input_val = $this.value;
    var correct_val = final_values[input_id(id_val)[0]][input_id(id_val)[1]];
    if (input_val == correct_val) {
        $this.classList.remove("red-text");
        $this.classList.add("green-text");
    } else {
        $this.classList.add("red-text");
    }
}

build_board();
refresh();