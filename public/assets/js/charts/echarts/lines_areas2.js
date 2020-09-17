/* ------------------------------------------------------------------------------
 *
 *  # Echarts - lines and areas
 *
 *  Lines and areas chart configurations
 *
 *  Version: 1.0
 *  Latest update: August 1, 2015
 *
 * ---------------------------------------------------------------------------- */

$(function() {
	//'use strict';
    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: '/dev/pink-trainers/limitless_html/assets/js/plugins/visualization/echarts'
        }
    });

    // Configuration
    // ------------------------------

    require(
        [
            'echarts',
            'echarts/theme/limitless',
            'echarts/chart/bar',
            'echarts/chart/line',
        ],


   /* function zoom_chart( ec, limitless, chartdata ){

            chartdata = JSON.parse(chartdata);

            console.log(chartdata);
            

            if(document.getElementById('line_zoom')){

                var line_zoom_element = ec.init(document.getElementById('line_zoom'), limitless);
            }else{
                var line_zoom_element = '';
            }

            // Zoom option
            if (line_zoom_element) {

                // Initialize chart ec
                //var line_zoom = ec.init(line_zoom_element);
                var line_zoom = line_zoom_element;


                // Options
                line_zoom.setOption({

                    // Define colors
                    color: ["#424956", "#d74e67", '#0092ff'],

                    // Global text styles
                    textStyle: {
                        fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                        fontSize: 13
                    },

                    // Chart animation duration
                    animationDuration: 750,

                    // Setup grid
                    grid: {
                        left: 0,
                        right: 40,
                        top: 35,
                        bottom: 60,
                        containLabel: true
                    },

                    // Add legend
                    legend: {
                        data: ['Software','Hardware','Accessories'],
                        itemHeight: 8,
                        itemGap: 20
                    },

                    // Add tooltip
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(0,0,0,0.75)',
                        padding: [10, 15],
                        textStyle: {
                            fontSize: 13,
                            fontFamily: 'Roboto, sans-serif'
                        }
                    },

                    // Horizontal axis
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            color: '#333'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        data: ['2017/1/17','2017/1/18','2017/1/19','2017/1/20','2017/1/23','2017/1/24','2017/1/25','2017/1/26','2017/2/3','2017/2/6','2017/2/7','2017/2/8','2017/2/9','2017/2/10','2017/2/13','2017/2/14','2017/2/15','2017/2/16','2017/2/17','2017/2/20','2017/2/21','2017/2/22','2017/2/23','2017/2/24','2017/2/27','2017/2/28','2017/3/1','2017/3/2','2017/3/3','2017/3/6','2017/3/7']
                    }],

                    // Vertical axis
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} ',
                            color: '#333'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#eee']
                            }
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                            }
                        }
                    }],

                   
                     // Enable data zoom
                    dataZoom: {
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 50,
                        height: 40
                    },

                    // Add series
                    series: [
                        {
                            name: 'Software',
                            type: 'line',
                            smooth: true,
                            symbolSize: 6,
                            itemStyle: {
                                normal: {
                                    borderWidth: 2
                                }
                            },
                            data: [152,156,479,442,654,835,465,704,643,136,791,254,688,119,948,316,612,378,707,404,485,226,754,142,965,364,887,395,838,113,662]
                        },
                        {
                            name: 'Hardware',
                            type: 'line',
                            smooth: true,
                            symbolSize: 6,
                            itemStyle: {
                                normal: {
                                    borderWidth: 2
                                }
                            },
                            data: [677,907,663,137,952,408,976,772,514,102,165,343,374,744,237,662,875,462,409,259,396,744,359,618,127,596,161,574,107,914,708]
                        },
                        {
                            name: 'Accessories',
                            type: 'line',
                            smooth: true,
                            symbolSize: 6,
                            itemStyle: {
                                normal: {
                                    borderWidth: 2
                                }
                            },
                            data: [606,919,108,691,424,196,328,136,754,427,544,983,547,834,452,576,343,168,462,756,344,226,511,304,648,339,655,336,605,157,864]
                        }
                    ]
                });
            }
        } // zoom_chart*/


    // Charts setup
    /*function (ec, limitless) {

        // Initialize charts
        if(document.getElementById('stacked_lines')){
            var stacked_lines = ec.init(document.getElementById('stacked_lines'), limitless);
        }else{
            var stacked_lines = '';
        }

        //
        // Stacked lines options
        //

        if(stacked_lines){

            stacked_lines_options = {

                // Setup grid
                grid: {
                    x: 40,
                    x2: 20,
                    y: 35,
                    y2: 25
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['Internet Explorer', 'Opera', 'Safari', 'Firefox', 'Chrome']
                },

                // Enable drag recalculate
                calculable: true,

                // Hirozontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: [
                        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                    ]
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value'
                }],

                // Add series
                series: [
                    {
                        name: 'Internet Explorer',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'Opera',
                        type: 'line',
                        stack: 'Total',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Safari',
                        type: 'line',
                        stack: 'Total',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'Firefox',
                        type: 'line',
                        stack: 'Total',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: 'Chrome',
                        type: 'line',
                        stack: 'Total',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };

            stacked_lines.setOption(stacked_lines_options);

        }
            // Resize charts
            // ------------------------------

            window.onresize = function () {
                setTimeout(function () {
               
                    stacked_lines.resize();
                
                    line_zoom_element && line_zoom.resize();

                }, 200);
            }
        }*/
    );
});
