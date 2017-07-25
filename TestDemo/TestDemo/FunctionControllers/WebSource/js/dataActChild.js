//var dataChild = '{"weekly":{"label":["2/2","2/9","2/9","2/9","2/9","2/9","2/9","2/9","2/9","2/9","2/9","2/9"],"data":{"NewProspects":["23","23","23","23","23","23","23","23","23","23","23","23"],"FactFinds":["13","33","23","23","23","43","23","23","23","23","23","23"],"Closing":["23","23","23","23","23","23","23","23","23","23","23","23"],"Sales":["23","23","23","23","23","23","23","23","23","23","23","23"]}},"Monthly":{"label":["Feb","Mar","Apr"],"data":{"NewProspects":["23","3","23"],"FactFinds":["23","23","23"],"Closing":["23","23","23"],"Sales":["23","23","23"]}},"YTD":{"label":["By Feb","By Mar","By Apr"],"data":{"NewProspects":["23","23","23"],"FactFinds":["23","23","23"],"Closing":["23","23","23"],"Sales":["23","23","23"]}}}';
//var dataChild = '{  "monthly" : {"label" : [ "AUG",      "JUL",      "JUN"    ],    "data" : {      "New Prospects" : [        "15",        "28",        "25"      ],      "Sales" : [        "9",        "26",        "22"      ],      "Closing" : [        "8",        "27",        "27"      ],      "Fact Finds" : [        "15",        "30",        "23"      ]    }  },  "ytd" : {    "label" : [      "By AUG",      "By JUL",      "By JUN"    ],    "data" : {      "New Prospects" : [        "318",        "303",        "275"      ],      "Sales" : [        "277",        "268",        "242"      ],      "Closing" : [        "292",        "284",        "257"      ],      "Fact Finds" : [        "298",        "283",        "253"      ]    }  },  "weekly" : {    "label" : [      "05/23",      "05/30",      "06/06",      "06/13",      "06/20",      "06/27",      "07/04",      "07/11",      "07/18",      "07/25",      "08/01",      "08/08"    ],    "data" : {      "New Prospects" : [        "1",        "2",        "3",        "4",        "5",        "6",        "15",        "15",        "15",        "15",        "15",        "15"      ],      "Sales" : [        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13"      ],      "Closing" : [        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13"      ],      "Fact Finds" : [        "14",        "14",        "14",        "14",        "14",        "14",        "14",        "14",        "14",        "14",        "14",        "14"      ]    }  }}';
//BP.getActChildData(dataChild);
define(['activityChildChart','iframe'],function(ac,iframe){
    return {
        activityChildData:null,

        getActChildData: function (data) {
            this.activityChildData = data;
        },
        updateActChildData: function () {
            var data = JSON.parse(this.activityChildData);

            ac.createCharts(data);
	        //document.getElementById("back").onclick = function(){
	        	//iframe.loadURL("back:");
	        //}
        }
    }
});