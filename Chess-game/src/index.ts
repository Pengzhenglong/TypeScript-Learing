enum Player {
  X = 'x',
  O = 'o'
}

// 判嬴函数
let winsArr = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  //横
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  //竖
  [0, 4, 8], [2, 4, 6]             //斜
]

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
  if (isWin) {
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
  /*  
  实现判嬴函数：
  1.使用some方法遍历数组，并使用some方法的返回值作为返回结果
  */
  //  使用了some方法
  return  winsArr.some(function (item) {
    // 获取到每种获胜情况对应的3个单元格元素
    // 2.1 先拿到每种获胜情况的三个索引
    // console.log(item)
    let cellIndex1 = item[0]
    let cellIndex2 = item[1]
    let cellIndex3 = item[2]
    console.log(cellIndex1, cellIndex2, cellIndex3)
    // 2.2  通过这三个索引从cells中获取到对应的单元格元素

    // console.log(cell1, cell2, cell3)
    // 3. 判断这3个单元格元素是否同时包含当前玩家的类名
    // 1.元素是否包含类名classList.contains()
    // 2.同时包含(第一个包含 并且 第二个 包含 并且第三个包含)
    // 逻辑运算符  && 逻辑与
  // let  a=  cells[cellIndex1]
    if (hasClass(cells[cellIndex1],player) && 
    hasClass(cells[cellIndex2],player) && 
    hasClass(cells[cellIndex3],player) 
    ) { 
      return  true
    }
    return  false
  })

}
// 封装  hasClass函数 ：判断DOM元素 是否包含某个类名
function  hasClass(el:Element,name:String){
  return  el.classList.contains(name)
}
