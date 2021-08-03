enum Player {
  X = 'x',
  O = 'o'
}

let cells = document.querySelectorAll('.cell')

let gameBord = document.querySelector('#bord')
// 当前玩家
// let currentPlayer:Player = Player.X
let currentPlayer = Player.X
cells.forEach(function (item) {
  // console.log(item)
  let cell = item as HTMLDivElement
  cell.addEventListener('click', clickcell, { once: true })
})

// 棋盘中单元格的click时间处理程序

function clickcell(event: MouseEvent) {
  let target = event.target as HTMLDivElement
  target.classList.add(currentPlayer)

  // 调用判嬴函数判断是否获胜
  let isWin = checkWin(currentPlayer)
    if(isWin){
      console.log('当前玩家获胜了', currentPlayer)
    
}

// 根据当前玩家，得到另一个玩家
currentPlayer = currentPlayer === Player.X ? Player.O : Player.X
// 处理下一步提示
gameBord.classList.remove(Player.X, Player.O)
gameBord.classList.add(currentPlayer)
}

// 封装判嬴函数
function checkWin(player: Player) {
  return true
}
