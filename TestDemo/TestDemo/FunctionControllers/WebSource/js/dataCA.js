
//var dataCA = '{"Top": {"TOT": {"restValuePercent": "99%", "Target": "7120800", "restTarget": "7060800.0"}, "COT": {"restValuePercent": "98%", "Target": "3560400", "restTarget": "3500400.0"}, "MDRT Current Position": {"restValuePercent": "5%", "Target": "60000", "restTarget": "60000"}, "MDRT": {"restValuePercent": "95%", "Target": "1186800", "restTarget": "1126800.0"} }, "Middle": {"Top Agent": {"Persistency Rate": {"valuePercent": "73%", "personKeyValue": "0.55", "valuePercentCut": "27%", "valueReduce": "0.2", "KeyValue": "0.55", "KeyType": "Persistency Rate"}, "Active months": {"valuePercent": "56%", "personKeyValue": "5", "valuePercentCut": "44%", "valueReduce": "4.0", "KeyValue": "5", "KeyType": "Active months"}, "FYC": {"valuePercent": "40%", "personKeyValue": "96", "valuePercentCut": "60%", "valueReduce": "144.0", "KeyValue": "96", "KeyType": "FYC"} } }, "Bottom": {"Annual Convention": {"Cases": {"valuePercent": "20%", "personKeyValue": "5", "valuePercentCut": "80%", "valueReduce": "20.0", "KeyValue": "25 ", "KeyType": "Cases"}, "FYP": {"valuePercent": "0%", "personKeyValue": "4", "valuePercentCut": "100%", "valueReduce": "2149996.0", "KeyValue": "2150000 ", "KeyType": "FYP"}, "FYC": {"valuePercent": "0%", "personKeyValue": "5", "valuePercentCut": "100%", "valueReduce": "749995.0", "KeyValue": "750000 ", "KeyType": "FYC"} }, "Agent\'s Lives Club": {"Lifes": {"valuePercent": "50%", "personKeyValue": "70", "valuePercentCut": "50%", "valueReduce": "70.0", "KeyValue": "140", "KeyType": "Lifes"}, "AP": {"valuePercent": "69%", "personKeyValue": "0.55", "valuePercentCut": "31%", "valueReduce": "0.25", "KeyValue": "0.8", "KeyType": "AP"} } } }';
//var dataCA = '{  "Top" : {    "COT" : {      "restValuePercent" : "100%",      "Target" : "3560400",      "restTarget" : "3560400.0"    },    "MDRT" : {      "restValuePercent" : "100%",      "Target" : "1186800",      "restTarget" : "1186800.0"    },    "TOT" : {      "restValuePercent" : "100%",      "Target" : "7120800",      "restTarget" : "7120800.0"    }  },  "Middle" : {    "Top Agent" : {      "FYC" : {        "valuePercent" : "80%",        "personKeyValue" : "200",        "valuePercentCut" : "20%",        "valueReduce" : "50.0",        "KeyValue" : "200",        "KeyType" : "FYC"      },      "Active months" : {        "valuePercent" : "89%",        "personKeyValue" : "8",        "valuePercentCut" : "11%",        "valueReduce" : "1.0",        "KeyValue" : "8",        "KeyType" : "Active months"      },      "Persistency Rate" : {        "valuePercent" : "60%",        "personKeyValue" : "0.45",        "valuePercentCut" : "40%",        "valueReduce" : "0.3",        "KeyValue" : "0.45",        "KeyType" : "Persistency Rate"      }    }  },  "Bottom" : {    "Annual Convention" : {      "Cases" : {        "valuePercent" : "80%",        "personKeyValue" : "20",        "valuePercentCut" : "20%",        "valueReduce" : "5.0",        "KeyValue" : "25 ",        "KeyType" : "Cases"      },      "FYP" : {        "valuePercent" : "5%",        "personKeyValue" : "100000",        "valuePercentCut" : "95%",        "valueReduce" : "2050000.0",        "KeyValue" : "2150000 ",        "KeyType" : "FYP"      },      "FYC" : {        "valuePercent" : "11%",        "personKeyValue" : "80000",        "valuePercentCut" : "89%",        "valueReduce" : "670000.0",        "KeyValue" : "750000 ",        "KeyType" : "FYC"      }    },    "Agent\'s Lives Club" : {      "Lifes" : {        "valuePercent" : "43%",        "personKeyValue" : "60",        "valuePercentCut" : "57%",        "valueReduce" : "80.0",        "KeyValue" : "140",        "KeyType" : "Lifes"      },      "AP" : {        "valuePercent" : "40%",        "personKeyValue" : "0.32",        "valuePercentCut" : "60%",        "valueReduce" : "0.48",        "KeyValue" : "0.8",        "KeyType" : "AP"      }    }  }}';
//BP.getCAData(dataCA);
define(['jquery','tppl','clubsAwards'], function ($,t,ca) {
    return {
        CAData:null,

        getCAData: function (data) {
            this.CAData = data;
        },
        updateCAData:function(){
            var data = $.parseJSON(this.CAData);
    		addDiv(data);
    		
    		var bar = $('.progress-bar');
    		 $(bar).each(function(){
    			bar_width = $(this).attr('aria-valuenow');
    			$(this).width(bar_width);
    		 });
        }
    }
});