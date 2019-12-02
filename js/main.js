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
        annotations["santa"] = [
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
        annotations["american_football"] = [
            ["2013-02-04", "Super Bowl XLVII 🇺🇸"],
            ["2014-02-02", "Super Bowl XLVIII 🇺🇸"],
            ["2015-02-02", "Super Bowl XLIX 🇺🇸"],
            ["2016-02-07", "Super Bowl 50 🇺🇸"],
            ["2017-02-06", "Super Bowl LI 🇺🇸"],
            ["2018-02-05", "Super Bowl LII 🇺🇸"],
            ["2019-02-03", "Super Bowl LIII 🇺🇸"],
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

                yAxes: [{
                    
                    ticks: {
                        maxTicksLimit: 5,
                        min: ' ',
                        fontColor: 'black',
                        fontSize: 20,
                        callback: function(value, index, values) {
                            if(value>=1000){
                                return  value/1000 + 'k';
                            }
                            else{
                                return value;
                            }
                            
                        }
                    },
                    gridLines: {
                        lineWidth: 4,
                        color: 'black'
                    },
                }],
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
            d3.csv("data/emojis_50/airplane.csv"),
            d3.csv("data/emojis_50/alien_monster.csv"),
            d3.csv("data/emojis_50/american_football.csv"),
            d3.csv("data/emojis_50/angry.csv"),
            d3.csv("data/emojis_50/apple.csv"),
            d3.csv("data/emojis_50/baby.csv"),
            d3.csv("data/emojis_50/balloon.csv"),
            d3.csv("data/emojis_50/ballot_box_with_ballot.csv"),
            d3.csv("data/emojis_50/banana.csv"),
            d3.csv("data/emojis_50/baseball.csv"),
            d3.csv("data/emojis_50/basketball.csv"),
            d3.csv("data/emojis_50/bear.csv"),
            d3.csv("data/emojis_50/bee.csv"),
            d3.csv("data/emojis_50/beer.csv"),
            d3.csv("data/emojis_50/bicycle.csv"),
            d3.csv("data/emojis_50/bikini.csv"),
            d3.csv("data/emojis_50/bird.csv"),
            d3.csv("data/emojis_50/bomb.csv"),
            d3.csv("data/emojis_50/books.csv"),
            d3.csv("data/emojis_50/brazil.csv"),
            d3.csv("data/emojis_50/broken.csv"),
            d3.csv("data/emojis_50/cactus.csv"),
            d3.csv("data/emojis_50/calendar.csv"),
            d3.csv("data/emojis_50/candy.csv"),
            d3.csv("data/emojis_50/reminder_ribbon.csv"),
            d3.csv("data/emojis_50/cat.csv"),
            d3.csv("data/emojis_50/chart_decr.csv"),
            d3.csv("data/emojis_50/chart_incr.csv"),
            d3.csv("data/emojis_50/chequered_flag.csv"),
            d3.csv("data/emojis_50/chicken.csv"),
            d3.csv("data/emojis_50/china.csv"),
            d3.csv("data/emojis_50/church.csv"),
            d3.csv("data/emojis_50/cigarette.csv"),
            d3.csv("data/emojis_50/clapper_board.csv"),
            d3.csv("data/emojis_50/cookie.csv"),
            d3.csv("data/emojis_50/cow.csv"),
            d3.csv("data/emojis_50/crocodile.csv"),
            d3.csv("data/emojis_50/dog.csv"),
            d3.csv("data/emojis_50/dragon.csv"),
            d3.csv("data/emojis_50/elephant.csv"),
            d3.csv("data/emojis_50/envelope.csv"),
            d3.csv("data/emojis_50/eritrea.csv"),
            d3.csv("data/emojis_50/factory.csv"),
            d3.csv("data/emojis_50/fallen_leaf.csv"),
            d3.csv("data/emojis_50/fish.csv"),
            d3.csv("data/emojis_50/football.csv"),
            d3.csv("data/emojis_50/four_leaf_clover.csv"),
            d3.csv("data/emojis_50/france.csv"),
            d3.csv("data/emojis_50/fuel.csv"),
            d3.csv("data/emojis_50/game.csv"),
            d3.csv("data/emojis_50/germany.csv"),
            d3.csv("data/emojis_50/ghost.csv"),
            d3.csv("data/emojis_50/graduation_cap.csv"),
            d3.csv("data/emojis_50/guitar.csv"),
            d3.csv("data/emojis_50/hong_kong.csv"),
            d3.csv("data/emojis_50/horse.csv"),
            d3.csv("data/emojis_50/hourglass_done.csv"),
            d3.csv("data/emojis_50/india.csv"),
            d3.csv("data/emojis_50/ireland.csv"),
            d3.csv("data/emojis_50/itlay.csv"),
            d3.csv("data/emojis_50/japan.csv"),
            d3.csv("data/emojis_50/kitchen_knife.csv"),
            d3.csv("data/emojis_50/koala.csv"),
            d3.csv("data/emojis_50/korea.csv"),
            d3.csv("data/emojis_50/lemon.csv"),
            d3.csv("data/emojis_50/light_bulb.csv"),
            d3.csv("data/emojis_50/lion.csv"),
            d3.csv("data/emojis_50/mens_room.csv"),
            d3.csv("data/emojis_50/money.csv"),
            d3.csv("data/emojis_50/mouse.csv"),
            d3.csv("data/emojis_50/movie_camera.csv"),
            d3.csv("data/emojis_50/musical_note.csv"),
            d3.csv("data/emojis_50/palestinian_territories.csv"),
            d3.csv("data/emojis_50/panda.csv"),
            d3.csv("data/emojis_50/pear.csv"),
            d3.csv("data/emojis_50/penguin.csv"),
            d3.csv("data/emojis_50/pig.csv"),
            d3.csv("data/emojis_50/pile_of_poo.csv"),
            d3.csv("data/emojis_50/pistol.csv"),
            d3.csv("data/emojis_50/pizza.csv"),
            d3.csv("data/emojis_50/rabbit.csv"),
            d3.csv("data/emojis_50/rainbow.csv"),
            d3.csv("data/emojis_50/recycle.csv"),
            d3.csv("data/emojis_50/ring.csv"),
            d3.csv("data/emojis_50/rocket.csv"),
            d3.csv("data/emojis_50/rose.csv"),
            d3.csv("data/emojis_50/santa.csv"),
            d3.csv("data/emojis_50/scissors.csv"),
            d3.csv("data/emojis_50/shooting_star.csv"),
            d3.csv("data/emojis_50/skis.csv"),
            d3.csv("data/emojis_50/snail.csv"),
            d3.csv("data/emojis_50/snake.csv"),
            d3.csv("data/emojis_50/snowboarder.csv"),
            d3.csv("data/emojis_50/snowflake.csv"),
            d3.csv("data/emojis_50/soft_ice_cream.csv"),
            d3.csv("data/emojis_50/spain.csv"),
            d3.csv("data/emojis_50/syria.csv"),
            d3.csv("data/emojis_50/syringe.csv"),
            d3.csv("data/emojis_50/toilet.csv"),
            d3.csv("data/emojis_50/tomato.csv"),
            d3.csv("data/emojis_50/top_hat.csv"),
            d3.csv("data/emojis_50/tree.csv"),
            d3.csv("data/emojis_50/trophy.csv"),
            d3.csv("data/emojis_50/turtle.csv"),
            d3.csv("data/emojis_50/uk.csv"),
            d3.csv("data/emojis_50/unicorn.csv"),
            d3.csv("data/emojis_50/us.csv"),
            d3.csv("data/emojis_50/violin.csv"),
            d3.csv("data/emojis_50/watermelon.csv"),
            d3.csv("data/emojis_50/wheelchair_symbol.csv"),
            d3.csv("data/emojis_50/womens_room.csv"),
            d3.csv("data/emojis_50/wrapped_gift.csv")
        ]).then(function (files) {

            makeChart(files[0], 'airplane', '✈️', '#777777');
            makeChart(files[1], 'alien_monster', '👾', '#ed50e2');
            makeChart(files[2], 'american_football', '🏈', '#733E30');
            // makeChart(files[3], 'angry', 'XX', 'white');
            makeChart(files[4], 'apple', '🍎', '#DB1B1E');
            makeChart(files[5], 'baby', '👶', '#38dbf4');
            makeChart(files[6], 'balloon', '🎈', '#E72D32');
            makeChart(files[7], 'ballot_box_with_ballot', '🗳️', '#FFEF56');
            makeChart(files[8], 'banana', '🍌', '#F9CD26');
            makeChart(files[9], 'baseball', '⚾', '#EEEFEB');
            makeChart(files[10], 'basketball', '🏀', '#F89218');
            makeChart(files[11], 'bear', '🐻', '#AC7852');
            makeChart(files[12], 'bee', '🐝', '#FFF200');
            makeChart(files[13], 'beer', '🍺', '#C06513');
            makeChart(files[14], 'bicycle', '🚲', '#1266C1');
            makeChart(files[15], 'bikini', '👙', '#F764CA');
            makeChart(files[16], 'bird', '🐦', '#85D4F6');
            makeChart(files[17], 'bomb', '💣', '#393534');
            makeChart(files[18], 'books', '📚', '#5AAF5E');
            // makeChart(files[19], 'brazil', 'XX', 'white');
            makeChart(files[20], 'broken', '💔', '#AB1C1C');
            makeChart(files[21], 'cactus', '🌵', '#8CBF56');
            makeChart(files[22], 'calendar', '📅', '#1889E6');
            makeChart(files[23], 'candy', '🍬', '#F25EFF');
            makeChart(files[24], 'reminder_ribbon', '🎗️', '#FFEF56');
            makeChart(files[25], 'cat', '🐈', '#FED22F');
            makeChart(files[26], 'chart_decr', '📉', '#28AA4E');
            makeChart(files[27], 'chart_incr', '📈', '#C30100');
            makeChart(files[28], 'chequered_flag', '🏁', '#3B3B3B');
            makeChart(files[29], 'chicken', '🐔', '#E6E6E6');
            // makeChart(files[30], 'china', 'XX', 'white');
            // makeChart(files[31], 'church', 'XX', 'white');
            makeChart(files[32], 'cigarette', '🚬', '#211606');
            makeChart(files[33], 'clapper_board', '🎬', '#3C393A');
            makeChart(files[34], 'cookie', '🍪', '#FBA826');
            makeChart(files[35], 'cow', '🐄', '#F8ADB5');
            makeChart(files[36], 'crocodile', '🐊', '#299142');
            makeChart(files[37], 'dog', '🐕', '#FDC150');
            makeChart(files[38], 'dragon', '🐉', '#DD2811');
            makeChart(files[39], 'elephant', '🐘', '#FFFFFF');
            makeChart(files[40], 'envelope', '✉️', '#F6F6F6');
            // makeChart(files[41], 'eritrea', 'XX', 'white');
            makeChart(files[42], 'factory', '🏭', '#000000');
            makeChart(files[43], 'fallen_leaf', '🍂', '#F7952B');
            makeChart(files[44], 'fish', '🐟', '#8CCBEE');
            makeChart(files[45], 'football', '⚽', '#E9E9E9');
            makeChart(files[46], 'four_leaf_clover', '🍀', '#7AB046');
            // makeChart(files[47], 'france', 'XX', 'white');
            makeChart(files[48], 'fuel', '⛽', '#C82424');
            makeChart(files[49], 'game', '🎮', '#9F9F9F');
            // makeChart(files[50], 'germany', 'XX', 'white');
            makeChart(files[51], 'ghost', '👻', '#FFFFFF');
            makeChart(files[52], 'graduation_cap', '🎓', '#D98C16');
            makeChart(files[53], 'guitar', '🎸', '#FE0300');
            // makeChart(files[54], 'hong_kong', 'XX', 'white');
            makeChart(files[55], 'horse', '🐎', '#FFE9B5');
            makeChart(files[56], 'hourglass_done', '⌛', '#DCEFFD');
            // makeChart(files[57], 'india', 'XX', 'white');
            // makeChart(files[58], 'ireland', 'XX', 'white');
            // makeChart(files[59], 'itlay', 'XX', 'white');
            // makeChart(files[60], 'japan', 'XX', 'white');
            makeChart(files[61], 'kitchen_knife', '🔪', '#844C13');
            makeChart(files[62], 'koala', '🐨', '#D0D0D0');
            // makeChart(files[63], 'korea', 'XX', 'white');
            makeChart(files[64], 'lemon', '🍋', '#FEEB68');
            makeChart(files[65], 'light_bulb', '💡', '#FCF2D3');
            makeChart(files[66], 'lion', '🦁', '#FEAE03');
            makeChart(files[67], 'mens_room', '🚹', '#0063E6');
            // makeChart(files[68], 'money', 'XX', 'white');
            makeChart(files[69], 'mouse', '🐁', '#F9FDFF');
            makeChart(files[70], 'movie_camera', '🎥', '#404448');
            makeChart(files[71], 'musical_note', '🎵', '#31BDFC');
            // makeChart(files[72], 'palestinian_territories', 'XX', 'white');
            makeChart(files[73], 'panda', '🐼', '#F3F3F3');
            makeChart(files[74], 'pear', '🍐', '#C7D536');
            makeChart(files[75], 'penguin', '🐧', '#F76305');
            makeChart(files[76], 'pig', '🐖', '#FFB7B6');
            // makeChart(files[77], 'pile_of_poo', 'XX', 'white');
            makeChart(files[78], 'pistol', '🔫', '#302B3D');
            makeChart(files[79], 'pizza', '🍕', '#CB2909');
            makeChart(files[80], 'rabbit', '🐇', '#F77B9E');
            makeChart(files[81], 'rainbow', '🌈', '#A55AFD');
            // makeChart(files[82], 'recycle', 'XX', 'white');
            makeChart(files[83], 'ring', '💍', '#45C1F7');
            makeChart(files[84], 'rocket', '🚀', '#E63632');
            makeChart(files[85], 'rose', '🌹', '#C90007');
            makeChart(files[86], 'santa', '🎅', 'red');
            makeChart(files[87], 'scissors', '✂️', '#F14646');
            makeChart(files[88], 'shooting_star', '🌠', '#FDD42F');
            makeChart(files[89], 'skis', '🎿', '#34B7F1');
            makeChart(files[90], 'snail', '🐌', '#E6AC6B');
            makeChart(files[91], 'snake', '🐍', '#4CC63A');
            makeChart(files[92], 'snowboarder', '🏂', '#F0514F');
            makeChart(files[93], 'snowflake', '❄️', '#B6FAFF');
            makeChart(files[94], 'soft_ice_cream', '🍦', '#FEF9E4');
            // makeChart(files[95], 'spain', 'XX', 'white');
            // makeChart(files[96], 'syria', 'XX', 'white');
            makeChart(files[97], 'syringe', '💉', '#ED4A47');
            makeChart(files[98], 'toilet', '🚽', '#F3F4F5');
            makeChart(files[99], 'tomato', '🍅', '#FFFFFF');
            makeChart(files[100], 'top_hat', '🎩', '#3E3E3E');
            makeChart(files[101], 'tree', '🌳', '#78AD43');
            makeChart(files[102], 'trophy', '🏆', '#FFF48B');
            makeChart(files[103], 'turtle', '🐢', '#70B22F');
            // makeChart(files[104], 'uk', 'XX', 'white');
            makeChart(files[105], 'unicorn', '🦄', '#000000');
            // makeChart(files[106], 'us', 'XX', 'white');
            makeChart(files[107], 'violin', '🎻', '#F45018');
            makeChart(files[108], 'watermelon', '🍉', '#FC2349');
            makeChart(files[109], 'wheelchair_symbol', '♿', '#0073E8');
            makeChart(files[110], 'womens_room', '🚺', '#AC40C7');
            makeChart(files[111], 'wrapped_gift', '🎁', '#1C97F3');
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
