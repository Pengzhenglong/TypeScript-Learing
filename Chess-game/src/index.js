var Player;
(function (Player) {
    Player["X"] = "x";
    Player["O"] = "o";
})(Player || (Player = {}));
// 判嬴函数
var winsArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6] //斜
];
var cells = document.querySelectorAll('.cell');
// 游戏面板
var gameBord = document.querySelector('#bord');
// 当前玩家
// 获取信息面板
var message = document.querySelector('#message');
// 获胜者
var winner = document.querySelector('#winner');
// let currentPlayer:Player = Player.X
var currentPlayer;
// 重新开始按钮
var restart = document.querySelector('#restart');
// console.log(restart)
//记录已下棋的次数
var steps;
// 调用函数来初始化游戏数据，开始游戏
startGame();
// 重新游戏
restart.addEventListener('click', startGame);
function startGame() {
    // console.log('click')
    // 重置获胜信息，
    message.style.display = 'none';
    // 重置下棋次数
    steps = 0;
    // 重置默认玩家为x
    currentPlayer = Player.X;
    // 重置下棋提示为x
    gameBord.classList.remove(Player.X, Player.O);
    gameBord.classList.add(Player.X);
    // 给单元格绑定点击事件
    // 清空棋盘
    cells.forEach(function (item) {
        var cell = item;
        // 清空棋盘
        cell.classList.remove(Player.X, Player.O);
        // 移除单元格点击事件，重新给单元格绑定点击事件
        cell.removeEventListener('click', clickcell);
        cell.addEventListener('click', clickcell, { once: true });
    });
}
// 给单元格绑定点击事件 
// cells.forEach(function (item) {
//   // console.log(item)
//   let cell = item as HTMLDivElement
//   cell.addEventListener('click', clickcell, { once: true })
// })
// 棋盘中单元格的click时间处理程序
function clickcell(event) {
    var target = event.target;
    target.classList.add(currentPlayer);
    steps++;
    // 调用判嬴函数判断是否获胜
    var isWin = checkWin(currentPlayer);
    if (isWin) {
        message.style.display = 'block';
        winner.innerText = currentPlayer + '赢了';
        // console.log('当前玩家获胜了', currentPlayer)
        // 因为游戏已经结束，所以，此处直接return
        return;
    }
    if (steps === 9) {
        // 
        message.style.display = 'block';
        winner.innerText = '平局';
        return;
    }
    // 根据当前玩家，得到另一个玩家
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    // 处理下一步提示
    gameBord.classList.remove(Player.X, Player.O);
    gameBord.classList.add(currentPlayer);
}
// 封装判嬴函数
function checkWin(player) {
    /*
    实现判嬴函数：
    1.使用some方法遍历数组，并使用some方法的返回值作为返回结果
    */
    //  使用了some方法
    return winsArr.some(function (item) {
        // 获取到每种获胜情况对应的3个单元格元素
        // 2.1 先拿到每种获胜情况的三个索引
        // console.log(item)
        var cellIndex1 = item[0];
        var cellIndex2 = item[1];
        var cellIndex3 = item[2];
        console.log(cellIndex1, cellIndex2, cellIndex3);
        // 2.2  通过这三个索引从cells中获取到对应的单元格元素
        // console.log(cell1, cell2, cell3)
        // 3. 判断这3个单元格元素是否同时包含当前玩家的类名
        // 1.元素是否包含类名classList.contains()
        // 2.同时包含(第一个包含 并且 第二个 包含 并且第三个包含)
        // 逻辑运算符  && 逻辑与
        // let  a=  cells[cellIndex1]
        if (hasClass(cells[cellIndex1], player) &&
            hasClass(cells[cellIndex2], player) &&
            hasClass(cells[cellIndex3], player)) {
            return true;
        }
        return false;
    });
}
// 封装  hasClass函数 ：判断DOM元素 是否包含某个类名
function hasClass(el, name) {
    return el.classList.contains(name);
}
