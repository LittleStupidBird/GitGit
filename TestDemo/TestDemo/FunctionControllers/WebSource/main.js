require.config({
	baseUrl:'../js',

	paths:{
		jquery:'extra/jquery-1.8.3.min',
		rotate:'extra/jquery.rotate.min',
		bootstrap:'extra/bootstrap.min',
		table:'extra/bootstrap-table.min',
		tppl:'extra/tppl',
		Chart:'extra/Chart.min',
		echarts:'extra/echarts',
		dataAct:'dataAct'
	},
	shim:{
		'rotate':['jquery'],
		'animate':['rotate'],
		'dataDB':['tppl','animate'],
		'monthlyChart':['Chart'],
		'echarts':['bar'],
		'dataActChild':['activityChildChart']
	}
});
//switch (document.getElementById("tag").value) {
//	case 'dashboard':
//		require(['dataDB'],function(dataDB){
//			dataDB.getDashboardData(BP.dataDashboard);
//			dataDB.updateDashboard();
//		});
//		break;
//	case 'monthly':
//		require(['dataMon'],function(dataMon){
//			//chart.createLineChart();
//			dataMon.getMonthlyData(BP.dataMonthly);
//			dataMon.updateMonthly();
//		});
//		break;
//	case 'by_product':
//		require(['dataBP'],function(dataBP){
//			dataBP.getProductData(BP.dataProduct);
//			dataBP.updateProduct();
//		});
//		break;
//	case 'activity':
//		require(['dataAct'], function (dataAct) {
//			dataAct.getActivityData(BP.dataActivity);
//			dataAct.updateActivity();
//		});
//		break;
//	case 'activityChild':
//		require(['activityChildChart'], function (chart) {
//			chart.createCharts();
//		});
//		break;
//	case  'drilldown':
//		require(['dataDrill','language'], function (dataDrill,lg) {
//			dataDrill.getDrilldownData(BP.dataDrill);
//			dataDrill.updateDrilldown();
//			BP.changeLanguage(Global);
//
//		});
//		break;
//	case 'mdrt':
//		require(['dataMdrt'], function (dataMdrt) {
//			dataMdrt.getMdrtData(BP.dataMdrt);
//			dataMdrt.updateMdrtData();
//		});
//		break;
//	case 'goals_activity':
//		require(['dataGA'], function (dataGA) {
//			dataGA.getGAData(BP.dataGA);
//			dataGA.updateGAData();
//		});
//		break;
//	case 'clubs_awards':
//		require(['dataCA'], function (dataCA) {
//			dataCA.getCAData(BP.dataCA);
//			dataCA.updateCAData();
//		});
//		break;
//	case 'popup':
//		require(['popup'], function (popup) {
//			popup.getPopupData();
//			popup.updatePopupData();
//			//popup.changePopup()
//		});
//		break;
//	case 'goals_clubs':
//		require(['dataGCA'], function (dataGCA) {
//			dataGCA.getGCAData(BP.dataGCA);
//			dataGCA.updateGCAData();
//		});
//		break;
//	default :
//		break;
//}
		//require(['popup'], function (popup) {
		//	console.log("get--popup")
		//	popup.getPopupData();
		//	popup.updatePopupData();
		//	//popup.changePopup()
		//});
// window.onload = function(){
//	console.log('onload')
//	if(document.getElementById("tag").value == 'popup'){
//		require(['popup'], function (popup) {
//			console.log("get--popup")
//			popup.getPopupData();
//			popup.updatePopupData();
//			//popup.changePopup()
//		});
//	}
// }
