/**
 * Created by yuut on 2016/5/21.
 */
var board = new Array();
var score = 0;

$(document).ready(function () {
    newGame();
})

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
        for(var j=0;j<4;j++){
            board[i][j]=0;
        }
    }
    updateBoardView();
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
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);
            }
            else {
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //根据数字选择颜色
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                //选择文字前景色
                theNumberCell.css('color',getNumberColor(board[i][j]));
                //显示数字的值
                theNumberCell.text(board[i][j]);
            }
        }
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
    while(true){
        if(board[randx][randy]==0)
            break;

        var randx =parseInt( Math.floor(Math.random() * 4) );
        var randy =parseInt( Math.floor(Math.random() * 4) );
    }

    //随机一个数字
    var randNumber = Math.random() <0.5 ? 2 : 4 ;
    //在随机位置上显示数字
    board[randx][randy]=randNumber;

    //动画显示数字
    showNumberWithAnimation(randx,randy,randNumber);

    return true;
}











