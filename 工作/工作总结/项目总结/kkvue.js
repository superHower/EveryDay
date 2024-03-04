import { brushTicket } from '@/api/voteTrend';
const DEFAULT_TITLE = '投票走势图';
const DEFAULT_TYPE = 'line';
// symbol 提示svg的path
const PATH =
    'path://M187.876439,321.540015 L198.847591,341.518657 C199.11343,342.002753 198.936497,342.610694 198.452402,342.876533 C198.304898,342.957533 198.139339,343 197.971059,343 L176.028754,343 C175.47647,343 175.028754,342.552285 175.028754,342 C175.028754,341.83172 175.071221,341.666161 175.152222,341.518657 L186.123374,321.540015 C186.389212,321.05592 186.997154,320.878987 187.481249,321.144826 C187.647861,321.236319 187.784945,321.373404 187.876439,321.540015 Z M187.000022,336.755736 C186.613233,336.756836 186.242671,336.909191 185.969599,337.179393 C185.696148,337.449537 185.541505,337.815006 185.539119,338.196746 C185.539977,338.578602 185.694455,338.94451 185.968625,339.214099 C186.242478,339.483738 186.613087,339.63597 187.000022,339.637756 C187.387021,339.636282 187.757746,339.484003 188.031419,339.214099 C188.304691,338.943916 188.459008,338.578391 188.460924,338.196746 C188.459809,337.815224 188.305351,337.449708 188.031419,337.180354 C187.757844,336.910186 187.387138,336.75757 187.000022,336.755736 L187.000022,336.755736 Z M187.000022,327.149001 C186.193188,327.149001 185.539119,327.794163 185.539119,328.590011 L185.539119,333.393379 C185.539119,334.189227 186.193188,334.834389 187.000022,334.834389 C187.806856,334.834389 188.460924,334.189227 188.460924,333.393379 L188.460924,328.590011 C188.460924,327.794163 187.806856,327.149001 187.000022,327.149001 Z';
const COLOR_ARRAY = [
    '#F9DE26',
    '#F75D82',
    '#48CF84',
    '#26AFED',
    '#DE56D4',
    '#7957B0',
    '#F98F26',
    '#ED5859',
    '#51D3C6',
    '#3274B9',
    '#AD60D9',
    '#887EF2',
    '#FFB626',
    '#FF8484',
    '#B7E13E',
    '#71D6FB',
    '#C56889',
    '#6E4EFF',
    '#F0E93E',
    '#DF3939',
    '#80CF48',
    '#265AAA',
    '#8A409B',
    '#7C26FA',
    '#E1B753',
    '#DA6055',
    '#5CE44B',
    '#3578FF',
    '#DD2677',
    '#9336EE',
];
// 获取疑似刷票配置，
let brushConfig = [];
/**
 * 判断索引位置，single单个，double连续
 * @date 2021-11-23
 * @param {Number} index： 当前索引
 * @param {Number} len: 数组总长度，与索引相比较
 * @returns {Object}：当前索引的前后索引
 */
const judgeSingleIndex = function (index, len) {
    if (index === 0) {
        return {
            preIndex: index + 1,
            nextIndex: index + 1,
        };
    } else if (index === len - 1) {
        return {
            preIndex: index - 1,
            nextIndex: index - 1,
        };
    } else {
        return {
            preIndex: index - 1,
            nextIndex: index + 1,
        };
    }
};
const judgeDoubleIndex = function (index, len) {
    if (index === 0 || index === 1) {
        return {
            p2Index: index + 2, // n-2
            pIndex: index + 1, // n-1
            nIndex: index + 1, // n+1
            n2Index: index + 2, // n+2
            n3Index: index + 3, // n+3
        };
    } else if (index === len - 1 || index === len - 2) {
        return {
            p2Index: index - 2,
            pIndex: index - 1,
            nIndex: index - 1,
            n2Index: index - 2,
            n3Index: index - 3,
        };
    } else if (index === len - 3) {
        return {
            p2Index: index - 2,
            pIndex: index - 1,
            nIndex: index + 1,
            n2Index: index + 2,
            n3Index: index - 3,
        };
    } else {
        return {
            p2Index: index - 2,
            pIndex: index - 1,
            nIndex: index + 1,
            n2Index: index + 2,
            n3Index: index + 3,
        };
    }
};
/**
 * 判断是否疑似刷票，是就放入symbolMap中，方便存取
 * @date 2021-11-23
 * @param {Object} dataArr: echarts数据数组（票数等）
 * @param {Number} index：时间节点在数组中的索引
 * @param {Number} opIndex：判断是哪个选项
 * @returns {String}: 疑似刷票echarts显示symbol类型，‘none’不显示，‘circle’：疑似刷票，显示圆点
 */
const isBrushTicket = function ({ symbolMap, dataArr, index, opIndex }) {
    //  获取倍数和疑似刷票的最大值
    const { averageMultiple, maximumLimit } = brushConfig;
    const time = dataArr[index].time;
    const value = dataArr[index].value;
    // 被判断为疑似刷票的最小值
    const baseNum = maximumLimit / 4;
    // 没票数，不判断疑似刷票
    if (dataArr.length === 0 || value === 0) {
        return;
    }
    // 判断单个点索引位置
    const { preIndex, nextIndex } = judgeSingleIndex(index, dataArr.length);
    //  连续疑似刷票
    const { p2Index, pIndex, nIndex, n2Index, n3Index } = judgeDoubleIndex(index, dataArr.length);
    let fenzi, fenmu;
    // 判断连续
    if (dataArr[nIndex].value + value >= 2 * maximumLimit && value > baseNum && dataArr[nIndex].value > baseNum) {
        fenzi = value + dataArr[nIndex].value;
        fenmu = dataArr[pIndex].value + dataArr[p2Index].value + dataArr[n2Index].value + dataArr[n3Index].value;
        if (fenmu === 0) {
            fenmu = 1;
        }
        if (fenzi / fenmu >= averageMultiple) {
            symbolMap.set(time + '-' + opIndex, PATH);
            symbolMap.set(dataArr[nIndex].time + '-' + opIndex, PATH);
            return;
        }
    }
    // 判断单刷票
    fenzi = value;
    fenmu = dataArr[preIndex].value + dataArr[nextIndex].value;
    if (fenmu === 0) {
        fenmu = 1;
    }
    if (value >= maximumLimit && fenzi / fenmu >= averageMultiple) {
        symbolMap.set(time + '-' + opIndex, PATH);
        return;
    }
    if (symbolMap.has(time + '-' + opIndex)) {
    }
};
/**
 * 获取数据节点的symbol类型
 * @date 2021-11-25
 * @param {String} time： 数据节点的时间
 * @param {Number}  index：数据选项index
 * @returns {String} 数据节点symbol类型
 */
const getBrushTicket = function (symbolMap, time, index) {
    if (symbolMap.has(time + '-' + index)) {
        return symbolMap.get(time + '-' + index);
    }
    return 'none';
};

export default {
    props: {
        config: {
            type: Object,
            default: () => {
                return {
                    title: '投票走势图',
                    type: 'line',
                    color: [],
                    data: [],
                };
            },
        },
        showType: {
            default: 0,
        },
    },
    data() {
        return {
            chart: null,
            $el: null,
            COLOR_ARRAY,
        };
    },
    computed: {
        chartColor: function () {
            return this.config.color ? [...this.config.color, ...COLOR_ARRAY] : COLOR_ARRAY;
        },
    },
    watch: {
        config: {
            handler: function () {
                if (this.chart) {
                    this.setChartOption();
                } else {
                    this.checkEcharts();
                }
            },
            deep: true,
        },
    },
    created() {
        // brushTicket().then((res) => {
        //     this.checkEcharts();
        //     brushConfig = res.data.obj;
        // });
        this.checkEcharts();
    },
    methods: {
        checkEcharts() {
            if (window.echarts) {
                this.initChart();
            } else {
                delayLoad
                    .delayLoadJS(Vue.cdn.echarts)
                    .then(() => {
                        this.initChart();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        initChart() {
            this.$nextTick(() => {// 等待dom渲染完成 
                if (!this.$el) {
                    // 缓存dom
                    this.$el = this.$refs.chartDom;
                }
                if (!this.chart) {
                    this.chart = window.echarts.init(this.$el);
                }
                this.setChartOption();
            });
        },
        setChartOption() {
            let legend = [];
            let _this = this;
            let xAxis = this.config.data[0].dataList.map((item) => item.time);
            // 清除之前日期的symbol缓存
            this.symbolMap = new Map();
            let series = this.config.data.map((option, index) => {
                let _name = option.optionName;
                _name = _name.replace(/\r\n/g, ' ');
                _name = _name.replace(/\n/g, ' ');
                legend.push(_name);
                // 按小时 显示
                if (this.showType === 0) {
                    // 遍历设置map，在map中找到对应的symbol状态
                    option.dataList.map((item, i) =>
                        isBrushTicket({
                            symbolMap: this.symbolMap,
                            dataArr: option.dataList,
                            index: i,
                            opIndex: index,
                        })
                    );
                }
                return {
                    name: _name,
                    type: this.config.type ? this.config.type : DEFAULT_TYPE,
                    data: option.dataList.map((item, i) => ({
                        value: item.value,
                        symbol: getBrushTicket(this.symbolMap, item.time, index),
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                // borderColor: "red",
                                color: 'red',
                                targetColor: this.chartColor[index % this.chartColor.length],
                            },
                            emphasis: {
                                color: 'red',
                            },
                        },
                    })),
                    symbol: 'none',
                    smooth: true,
                    lineStyle: {
                        width: 1,
                        opacity: 0.8,
                    },
                    areaStyle: {
                        opacity: 0.1,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: this.chartColor[index % this.chartColor.length],
                            },
                            {
                                offset: 1,
                                color: '#fff',
                            },
                        ]),
                    },
                };
            });
            let option = {
                title: [
                    {
                        text: this.config.title ? this.config.title : DEFAULT_TITLE,
                        top: 13,
                        left: 24,
                        textStyle: {
                            color: '#000',
                            fontSize: 16,
                            fontFamily: 'PingFangSC-Medium, PingFang SC',
                            fontWeight: 500,
                        },
                        show: true,
                    },
                    {
                        text: '疑似刷票数据说明',
                        show: this.symbolMap.size,
                        top: 15,
                        left: 120,
                        target: 'blank',
                        link: 'https://forms.ebdan.net/ls/dbi6w20H?bt=yxy',
                        textStyle: {
                            color: '#1621FF',
                            fontSize: 14,
                            fontFamily: 'PingFangSC-Medium, PingFang SC',
                            fontWeight: 500,
                        },
                    },
                ],
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#00000099',
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'PingFang SC',
                        fontWeight: 400,
                    },
                    formatter: function (params) {
                        return _this.setChartTip(params);
                    },
                },
                color: this.chartColor,
                legend: {
                    top: 50,
                    width: '80%',
                    data: legend,
                    icon: 'circle',
                    textStyle: {
                        color: '#333',
                        fontFamily: 'PingFang SC',
                        fontWeight: 400,
                    },
                    formatter: function (name) {
                        return name.length > 7 ? name.slice(0, 7) + '...' : name;
                    },
                },
                grid: {
                    show: true,
                    top: 109,
                    left: 50,
                    right: 50,
                    bottom: 24,
                    borderColor: '#eee',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#eee',
                        },
                    },
                    axisLabel: {
                        color: '#666',
                        fontSize: 12,
                        fontFamily: 'PingFang SC',
                        fontWeight: 400,
                        formatter: function (value, index) {
                            // 尾坐标不展示
                            if (index === xAxis.length - 1) {
                                return '';
                            } else {
                                return value;
                            }
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: xAxis || [],
                },
                yAxis: {
                    type: 'value',
                    minInterval: 1,
                    axisLine: {
                        lineStyle: {
                            color: '#eee',
                        },
                    },
                    axisLabel: {
                        color: '#666',
                        fontSize: 12,
                        fontFamily: 'PingFang SC',
                        fontWeight: 400,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                },
                series,
            };
            const opts = {
                notMerge: true, // 不和之前的options合并
            };
            this.chart.setOption(option, opts);
        },
        setChartTip(params) {
            const title = params[0].name;
            let content = params.map((item, index) => {
                let colorStyle = `
                    display: inline-block;
                    height: 12px;
                    width: 12px;
                    margin-right: 6px;
                    border-radius: 50%;
                    background: ${item.data.itemStyle.targetColor}
                `;
                return `
                <div style="margin-bottom: 4px;display: flex; align-items: center;">
                    <div style="${colorStyle}"></div>
                    <span>${item.seriesName.length > 7 ? item.seriesName.slice(0, 7) + '...' : item.seriesName}:</span>
                    <span style="margin-left: 5px;" onmousemove="console.log('hover')">${item.value}票 ${
                    item.data.symbol === 'none' ? '' : '(疑似刷票)'
                }</span>
                </div>`;
            });
            let _wrapper = `<div style="padding: 4px 10px">
                <div style="font-size: 14px; margin-bottom: 4px">${title}</div>
                ${content.join('')}
            </div>`;
            return _wrapper;
        },
        reSize() {
            if (this.chart) {
                this.chart.resize();
            }
        },
    },
};
