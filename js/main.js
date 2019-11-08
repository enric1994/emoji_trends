// Go Top button

var mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Charts

function emojiloader() {
    setTimeout(function () {
        document.getElementById("page").style.display = "block";
        document.getElementById("loading").style.display = "none";



        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var annotations = {};
        annotations["santa_claus"] = [
            ["2013-12-24", "Christmas! 🎄"],
            ["2014-12-25", "Christmas! 🎄"],
            ["2015-12-25", "Christmas! 🎄"],
            ["2016-12-24", "Christmas! 🎄"],
            ["2017-12-24", "Christmas! 🎄"],
            ["2018-12-25", "Christmas! 🎄"],
        ];
        annotations["rose"] = [
            ["2013-02-14", "Valentine's Day 💞"],
            ["2014-02-14", "Valentine's Day 💞"],
            ["2015-02-14", "Valentine's Day 💞"],
            ["2017-02-14", "Valentine's Day 💞"],
            ["2018-02-14", "Valentine's Day 💞"],
        ];
        annotations["pig"] = [
            ["2019-02-05", "Chinese Year of the Earth Pig 🇨🇳"],
        ];
        annotations["soccer_ball"] = [
            ["2014-06-12", "Brazil World Cup 2014 started 🇧🇷"],
        ];
        annotations["american_football"] = [
            ["2013-02-04", "Super Bowl XLVII 🇺🇸"],
            ["2014-02-02", "Super Bowl XLVIII 🇺🇸"],
            ["2015-02-02", "Super Bowl XLIX 🇺🇸"],
            ["2016-02-07", "Super Bowl 50 🇺🇸"],
            ["2017-02-06", "Super Bowl LI 🇺🇸"],
            ["2018-02-05", "Super Bowl LII 🇺🇸"],
            ["2019-02-03", "Super Bowl LIII 🇺🇸"],
        ];
        annotations["spain"] = [
            ["2014-06-13", "World Cup Spain-Netherlands(1-5) ⚽"],
            ["2018-06-15", "World Cup Portugal-Spain(3-3) ⚽"],
        ];
        annotations["beer"] = [
            ["2014-07-04", "USA Independence Day 🇺🇸"],
            ["2013-07-04", "USA Independence Day 🇺🇸"],
        ];
        function makeChart(dates, emoji_name, emoji, color1) {
            var pointRadius = [];
            var day = dates.map(function (d) {
                return d.day;
            });
            var usage = dates.map(function (d) {
                return d.usage;
            });

            Chart.defaults.global.legend = false;
            Chart.defaults.global.animation.duration = 400;
            Chart.defaults.global.tooltips.intersect = true;
            Chart.defaults.global.tooltips.borderWidth = 3;
            Chart.defaults.global.tooltips.borderColor = 'black';
            Chart.defaults.global.tooltips.yAlign = 'bottom';
            Chart.defaults.global.tooltips.backgroundColor = 'white';
            Chart.defaults.global.tooltips.titleFontSize = 16;
            Chart.defaults.global.tooltips.titleFontColor = 'black';
            Chart.defaults.global.tooltips.bodyFontColor = '#000';
            Chart.defaults.global.tooltips.bodyFontSize = 14;
            Chart.defaults.global.tooltips.displayColors = false;
            Chart.defaults.global.defaultFontFamily = '"Fredoka One", cursive';
            Chart.defaults.global.maintainAspectRatio = false;
            Chart.defaults.global.responsive = true;
            Chart.defaults.global.plugins.deferred.delay = 400;
            Chart.defaults.global.plugins.deferred.yOffset = '80%'

            scale_options = {

                yAxes: [{ display: false }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'year'
                    },
                    ticks: {
                        fontColor: 'black',
                        fontSize: 18,
                    },
                    gridLines: {
                        display: false
                    },
                }],

            };

            var mychart = document.getElementById(emoji_name);
            var lineChart = new Chart(mychart.getContext("2d"), {
                plugins: [
                    ChartRough,
                ],
                type: ['line'],
                options: {
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 100,
                            bottom: 0
                        }
                    },
                    scales: scale_options,
                    tooltips: {
                        caretPadding: 10,
                        caretSize: 7,
                        cornerRadius: 15,
                        titleFontSize: 18,
                        titleFontStyle: 'normal',
                        titleFontColor: 'black',
                        titleSpacing: 1,
                        bodyFontStyle: 'bold',
                        bodyFontSize: 18,
                        bodySpacing: 3,
                        callbacks: {
                            title: function (tooltipItem) {
                                var date = new Date(tooltipItem[0].xLabel);
                                year = date.getFullYear();
                                month = monthNames[date.getMonth()];
                                day = date.getDate();
                                var multistringText = [month + " " + day + ", " + year];
                                multistringText.push(Number(Math.floor(tooltipItem[0].yLabel)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " people tweeted a " + emoji);
                                sentiment = (tooltipItem[0].yLabel % 1) * 1000 - 100;
                                if (sentiment == -100) {
                                    return multistringText;
                                } else if (sentiment > 100) {
                                    multistringText.push(parseInt(100 - (sentiment / 10)) + "% negative tweets😡");
                                } else {
                                    multistringText.push(parseInt(sentiment) + "% positive tweets😀");
                                }
                                return multistringText;
                            },
                            label: function (tooltipItem) {
                                if (emoji_name in annotations) {
                                    for (date in annotations[emoji_name]) {
                                        if (annotations[emoji_name][date][0] == tooltipItem.xLabel) {
                                            return annotations[emoji_name][date][1];
                                        }
                                    }
                                } else {
                                    return ""
                                }

                            },
                        }
                    }
                },
                data: {
                    labels: day,
                    datasets: [{
                        borderWidth: 2,
                        backgroundColor: color1,
                        data: usage,
                        pointRadius: pointRadius,
                        pointHoverRadius: 8,
                        hoverBackgroundColor: 'black',
                        pointHoverBorderColor: 'black',
                        pointHitRadius: 30,
                        pointHoverBorderWidth: 3,
                        pointBackgroundColor: 'black',
                        pointBorderColor: 'black',
                        borderColor: 'black',
                        rough: {
                            roughness: 1.5,
                            bowing: 0,
                            fillStyle: 'hachure',
                            fillWeight: 4,
                            hachureAngle: -41,
                            hachureGap: 6,
                            // curveStepCount: 70,
                            simplification: 0
                        }
                    }]
                }
            });

            for (var i = 0; i < lineChart.data.labels.length; i++) {
                pointRadius[i] = 0;
                if (lineChart.canvas.id in annotations) {
                    for (var j = 0; j < annotations[lineChart.canvas.id].length; j++) {
                        if (annotations[lineChart.canvas.id][j][0] == lineChart.data.labels[i]) {
                            pointRadius[i] = 6;
                        }
                    }
                }
            }
            lineChart.update();
        }

        Promise.all([
            d3.csv("data/emojis_50/soccer_ball.csv"),
            d3.csv("data/emojis_50/bee.csv"),
            d3.csv("data/emojis_50/beer.csv"),
            d3.csv("data/emojis_50/uk.csv"),
            d3.csv("data/emojis_50/american_football.csv"),
            d3.csv("data/emojis_50/spain.csv"),
            d3.csv("data/emojis_50/reminder_ribbon.csv"),
            d3.csv("data/emojis_50/shooting_star.csv"),
            d3.csv("data/emojis_50/factory.csv"),
            d3.csv("data/emojis_50/pig.csv"),
            d3.csv("data/emojis_50/panda.csv"),
            d3.csv("data/emojis_50/snake.csv"),
            d3.csv("data/emojis_50/santa_claus.csv"),
            d3.csv("data/emojis_50/fuel_pump.csv"),
            d3.csv("data/emojis_50/video_game.csv"),
            d3.csv("data/emojis_50/chart_increasing.csv"),
            d3.csv("data/emojis_50/chart_decreasing.csv"),
            d3.csv("data/emojis_50/japan.csv"),
            d3.csv("data/emojis_50/south_korea.csv"),
            d3.csv("data/emojis_50/germany.csv"),
            d3.csv("data/emojis_50/china.csv"),
            d3.csv("data/emojis_50/france.csv"),
            d3.csv("data/emojis_50/italy.csv"),
            d3.csv("data/emojis_50/money_with_wings.csv"),
            d3.csv("data/emojis_50/rose.csv"),
            d3.csv("data/emojis_50/broken_heart.csv"),
            d3.csv("data/emojis_50/angry_face.csv"),
        ]).then(function (files) {
            makeChart(files[0], 'soccer_ball', '⚽', 'white');
            makeChart(files[1], 'bee', '🐝', '#fff100');
            makeChart(files[2], 'beer', '🍺', '#fff100');
            makeChart(files[3], 'uk', '🇬🇧', '#00bcf2');
            makeChart(files[4], 'american_football', '🏈', '#e81123');
            makeChart(files[5], 'spain', '🇪🇸', '#e81123');
            makeChart(files[6], 'reminder_ribbon', '🎗️', '#fff100');
            makeChart(files[7], 'shooting_star', '🌠', '#fff100');
            makeChart(files[8], 'factory', '🏭', 'black');
            makeChart(files[9], 'pig', '🐖', '#ec008c');
            makeChart(files[10], 'panda', '🐼', 'white');
            makeChart(files[11], 'snake', '🐍', '#009e49');
            makeChart(files[12], 'santa_claus', '🎅', '#e81123');
            makeChart(files[13], 'fuel_pump', '⛽', '#ff8c00');
            makeChart(files[14], 'video_game', '🎮', 'black');
            makeChart(files[15], 'chart_increasing', '📈', '#009e49');
            makeChart(files[16], 'chart_decreasing', '📉', '#e81123');
            makeChart(files[17], 'japan', '🇯🇵', 'white');
            makeChart(files[18], 'south_korea', '🇰🇷', '#00bcf2');
            makeChart(files[19], 'germany', '🇩🇪', 'black');
            makeChart(files[20], 'china', '🇨🇳', '#e81123');
            makeChart(files[21], 'france', '🇫🇷', '#00188f');
            makeChart(files[22], 'italy', '🇮🇹', '#009e49');
            makeChart(files[23], 'money_with_wings', '💸', '#009e49');
            makeChart(files[24], 'rose', '🌹', '#00b294');
            makeChart(files[25], 'broken_heart', '💔', '#ec008c');
            makeChart(files[26], 'angry_face', '😠', '#68217a');
        })

    }, 2500);

}

// Loader

var xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function (s) {
        return document.querySelector(s);
    },
    selectAll = function (s) {
        return document.querySelectorAll(s);
    },
    emojiArr = [' 😍 ', ' 🐼 ', ' 😳 ', ' 🍎 ', ' 🤣 ', ' 🐷 ', ' ⚽ '],
    hitColorArr = ['#111', '#F7894A', '#00BCF2', '#F03A17', '#00BCF2', '#000', '#8CBD18', '#333'],
    shadow = select('#shadow'),
    emojiContainer = select('#emojiContainer'),
    hitLines = select('#hitLines'),
    emoji = select('#emoji'),
    count = 0,
    scale = 4


TweenMax.set('svg', {
    visibility: 'visible'
})
TweenMax.set(emojiContainer, {
    transformOrigin: '50% 100%',
    scale: scale
})
TweenMax.set([shadow], {
    transformOrigin: '50% 50%'
})
TweenMax.set([shadow, emoji], {
    transformOrigin: '50% 50%'
})

var hitTl = new TimelineMax();

hitTl.fromTo('#hitLines line', 0.2, {
    drawSVG: '0% 0%'
}, {
    drawSVG: '0% 50%',
    ease: Linear.easeNone
})
    .to('#hitLines line', 0.2, {
        drawSVG: '60% 80%',
        ease: Linear.easeNone
    })
    .to('#hitLines line', 0.4, {
        drawSVG: '100% 100%',
        ease: Sine.easeOut
    })

var tl = new TimelineMax({ paused: false, repeat: -1 }).timeScale(3);
tl.from(emojiContainer, 0.7, {
    y: -100,
    ease: Power1.easeIn
})
    .from(emojiContainer, 0.7, {
        scaleX: scale / 1.2,
        ease: Power3.easeIn
    }, 0)
    .from(shadow, 0.7, {
        scaleX: 0.3,
        alpha: 0.2,
        ease: Power3.easeIn
    }, '-=0.7')
    .to(emojiContainer, 0.3, {
        scaleY: scale / 2,

        scaleX: scale + (scale / 4)
    })
    .addLabel('hit', '-=0.3')
    .to(emojiContainer, 0.13, {
        scaleY: scale,
        scaleX: scale / 1.2,
        ease: Expo.easeOut
    }, '+=0.1')
    .addCallback(onRepeat, '-=0.08')
    .to(emojiContainer, 0.7, {
        y: -100,
        ease: Power1.easeOut
    }, '-=0.1')
    .to(shadow, 0.7, {
        scaleX: 0.3,
        alpha: 0.2,
        ease: Power3.easeOut
    }, '-=0.7')




TweenMax.to(emoji, tl.duration() / 1.5, {
    rotation: '-=360',
    //yoyo:true,
    repeat: -1,
    ease: Linear.easeNone
})

function onRepeat() {
    count = (count++ === emojiArr.length - 1) ? 0 : count;
    emoji.textContent = emojiArr[count];

}
