//Hàm Setup Game
let arr = new Array(3);
for (let i = 0; i < 3; i++) {
  arr[i] = new Array(3);
}

//Hàm event Restart game
let Restart = (block = arr) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      block[i][j] = " ";
    }
  }
  Print(block);
};
//Hàm kiểm tra điều kiện kết thúc game: return || 0: Chưa có ai thắng || 1: Người chơi thắng || -1: Máy thắng
let Check = (block) => {
  for (let i = 0; i < 3; i++) {
    if (
      (block[i][0] == "O" && block[i][1] == "O" && block[i][2] == "O") ||
      (block[0][i] == "O" && block[1][i] == "O" && block[2][i] == "O")
    )
      return 1;
    else if (
      (block[i][0] == "X" && block[i][1] == "X" && block[i][2] == "X") ||
      (block[0][i] == "X" && block[1][i] == "X" && block[2][i] == "X")
    )
      return -1;
  }
  if (
    (block[0][0] == "O" && block[1][1] == "O" && block[2][2] == "O") ||
    (block[0][2] == "O" && block[1][1] == "O" && block[2][0] == "O")
  )
    return 1;
  else if (
    (block[0][0] == "X" && block[1][1] == "X" && block[2][2] == "X") ||
    (block[0][2] == "X" && block[1][1] == "X" && block[2][0] == "X")
  )
    return -1;
  return 0;
};
//
let Result = (block) => {
  if (Check(block) == 1)
    document.getElementById("Output").innerHTML =
      "Congratulation! You're win the game!";
  else if (Check(block) == -1)
    document.getElementById("Output").innerHTML = "You lose!";
  else if (Check(block) == 0)
    document.getElementById("Output").innerHTML = "Nothing";
};
//Hàm để N-Player chọn ô
let NTick = (block) => {
  let RdRow = Math.floor(Math.random() * 3);
  let RdColumn = Math.floor(Math.random() * 3);
  if (block[RdRow][RdColumn] == "O" || block[RdRow][RdColumn] == "X")
    NTick(block);
  else block[RdRow][RdColumn] = "X";
};
//Hàm event Player chọn ô
let Tick = (row, column, block = arr) => {
  block[row][column] = "O";
  Print(block);
  Result(block);
  if (Check(block) == 1) return;
  //
  NTick(block);
  Result(block);
  Print(block);
  if (Check(block) == -1) return;
};
// Hàm để hiển thị giá trị trên màn hình
let Print = (block) => {
  for (let i = 0; i < 3; i++) {
    document.getElementById(i).innerHTML = block[0][i];
    document.getElementById(i + 3).innerHTML = block[1][i];
    document.getElementById(i + 6).innerHTML = block[2][i];
  }
};

//Khởi tạo mảng 2 chiều gồm 3 hàng và 3 cột chứa giá trị X, O;
Restart();
