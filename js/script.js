$(document).ready(function()
{
    var box = $('#colorPicker');
    box.tinycolorpicker();

    var box2 = box.data("plugin_tinycolorpicker");
    box2.setColor("#000000");

    $("#eraser").click(function(){
        $('#colorPicker').data("plugin_tinycolorpicker").setColor("#ffffff");
    });

    $(".but").click(function(){
        $("#color").val($(this).val());
    });

    $("#clear").click(function(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        clickX = [];
        clickY = [];
        clickDrag = [];
        clickColor = [];
        clickSize = [];
    });

    $("#save").click(function(){
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href=image;
    });
});

context = document.getElementById('canvas').getContext("2d");
var paint = false;

$('#canvas').mousedown(function (e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
});

$('#canvas').mousemove(function (e) {
    if (paint) {
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
});

$('#canvas').mouseleave(function (e) {
    paint = false;
});

$('#canvas').mouseup(function (e) {
    paint = false;
});


var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var clickSize = new Array();
var paint;

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push($('#colorPicker').data("plugin_tinycolorpicker").colorHex);
    clickSize.push($("#color").val());
}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.lineJoin = "round";
    var radius;
    for (var i = 0; i < clickX.length; i++) {


        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = clickColor[i];
        context.lineWidth = clickSize[i];
        context.stroke();
    }
}