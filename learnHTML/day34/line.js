let data = [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270];
//绘图区高宽，轴的高宽和起始位置
let max_d = 0;
for (let i in data) {
    max_d = Math.max(max_d, data[i]);
}
console.log(max_d);
let axisX = 500;
let axisY = 300;
let startX = 25;
let startY = 325;
//定义每个柱子的宽度和间隔
let barWidth = 40;
//定义柱子颜色，轴的颜色
let barColor = "#5BC49F";
let axisColor = "333";
console.log("进入脚本");

function draw() {
    console.log("进入函数");
    var canvas = document.getElementById("canvas");
    if (canvas.getContext){
        var ctx = canvas.getContext("2d");
        //数轴
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX+axisX, startY);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY-axisY);
        ctx.stroke();
        //画点
        ctx.beginPath();
        for (let i=0;i<data.length;i++) {
            let x = barWidth * (i+1) + startX;
            let y = startY - Math.round(data[i]/max_d*axisY);
            //连线
            if (i===0) {
                ctx.moveTo(x, y);                
            } else {
                ctx.lineTo(x, y);            
            }
            console.log("画点")
            ctx.arc(x, y, 5, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fillStyle = "orange";
            ctx.fill();
            ctx.beginPath();
            //如果连线和画点在同一个循环里面是无法给点填充颜色的
        }        
    }
}
draw();
