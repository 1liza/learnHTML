let table = document.getElementsByTagName("table")[0];
//getElementsByTagName返回的是集合，所以要加[0]
//let table = document.getElementById("my-table"); 
//getElementById不用考虑这个问题
let headerArr = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
let header = table.createTHead();
let row0 = header.insertRow(0);

for (let i = 0; i < headerArr.length; i++) {
    row0.insertCell(row0.cells.length).innerHTML = headerArr[i];
}
for (let i=0; i<sourceData.length;i++) {
    let rows = table.insertRow(table.rows.length);
    rows.id = i
    rows.insertCell(0).innerHTML = sourceData[i].product;
    rows.insertCell(1).innerHTML = sourceData[i].region;
    for (let j=0; j<12; j++) {
        rows.insertCell(j+2).innerHTML = sourceData[i].sale[j];
    }
}

let row_array = document.getElementsByTagName("tr");
for (var i=1;i<row_array.length;i++) {
    row_array[i].onmouseover = function() {
        console.log(this.id);//这里要用this返回单元格所在的行
        //console.log(e);//返回的是具体的单元格
        showPic(sourceData[this.id].sale)
    }
}

function showPic(data) {
    //---------------------------------折线图--------------------------------
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
        var canvas = document.getElementById("canvas");
        if (canvas.getContext){
            //检查支持性
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
                let y = startY - data[i];
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
    let cxt = document.getElementById("canvas").getContext("2d");
    cxt.clearRect(startX, 0 ,axisX, startY); //清理图形
    draw();
    //-----------------------------柱状图-----------------------------------------
    function drawOneRect() {
        //绘图区高宽，轴的高宽和起始位置
        let w = 525;
        let h = 350;
        let axisX = 500;
        let axisY = 300;
        let startX = 25;
        let startY = 325;
        //定义每个柱子的宽度和间隔
        let barWidth = 32;
        let betweenRect = 9;
        //定义柱子颜色，轴的颜色
        let barColor = "#5BC49F";
        let axisColor = "333";
        //拿到柱状图中的最大值Max；
        let max = data[0];
        for (let i in data) {
            if (data[i] > max) {
                max = data[i];
            }
        }
        //根据max和用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
        let percent = 1;
        let svgStart = "<svg width=" + w + " height=" + h + " version='1.1' xmlns='http://www.w3.org/2000/svg'>";
        let svgEnd = "</svg>";
        //绘制横轴和纵轴
        let row = "<line x1=" + startX + " y1=" + startY + " x2=" + (startX + axisX) + " y2=" + startY + " style='stroke:#333;stroke-width:1' />";
        let col = "<line x1=" + startX + " y1=" + startY + " x2=" + startX + " y2=" + (startY - axisY) + " style='stroke:#333;stroke-width:1' />";
        //遍历数据，计算将要绘制柱子的高度和位置，绘制每一个柱子
        let svgT = svgStart + row + col;
        for (let i = 0; i < data.length; i++) {
            let rectStartX = startX + betweenRect * (i + 1) + barWidth * i;
            let rectStartY = startY - data[i];
            var bar = "<rect x=" + rectStartX + " y=" + rectStartY + " width=" + barWidth + " height=" + data[i] + " style='fill:#5BC49F;stroke-width:1'/>";
            svgT += bar;
        }
        svgT += svgEnd;
        return svgT;
    }
    let bar = document.getElementById("bar-wrapper");
    bar.innerHTML = drawOneRect(data);
}