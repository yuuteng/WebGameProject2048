/**
 * Created by yuut on 2016/5/21.
 */
//获取距离div顶端的高度
function getPosTop(i,j) {
    return 20+i*120;
}
//获取距离div左端的距离
function getPosLeft(i,j) {
    return 20+j*120;
}
//根据board中数字值,返回数字对应的背景颜色
function getNumberBackgroundColor(number) {
    switch (number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
    return "black";
}
//根据数字返回数字颜色
function getNumberColor(number) {
    if(number<=4){
        return "#776e65";
    }
    return "white";
}
//是否有空间产生随机数
function noSpace( board ) {
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            if(board[i][j]==0)
                return false;
        }
    return true;
}
//最左边的那一列不用管,只需要判断后3列可不可以左移(4*3=12)
//左移两种情况:①左边没有东西②左边数字相同可以合并
function canMoveLeft(board) {
    for(var i=0;i<4;i++)
        for(var j= 1; j<4 ; j++)
            //存在数字的话
            if(board[i][j] != 0)
                //如果左侧数字为0 (空)||左侧数字==自己(合并)  可以左移
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                    return true;
    //不能左移
    return false;
}

function canMoveRight(board) {
    for(var i=0;i<4;i++)
        for (var j=2;j>=0;j--)
            //存在数字
            if(board[i][j]!=0)
                //如果右侧为空||相等 可以右移
                if(board[i][j+1]==0 ||board[i][j]==board[i][j+1])
                    return true;
    //不能右移
    return false;
}

function canMoveUp(board) {
    for(var j=0;j<4;j++)
        for(var i=1;i<4;i++)
            if(board[i][j]!=0)
                if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                    return true;
    return false;
}

function canMoveDown(board) {
    for(var j=0;j<4;j++)
        for(var i=2;i>=0;i--)
            if(board[i][j]!=0)
                if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                    return true;
    return false;
}

//水平移动 无障碍col1<col2
function noBlockHorizontal(row,col1,col2,board) {
    for(var i=col1+1 ; i<col2 ; i++)
        if(board[row][i]!=0)
            //有障碍物
            return false;
    //没障碍物
    return true;
}
//垂直移动 无障碍
function noBlockVertical(row1,col,row2,board) {
    for(var i=row1+1;i<row2;i++)
        if(board[i][col]!=0)
            //有障碍物
            return false;
    //没障碍物
    return true;
}
//是否可以移动
function noMove( board ) {
    if(canMoveUp(board)||canMoveDown(board)||canMoveLeft(board)||canMoveRight(board))
        return false;
    return true;
}
