$(function () {
	var productName = '';
	getProductSellDailyList();
	getList();
	function getList() {
		// 1 获取用户购买信息的URL
		var listUrl = '/o2o/shopadmin/listuserproductmapsbyshop?pageIndex=1&pageSize=9999&productName='
			+ productName;
		$.getJSON(listUrl, function (data) {
			if (data.success) {
				var userProductMapList = data.userProductMapList;
				var tempHtml = '';
				// 2 遍历购买信息列表,拼接出列信息
				userProductMapList.map(function (item, index) {
					tempHtml += '' + '<div class="row row-productbuycheck">'
						+ '<div class="col-10">' + item.product.productName
						+ '</div>'
						+ '<div class="col-40 productbuycheck-time">'
						+ new Date(item.createTime).Format("yyyy-MM-dd hh:mm:ss")
						+ '</div>' + '<div class="col-20">'
						+ item.user.name + '</div>'
						+ '<div class="col-10">' + item.point + '</div>'
						+ '<div class="col-20">' + item.operator.name+'</div>'
						+ '</div>';
				});
				$('.productbuycheck-wrap').html(tempHtml);
			}
		});
	}

	$('#search').on('change', function (e) {
		// 1 当在搜索框里输入信息的时候
		// 依据输入的商品名模糊查询该商品的购买记录
		productName = e.target.value;
		// 2 清空商品购买记录列表
		$('.productbuycheck-wrap').empty();
		// 3 再次加载
		getList();
	});

	/**
	 * 1 获取7天的销量
	 */
	function getProductSellDailyList() {
		// 1 获取该店铺商品7天销量的URL
		var listProductSellDailyUrl = '/o2o/shopadmin/listproductselldailyinfobyshop';
		// 2 访问后台,该店铺商品7天销量的url
		$.getJSON(listProductSellDailyUrl, function (data) {
			if (data.success) {
				var myChart = echarts.init(document.getElementById('chart'));
				// 3 生成静态的Echart信息的部分
				var option = generateStaticEchartPart();
				// 4 遍历销量统计列表,动态设定echarts的值
				option.legend.data = data.legendData;
				option.xAxis = data.xAxis;
				option.series = data.series;
				myChart.setOption(option);
			}
		})
	}

	/**
	 * 2 生成静态的Echart信息的部分
	 */
	function generateStaticEchartPart() {
		/**echarts逻辑部分 */
		var option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 1 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 2 默认为直线，可选为：'line' | 'shadow'
				}
			},
			// 3 图例,每个图标最多仅有一个图例
			legend: {
				// 4 图例内容数组,数组项通常为{string},每一项代表一个系列的name

			},
			// 5 直角坐标系内绘图网格
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			// 6 直角坐标系中横轴数组,每组中每一项代表一条横轴坐标轴
			xAxis: [{

			}],
			// 8 直角坐标系中纵轴数组,数组中每一项代表一条纵轴坐标轴
			yAxis: [{
				type: 'value'
			}],
			// 9 驱动图表生成的数据内容数组,数组中每一项为一个系列的选项及数据
		};
		return option;
	}

	// /**echarts逻辑部分 */
	// var myChart = echarts.init(document.getElementById('chart'));
	//
	// var option = {
	// tooltip : {
	// trigger : 'axis',
	// axisPointer : { // 1 坐标轴指示器，坐标轴触发有效
	// type : 'shadow' // 2 默认为直线，可选为：'line' | 'shadow'
	// }
	// },
	// // 3 图例,每个图标最多仅有一个图例
	// legend : {
	// // 4 图例内容数组,数组项通常为{string},每一项代表一个系列的name
	// data : [ '茉莉奶茶', '绿茶拿铁', '冰雪奇缘' ]
	// },
	// // 5 直角坐标系内绘图网格
	// grid : {
	// left : '3%',
	// right : '4%',
	// bottom : '3%',
	// containLabel : true
	// },
	// // 6 直角坐标系中横轴数组,每组中每一项代表一条横轴坐标轴
	// xAxis : [ {
	// // 7 类目录 : 需要指定类目列表,坐标轴内有且仅有这些指定类目坐标
	// type : 'category',
	// data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
	// } ],
	// // 8 直角坐标系中纵轴数组,数组中每一项代表一条纵轴坐标轴
	// yAxis : [ {
	// type : 'value'
	// } ],
	// // 9 驱动图表生成的数据内容数组,数组中每一项为一个系列的选项及数据
	// series : [ {
	// name : '茉莉奶茶',
	// type : 'bar',
	// data : [ 120, 132, 101, 134, 290, 230, 220 ]
	// }, {
	// name : '绿茶拿铁',
	// type : 'bar',
	// data : [ 60, 72, 71, 74, 190, 130, 110 ]
	// }, {
	// name : '冰雪奇缘',
	// type : 'bar',
	// data : [ 62, 82, 91, 84, 109, 110, 120 ]
	// } ]
	// };
	//
	// myChart.setOption(option);

});