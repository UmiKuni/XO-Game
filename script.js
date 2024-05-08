//Setup Game
let arr = new Array(3);
for (let i = 0; i < 3; i++) {
  arr[i] = new Array(3);
}
//Hàm thêm các lệnh Click vào mỗi ô
let addClickEvents = () => {
  let cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.setAttribute("onclick", "Tick(parseInt(this.id), arr)");
  }
};
//Hàm event Restart game
let Restart = (block = arr) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      block[i][j] = " ";
    }
  }
  Print(block);
  addClickEvents();
  document.getElementById("Output").innerHTML = "";
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
//Hàm dừng các lệnh Click khi kết thúc trò chơi
let removeClickEvents = () => {
  let cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.removeAttribute("onclick");
  }
};
// Hàm kiểm tra xem bảng có đầy hay không
let isBoardFull = (block) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (block[i][j] === " ") {
        return false; // Nếu có ô trống, trả về false
      }
    }
  }
  return true; // Nếu không còn ô trống, trả về true
};
//Hàm hiển thị kết quá
let Result = (block) => {
  let outputElement = document.getElementById("Output");
  let imgElement = document.createElement("img");
  if (Check(block) == 1) {
    outputElement.innerHTML = "Congratulation! You're win the game!";
    imgElement.src = "cat.jpg";
    removeClickEvents();
  } else if (Check(block) == -1) {
    outputElement.innerHTML = "You lose!";
    imgElement.src = "cat2.jpg";
    removeClickEvents();
  } else if (Check(block) == 0 && isBoardFull(block)) {
    outputElement.innerHTML = "Draw!";
    imgElement.src = "cat3.jpg";
    removeClickEvents();
  } else {
    outputElement.innerHTML = "Nothing";
    return;
  }
  //Thêm ảnh sau khi kết thúc
  imgElement.style.width = "150px"; // Đặt chiều rộng của hình ảnh
  imgElement.style.height = "150px"; // Đặt chiều cao của hình ảnh
  outputElement.appendChild(imgElement);
};
//Hàm máy Level 0, 1
////Level 0
let Level0 = (block) => {
  let RdRow = Math.floor(Math.random() * 3);
  let RdColumn = Math.floor(Math.random() * 3);
  if (block[RdRow][RdColumn] == "O" || block[RdRow][RdColumn] == "X")
    Level0(block);
  else block[RdRow][RdColumn] = "X";
};
/* Tìm đường chặn */
let blocked = (block = arr) => {
  for (let i = 0; i < 3; i++) {
    if (block[i][1] == "O")
      if (block[i][2] == "O") return [i, 0];
      else if (block[i][0] == "O") return [i, 2];
    if (block[1][i] == "O")
      if (block[2][i] == "O") return [0, i];
      else if (block[0][i] == "O") return [2, i];
  }
  return [null, null];
};
////Level 1
let Level1 = (block) => {
  let [pRow, pColumn] = blocked();
  if (pRow == null || block[pRow][pColumn] == "X") Level0(block);
  else {
    block[pRow][pColumn] = "X";
  }
};

//Hàm check ID của từng ô
let checkID = (ID) => {
  let temp = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (ID == temp) {
        return [i, j];
      } else temp++;
    }
  }
};
//Hàm event Player chọn ô
let Tick = (ID, block = arr) => {
  let [row, column] = checkID(ID);
  if (block[row][column] == "O" || block[row][column] == "X") return;
  block[row][column] = "O";
  Print(block);
  Result(block);
  if (Check(block) == 1) return;
  //
  Level1(block);

  Print(block);
  Result(block);
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
