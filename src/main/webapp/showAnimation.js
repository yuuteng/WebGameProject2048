/**
 * Created by yuut on 2016/5/21.
 */

//动画显示数字
function showNumberWithAnimation(i,j,randNumber) {
    var numberCell=$('#number-cell-'+i+"-"+j);

    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(getWords(randNumber));
    //动画 jQuery 的animate(a:变成什么样子,b:完成时间毫秒);
    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}

//移动动画
function showMoveAnimation(fromx,fromy,tox,toy) {
    var numberCell=$('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}
//update the score
function updateScore( score ) {
    $('#score').text(score);
}