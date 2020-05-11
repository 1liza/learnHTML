function drawLine(data) {
    let w = 550;
    let h = 350;
    let axisX = 500;
    let axisY = 300;
    let startX = 10;
    let startY = 10;
    let pointR = 5;
    let pColor = "#000";
    let lColor = "#37A2DA";
    let lWidth = 2;
    //横向间隔
    let between = 40;
    //拿到最大值
    let max = data[0];
    for (let i = 0; i < data.length; i++) {
        if (max < data[i]) {
            max = data[i];
        }
    }
    //根据最大值和区域高度确定一个数据和像素的比例
    let percent = 1;
    // 绘制横轴纵轴
    let canvas1 = document.getElementById('canvas1');
    canvas1.setAttribute('height', h);
    canvas1.setAttribute('width', w);
    if (canvas1.getContext) {
        let ctx = canvas1.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY + axisY);
        ctx.lineTo(startX + axisX, startY + axisY);
        ctx.strokeStyle = (pColor);
        ctx.stroke();
        //遍历数据，计算将要绘制数据点的坐标，绘制数据点
        ctx.moveTo(70, 350 - data[0]);
        ctx.beginPath();
        for (let i = 0; i < data.length; i++) {
            let x = 15 + between * (i + 1);
            let y = axisY - data[i];
            ctx.lineTo(x, y);
            ctx.arc(x, y, pointR / 2, 0, Math.PI * 2);
            ctx.strokeStyle = lColor;
            ctx.stroke();
        }
    }
}