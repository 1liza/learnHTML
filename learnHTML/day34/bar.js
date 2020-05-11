function drawOneRect(data) {
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