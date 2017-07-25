//var dataGCA = '{"ClubsAwards": {"Agent\'s Lives Club": {"Bronze": [{"keyType": "Lifes", "keyValue": "110", "clubAwardsCode": "CA04", "select": "0"}, {"keyType": "AP", "keyValue": "0.5", "clubAwardsCode": "CA04", "select": "0"} ], "Silver": [{"keyType": "AP", "keyValue": "0.6", "clubAwardsCode": "CA03", "select": "0"}, {"keyType": "Lifes", "keyValue": "120", "clubAwardsCode": "CA03", "select": "0"} ], "Diamond": [{"keyType": "AP", "keyValue": "0.8", "clubAwardsCode": "CA01", "select": "1"}, {"keyType": "Lifes", "keyValue": "140", "clubAwardsCode": "CA01", "select": "1"} ], "Gold": [{"keyType": "Lifes", "keyValue": "130", "clubAwardsCode": "CA02", "select": "0"}, {"keyType": "AP", "keyValue": "0.7", "clubAwardsCode": "CA02", "select": "0"} ] }, "Annual Convention": {"AGT": [{"keyType": "Cases", "keyValue": "0.5", "clubAwardsCode": "CA09", "select": "0"}, {"keyType": "FYC", "keyValue": "110", "clubAwardsCode": "CA09", "select": "0"}, {"keyType": "FYP", "keyValue": "110", "clubAwardsCode": "CA09", "select": "0"} ], "Pre UM (AL)": [{"keyType": "Cases", "keyValue": "120", "clubAwardsCode": "CA08", "select": "1"}, {"keyType": "FYC", "keyValue": "0.6", "clubAwardsCode": "CA08", "select": "0"}, {"keyType": "FYP", "keyValue": "0.6", "clubAwardsCode": "CA08", "select": "0"} ], "UM Up": [{"keyType": "Cases", "keyValue": "140", "clubAwardsCode": "CA06", "select": "0"}, {"keyType": "FYC", "keyValue": "0.8", "clubAwardsCode": "CA06", "select": "0"}, {"keyType": "FYP", "keyValue": "0.8", "clubAwardsCode": "CA06", "select": "0"} ] }}, "career": {"Top Agent": [{"keyType": "FYC", "keyValue": "240", "clubAwardsCode": "", "select": "0"},{"keyType": "Active months", "keyValue": "9", "clubAwardsCode": "", "select": "0"}, {"keyType": "Persistency Rate", "keyValue": "0.75", "clubAwardsCode": "", "select": "0"} ], "Regular Agent": [ {"keyType": "FYC", "keyValue": "180", "clubAwardsCode": "", "select": "0"},{"keyType": "Persistency Rate", "keyValue": "0.5", "clubAwardsCode": "", "select": "0"} , {"keyType": "Active months", "keyValue": "6", "clubAwardsCode": "", "select": "0"}] } }';
//BP.getGCAData(dataGCA);
define(['jquery','tppl', 'goalsClubs'], function ($,t,gc) {
   return {
       GCAData:null,
       getGCAData: function (data) {
           this.GCAData = data;
       },
       updateGCAData: function () {
           var data = $.parseJSON(this.GCAData);
           initGC(data);
       }
   } 
});