/**
 * Created by yuut on 2016/5/21.
 */
var board = new Array();
var score = 0;
//记录每个小格子是否已经发生了一次碰撞
var hasConflicted = new Array();

//捕捉触控
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function () {
    prepareForMobile();
    newGame();
})
//移动端使用的时候 调用 所获取的尺寸
function prepareForMobile() {
    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
    }
    //大方块css调整
    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02 * gridContainerWidth);
    //每个小方格
    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02 * cellSideLength);
}

//初始化游戏
function newGame() {
    // 初始化棋盘格
    init();
    //在随机两个格子上生成数
    generateOneNumber();
    generateOneNumber();
}

//初始化棋盘
function init() {
    //绘制棋盘
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            var gridCell= $("#grid-cell-"+i+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
    }
    //将一维数组board转化为二维,初始化为0
    for(var i=0;i<4;i++){
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j]=false;//初始都没有碰撞
        }
    }
    updateBoardView();
    //初始化分数
    score = 0;
    updateScore(score);
}

function updateBoardView() {
    //如果已经存在number-cell
    $(".number-cell").remove();

    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$('#number-cell-'+i+'-'+j);

            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                //放中间
                // theNumberCell.css('top',getPosTop(i,j)+50);
                // theNumberCell.css('left',getPosLeft(i,j)+50);
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2);
            }
            else {
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //根据数字选择颜色
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                //选择文字前景色
                theNumberCell.css('color',getNumberColor(board[i][j]));
                //显示数字的值
                //theNumberCell.text(getWords(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j]=false;
        }
    $('.number-cell').css('line-height',cellSideLength + 'px');
    $('.number-cell').css('font-size',0.4*cellSideLength + 'px');
}

function generateOneNumber() {
    if(noSpace(board)){
        return false;
    }
    //随机一个位置 Math.randow()  产生一个0-1之间浮点随机数
    //Math.floor() 向下取整 js中也是浮点形式
    var randx =parseInt( Math.floor(Math.random() * 4) );
    var randy =parseInt( Math.floor(Math.random() * 4) );
    //检测位置是否可用
    //优化算法
    var time = 0;
    while(time < 50){
        if(board[randx][randy]==0)
            break;
        randx =parseInt( Math.floor(Math.random() * 4) );
        randy =parseInt( Math.floor(Math.random() * 4) );

        time++;
    }
    //随机生成位置如果50次还没找到的话就人工生成位置
    if(time == 50 ){
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++)
                if(board[i][j]==0){
                    randx=i;
                    randy=j;
                }
    }

    //随机一个数字
    var randNumber = Math.random() <0.5 ? 2 : 4 ;
    //在随机位置上显示数字
    board[randx][randy]=randNumber;

    //动画显示数字
    showNumberWithAnimation(randx,randy,randNumber);

    return true;
}

//键盘控制
$(document).keydown(function (event) {
    switch (event.keyCode){
        case 37://left
            //阻挡默认应该发生的效果(浏览器窗口滚动条移动)
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38://up
            //阻挡默认应该发生的效果(浏览器窗口滚动条移动)
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39://right
            //阻挡默认应该发生的效果(浏览器窗口滚动条移动)
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40://down
            //阻挡默认应该发生的效果(浏览器窗口滚动条移动)
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default://other
            break;
    }
})

//触摸控制
document.addEventListener('touchstart',function (event) {
    //event.touches[0] 是一个数组,可捕捉多点触控
    startx = event.touches[0].pageX ;
    starty = event.touches[0].pageY;
});
//Andriod bug
document.addEventListener('touchmove',function (event) {
    event.preventDefault();
});
document.addEventListener('touchend',function (event) {
    //event.changedTouches[0] 手指离开屏幕时候的坐标
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;
    /**
     * 当用户点击而不是滑动的时候不进行操作
     * 点击的时候会产生touchend事件,
     * 当计算deltaxy的时候小于一定的范围的时候,则说明用户只是想点击而不是滑动
     * */
    if(Math.abs(deltax) < 0.1*documentWidth && Math.abs(deltay) < 0.1*documentWidth)
        return;

    //滑动是x方向
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax>0){
            //move right
            if (moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
        else {
            //move left
            if (moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }

    }
    //y方向
    else{
        if( deltay>0 ){
            //move down
            if (moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
        else {
            //move up
            if (moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
    }
});

//游戏结束条件: 1.没有空间 2.不可合并
function isGameOver() {
    if(noSpace(board) && noMove(board)){
        gameOver();
    }
}
function gameOver() {
    alert("Please try again !");
}

function moveLeft() {
    if(!canMoveLeft(board)){
        return false;
    }
    //moveLeft
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                //对j列左侧所有元素进行考察
                for(var k=0;k<j;k++){
                    //i k位置没有元素 && i j->i k移动过程中没有障碍物
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        //从ij移动到ik
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    //1. i k 与i j元素 相等 &&2. i j->i k移动过程中没有障碍物 &&
                    // 3.将要移动的i k 位置没有碰撞
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add 叠加
                        board[i][k] += board[i][j];
                        board[i][j]=0;
                        //add score 增加两个数字叠加之后的分数 board[i][k]
                        score = score + board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }

            }
        }
    //等待200ms
    setTimeout("updateBoardView()",200);
    return true;
}
function moveRight() {
    if(!canMoveRight(board)){
        return false;
    }
    //moveRight
    for(var i=0;i<4;i++)
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                //对j右边元素进行考察
                for(var k=3;k>j;k--){
                    //i k位置没有元素 && i j->i k移动过程中没有障碍物
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) &&!hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] *=2;
                        board[i][j]=0;
                        //add score 增加两个数字叠加之后的分数 board[i][k]
                        score = score + board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }

        }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveUp() {
    if(!canMoveUp(board))
        return false;
    //move up
    for(var j=0;j<4;j++)
        for(var i=1;i<4;i++)
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0 && noBlockVertical(k,j,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j] && noBlockVertical(k,j,i,board)&& !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] *=2;
                        board[i][j] = 0;
                        //add score 增加两个数字叠加之后的分数 board[k][j]
                        score = score + board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown() {
    if(!canMoveDown(board)){
        return false;
    }
    //move down
    for(var j=0;j<4;j++)
        for(var i=2;i>=0;i--)
            if(board[i][j]!=0)
                for(var k=3;k>i;k--){
                    if(board[k][j]==0 && noBlockVertical(i,j,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j] && noBlockVertical(i,j,k,board)&& !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]*=2;
                        board[i][j]=0;
                        //add score 增加两个数字叠加之后的分数 board[k][j]
                        score = score + board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
    setTimeout("updateBoardView()",200);
    return true;
}






