
define(function(){
    return {
        checkPage: function () {
            switch (document.getElementById("tag").value) {
                case 'dashboard':
                    require(['dataDB'],function(dataDB){
                        dataDB.getDashboardData(BP.dataDashboard);
                        dataDB.updateDashboard();
                        //language.changeLanguage();
                    });
                    break;
                case 'monthly':
                    require(['dataMon'],function(dataMon){
                        //chart.createLineChart();
                        dataMon.getMonthlyData(BP.dataMonthly);
                        dataMon.updateMonthly();
                    });
                    break;
                case 'by_product':
                    require(['dataBP'],function(dataBP){
                        dataBP.getProductData(BP.dataProduct);
                        dataBP.updateProduct();
                    });
                    break;
                case 'activity':
                    require(['dataAct'], function (dataAct) {
                        dataAct.getActivityData(BP.dataActivity);
                        dataAct.updateActivity();

                        //createChart.createBarChart();
                        //chart.createLineChart();
                    });
                    break;
                case 'activityChild':
                    require(['activityChildChart'], function (chart) {
                        chart.createCharts();
                    });
                    break;
                case 'popup':
                    require(['popup'], function (popup) {
                        popup.getPopupData();
                        popup.updatePopupData();
                        //popup.changePopup()
                    });
                    break;
                case  'drilldown':
                    require(['dataDrill'], function (dataDrill) {
                        dataDrill.getDrilldownData(BP.dataDrill);
                        dataDrill.updateDrilldown();
                        BP.changeLanguage();

                    });
                    break;
                case 'mdrt':
                    require(['dataMdrt'], function (dataMdrt) {
                        dataMdrt.getMdrtData(BP.dataMdrt);
                        dataMdrt.updateMdrtData();
                    });
                    break;
                case 'goals_activity':
                    require(['dataGA'], function (dataGA) {
                        dataGA.getGAData(BP.dataGA);
                        dataGA.updateGAData();
                    });
                    break;
                case 'clubs_awards':
                    require(['dataCA'], function (dataCA) {
                        dataCA.getCAData(BP.dataCA);
                        dataCA.updateCAData();
                    });
                    break;
                case 'goals_clubs':
                    require(['dataGCA'], function (dataGCA) {
                        dataGCA.getGCAData(BP.dataGCA);
                        dataGCA.updateGCAData();
                    });
                    break;
                default :
                    alert("error");
            }
            //$("#switch").click(function () {
            //    if(Global.lang == 'eng'){
            //        Global.lang = 'chi'
            //    }else{
            //        Global.lang = 'eng'
            //    }
            //    language.changeLanguage()
            //})
        }
    }
});