
  //Hàm Setup Game
      let Setup = () =>{
          let block = new Array(3)
          for (let i = 0; i < 3; i++){
              block[i] = new Array(3);
          }
     }
  //Hàm event Restart game
        let Restart = () =>{
            for (int i= 0; i< 3; i++){
                for (int j = 0; j < 3; j++)
                {
                    block[i][j] = ' '
                }
          }
        }
  //Hàm kiểm tra điều kiện kết thúc game: return || 0: Chưa có ai thắng || 1: Người chơi thắng || -1: Máy thắng
      let Check = () => {
            for (int i = 0; i < 3; i++){
                if (block[i][0] == block[i][1] == block[i][2] == 'O' || block[0][i] == block[1][i] == block[2][i] == 'O')
                    return 1
                else if (block[i][0] == block[i][1] == block[i][2] == 'X' || block[0][i] == block[1][i] == block[2][i] == 'X')
                    return -1
            }
            if (block[1][1] == block[0][2] == block[2][0] == 'O' || block[1][1] == block[0][0] == block[2][2] == 'O')
                    return 1
              else if (block[1][1] == block[0][2] == block[2][0] == 'X' || block[1][1] == block[0][0] == block[2][2] == 'X')
                  return -1
          return 0
        }
  //Hàm để N-Player chọn ô
        let NTick = () => {
            let RdRow = Math.floor(Math.random() * 3)
            let RdColumn = Math.floor(Math.random() * 3)
            if (block[RdRow][RdColumn] == 'O' || block[RdRow][RdColumn] == 'X')
                NTick()
            else block[RdRow][RdColumn] = 'X'
        }
  //Hàm event Player chọn ô
        let Tick = (let row, let column) =>{
            block[row][column] = 'O'
        }
  // Hàm để hiển thị giá trị trên màn hình


    //Khởi tạo mảng 2 chiều gồm 3 hàng và 3 cột chứa giá trị X, O;
    Setup()
</script>

