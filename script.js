//Setup Game
let arr = new Array(3);
for (let i = 0; i < 3; i++) {
  arr[i] = new Array(3);
}
//Hàm loại bỏ và thêm animation khỏi các ô
let removeAnimation = (pID) => {
  let styleSheet = document.styleSheets[0];
  for (let i = 0; i < styleSheet.cssRules.length; i++) {
    let rule = styleSheet.cssRules[i];
    if (rule.selectorText === ".cell:hover") {
      rule.style.animation = "none";
      break;
    }
  }
  //document.getElementById(pID).style.animation = "none";
};
let addAnimationEvents = () => {
  let styleSheet = document.styleSheets[0];
  for (let i = 0; i < styleSheet.cssRules.length; i++) {
    let rule = styleSheet.cssRules[i];
    if (rule.selectorText === ".cell:hover") {
      rule.style.animation = "blinkblink 1s linear infinite";
      break;
    }
  }
};
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
  addAnimationEvents();
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
      if (block[i][j] == " ") {
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

//////Hàm máy Level 0, 1
/*Hàm Random từ mảng*/
function getRandomFrom(values) {
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
/* Tìm đường chặn */
let isEmpty = (block, [row, column]) => {
  if (block[row][column] == "O" || block[row][column] == "X") return false;
  return true;
};
let blocked = (block = arr, Type) => {
  for (let i = 0; i < 3; i++) {
    if (block[i][1] == Type) {
      if (block[i][2] == Type && block[i][0] == " ") return [i, 0];
      else if (block[i][0] == Type && block[i][2] == " ") return [i, 2];
    } else if (block[i][0] == Type && block[i][2] == Type && block[i][1] == " ")
      return [i, 1];

    if (block[1][i] == Type) {
      if (block[2][i] == Type && block[0][i] == " ") return [0, i];
      else if (block[0][i] == Type && block[2][i] == " ") return [2, i];
    } else if (block[0][i] == Type && block[2][i] == Type && block[1][i] == " ")
      return [1, i];
  }
  return [null, null];
};
let cross_blocked = (block) => {
  if (block[1][1] == "O") {
    //cross blocks
    if (block[0][0] == "O" && block[2][2] == " ") return [2, 2];
    if (block[0][2] == "O" && block[2][0] == " ") return [2, 0];
    if (block[2][0] == "O" && block[0][2] == " ") return [0, 2];
    if (block[2][2] == "O" && block[0][0] == " ") return [0, 0];
  } else if (block[1][1] == "X") {
    //cross attack
    if (block[0][0] == "X" && block[2][2] == " ") return [2, 2];
    if (block[0][2] == "X" && block[2][0] == " ") return [2, 0];
    if (block[2][0] == "X" && block[0][2] == " ") return [0, 2];
    if (block[2][2] == "X" && block[0][0] == " ") return [0, 0];
  }
  return [null, null];
};
/* Đếm số ô trống */
let CountEmpty = (block) => {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (block[i][j] == " ") {
        count++;
      }
    }
  }
  return count;
};
////Level 0
let Level0 = (block) => {
  let RdRow = getRandomFrom([0, 1, 2]);
  let RdColumn = getRandomFrom([0, 1, 2]);
  if (!isEmpty(block, [RdRow, RdColumn])) return Level0(block);
  else {
    return [RdRow, RdColumn];
  }
};
////Level 1
let Level1 = (block) => {
  let [pRow, pColumn] = blocked(block, "O");
  if (pRow == null) return Level0(block);
  else {
    return [pRow, pColumn];
  }
};
////Level 2
let Level2 = (block) => {
  let [pRow, pColumn] = [1, 1];
  switch (CountEmpty(block)) {
    case 8:
      if (block[pRow][pColumn] == " ") return [1, 1];
      if (block[pRow][pColumn] == "O")
        return [getRandomFrom([0, 2]), getRandomFrom([0, 2])];
      break;
  }
  [pRow, pColumn] = cross_blocked(block);
  if (pRow != null && isEmpty(block, [pRow, pColumn])) return [pRow, pColumn];
  return Level1(block);
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
  //
  removeAnimation(ID);
  let [row, column] = checkID(ID);
  if (block[row][column] == "O" || block[row][column] == "X") return;
  block[row][column] = "O";
  Print(block);
  Result(block);
  if (Check(block) == 1) return;
  //
  let [prow, pcolumn] = Level2(block);
  block[prow][pcolumn] = "X";
  Print(block);
  removeAnimation(pcolumn + 3 * prow);
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
