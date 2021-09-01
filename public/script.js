
// Load google charts
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Raspunsuri', 'Din total'],
        ['Prima varianta', 8],
        ['A doua varianta', 2],
        ['A treia varianta', 3],
        ['Ultima varianta', 5]
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = { 'title': 'Rezultate intrebari', 'width': 550, 'height': 400 };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

function ticketsNumber() {
    var total = document.getElementById("total").value;
    var trib = document.getElementById("tribuna").value;
    var pel = document.getElementById("peluza").value;
    var vip = document.getElementById("vip").value;
    total = parseInt(total, 10);
    trib = parseInt(trib, 10);
    pel = parseInt(pel, 10);
    vip = parseInt(vip, 10);

    if (total > 5 || total < 1 || total != trib + pel + vip) {
        window.alert("Ati selectat numar invalid de bilete");
        location.replace('/bilete');
    }
    else {
        location.replace('/disponibilitate?Vip:=' + vip + '?tribune:=' + trib + '?peluza:=' + pel);
    }
}

function Numbers(i, f) {
    console.log(i, f);
}

$(function () {
    $('#btnSeating').on('click', createseating);
});
//Note:In js the outer loop runs first then the inner loop runs completely so it goes o.l. then i.l. i.l .i.l .i.l. i.l etc and repeat
function Viz() {

    location.replace('/vizualizare?totalB' + totalB);
}

function SendC() {
    window.alert("Comanda realizata cu succes!");
    location.replace('/acasa');
}

function rezultatSondaj() {
    window.alert("Va multumim pentru timpul acordat!");
    
}

function createseating() {
    var url = window.location.href;
    var arrayul = url.split("?");
    vip = arrayul[1];
    trib = arrayul[2];
    pel = arrayul[3];
    var vip_nr = vip.split("=");
    var trib_nr = trib.split("=");
    var pel_nr = pel.split("=");
    var seatingValue = [];
    for (var i = 0; i < 29; i++) {
        for (var j = 0; j < 29; j++) {
            if ((i > 9 && i < 22) && (j > 9 && j < 20)) {
                var seatingStyle = "<div class='seat stadium id=" + i + "," + j + "'></div>";
                seatingValue.push(seatingStyle);
            }
            else if ((i >= 8 && i <= 23) && (j >= 8 && j <= 21) && i != 1 && j != 1) {
                var seatingStyle = "<div class='seat vip'id=" + i + "," + j + "></div>";
                seatingValue.push(seatingStyle);
            }
            else if ((i >= 5 && i <= 26) && (j >= 5 && j <= 24) && i != 1 && j != 1) {
                var seatingStyle = "<div class='seat peluza'id=" + i + "," + j + "></div>";
                seatingValue.push(seatingStyle);
            }
            else if (i == 0) {
                var seatingStyle = "<div class='seat coloana' id=" + i + "," + j + "></div>";
                seatingValue.push(seatingStyle);
            }
            else if (i == 28) {
                var seatingStyle = "<div class='seat coloana' id=" + i + "," + j + "></div>";
                seatingValue.push(seatingStyle);
            }
            else if (j == 0) {
                var seatingStyle = "<div class='seat linie'id=" + i + "," + j + "></div>";
                seatingValue.push(seatingStyle);
                seatingStyle = i;
            }
            else if (j == 28) {
                var seatingStyle = "<div class='seat coloana' id=" + i + "," + j + "></div>";
                seatingValue.push(seatingStyle);
            }
            else {
                var seatingStyle = "<div class='seat tribuna'id=" + i + "," + j + "></div>";
                seatingValue.push(seatingStyle);
            }
            if (j === 30) {
                var seatingStyle = "<div class='clearfix'></div>";
                seatingValue.push(seatingStyle);
            }
        }
    }
    $('#messagePanel').html(seatingValue);
    $(function () {
        var vipB = 0;
        var pelB = 0;
        var tribB = 0;
        var a = vip_nr[1];
        a = parseInt(a, 10);
        var b = pel_nr[1];
        b = parseInt(b, 10);
        var c = trib_nr[1];
        c = parseInt(c, 10);


        total = a + b + c;
        var totalB = 0;


        vip_nr = vip_nr.map(Number);
        $('.seat').on('click', function () {


            if ($(this).is(":not(.stadium)") && $(this).is(":not(.selected)") && $(this).is(":not(.linie)") && $(this).is(":not(.coloana)")) {
                if (totalB != total) {
                    if (vipB != vip_nr[1]) {
                        do {
                            if ($(vip_nr[1]) != 0) {


                                if ($(this).is(".vip")) {
                                    if ($(this).hasClass("current")) {
                                        $(this).removeClass("current");
                                        vipB--;
                                        totalB--;
                                    } else {
                                        $(this).addClass("current");
                                        vipB = vipB + 1;
                                        totalB++;

                                    }
                                } else {
                                    window.alert("Ati selectat un loc invalid, trebuie sa selectati bilete vip(culoarea verde)");
                                }
                            }
                            if (vipB - 1 == vip_nr[1]) {
                                window.alert("Ati selectat prea multe bilete din aceasta categorie.");
                            }
                        } while (vipB - 1 == vip_nr[1]);
                    }
                    else if (pelB != pel_nr[1]) {
                        do {
                            if ($(pel_nr[1]) != 0) {


                                if ($(this).is(".peluza")) {
                                    if ($(this).hasClass("current")) {
                                        $(this).removeClass("current");
                                        pelB--;
                                        totalB--;
                                    } else {
                                        $(this).addClass("current");
                                        pelB = pelB + 1;
                                        totalB++;
                                    }
                                } else {
                                    window.alert("Ati selectat un loc invalid, trebuie sa selectati bilete peluza(culoare albastru inchis)");
                                }
                            }
                            if (pelB - 1 == pel_nr[1]) {
                                window.alert("Ati selectat prea multe bilete din aceasta categorie.");
                            }
                        } while (pelB - 1 == pel_nr[1]);
                    } else if (tribB != trib_nr[1]) {
                        do {
                            if ($(trib_nr[1]) != 0) {


                                if ($(this).is(".tribuna")) {
                                    if ($(this).hasClass("current")) {
                                        $(this).removeClass("current");
                                        tribB--;
                                        totalB--;
                                    } else {
                                        $(this).addClass("current");
                                        tribB = tribB + 1;
                                        totalB++;
                                    }
                                } else {
                                    window.alert("Ati selectat un loc invalid, trebuie sa selectati bilete tribuna(culoare albastru deschis)");
                                }
                            }
                            if (tribB - 1 == trib_nr[1]) {
                                window.alert("Ati selectat prea multe bilete din aceasta categorie.");
                            }
                        } while (tribB - 1 == trib_nr[1]);
                    }

                }
                else if ($(this).is(".tribuna")) {
                    if ($(this).hasClass("current")) {
                        $(this).removeClass("current");
                        tribB--;
                        totalB--;
                    }
                }
                else if ($(this).is(".peluza")) {
                    if ($(this).hasClass("current")) {
                        $(this).removeClass("current");
                        pelB--;
                        totalB--;
                    }
                }
                else if ($(this).is(".vip")) {
                    if ($(this).hasClass("current")) {
                        $(this).removeClass("current");
                        vipB--;
                        totalB--;
                    }
                }
                if (totalB == total) {
                    window.alert("Ati selectat toate bilete.");
                }
            }
        }
        );
        $("#butCom").click(function () {
            var plata = 0;
            plata = 50 * vipB + 30 * pelB + 10 * tribB;
            if ($(this).hasClass(".current")) {
                $(this).removeClass("current");
                $(this).addClass("selected");
            }
            location.replace('/vizualizare?totalB=' + totalB + '?vipB=' + vipB + '?tribB=' + tribB + '?pelB=' + pelB + '?plata=' + plata);
        });
        $('.seat').mouseenter(function () {
            $(this).addClass("hovering");

            $('.seat').mouseleave(function () {
                $(this).removeClass("hovering");
            });
        });
    });
};









