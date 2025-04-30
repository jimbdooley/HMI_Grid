window.USER_drawMediumSilo = function(ctx, b, fillPctTagName) {
    // Create a left-to-right linear gradient
    const x = b[2] - 100
    const y = b[3] - 120
    const gradient = ctx.createLinearGradient(x, y, x + 100, y);
    gradient.addColorStop(0, "#555"); // Dark gray on the left
    gradient.addColorStop(1, "#888"); // Lighter gray on the right

    ctx.fillStyle = gradient;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;

    let ratio = 0.01 * HMIG_state_getTagValByNameAndType(fillPctTagName, "int");
    //ratio = 0.5 + 0.5 * Math.cos(Date.now() * 0.00031)
    const fillY = y + 120 - 120 * (ratio);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 100, y);
    ctx.lineTo(x + 100, y + 80);
    ctx.lineTo(x + 60, y + 120);
    ctx.lineTo(x + 40, y + 120);
    ctx.lineTo(x, y + 80);
    ctx.closePath();
    ctx.fill()
    ctx.stroke();


    ctx.fillStyle = "#fff9"
    ctx.beginPath()
    if (ratio > 0.333333) {
        ctx.moveTo(x, fillY);
        ctx.lineTo(x + 100, fillY);
        ctx.lineTo(x + 100, y + 80);
        ctx.lineTo(x + 60, y + 120);
        ctx.lineTo(x + 40, y + 120);
        ctx.lineTo(x, y + 80);
    } else {
        const botRatio = 3 * (0.333333 - ratio);
        const rightX = x + 100 - 40 * (botRatio);
        const leftX = x + 40 * botRatio;
        ctx.moveTo(rightX, fillY)
        ctx.lineTo(x + 60, y + 120);
        ctx.lineTo(x + 40, y + 120);
        ctx.lineTo(leftX, fillY);
    }  
    ctx.closePath();
    ctx.fill();

};
