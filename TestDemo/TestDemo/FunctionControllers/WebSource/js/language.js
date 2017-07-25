define(['jquery'],function ($) {
    return {
        changeLanguage:function(){
        	var type = BP.languageType;
    		BP.language = Global.language[BP.languageType];
    		$("*").each(function (index, domNode) {
                var currLanguage = Global.language[BP.languageType];
                var lang = $(domNode).attr("lang");
                if(lang){
                    currLanguage = currLanguage[lang];
                    $(domNode).html(currLanguage);
                }
            });
        }
    }
});

var Global = {};
Global.language = {
  en:{
	  	DEC: "Dec",
	    JAN: "Jan",
	    FEB: "Feb",
	    MAR: "Mar",
	    APR: "Apr",
	    MAY: "May",
	    JUN: "Jun",
	    JUL: "Jul",
	    AUG: "Aug",
	    SEP: "Sep",
	    OCT: "Oct",
	    NOV: "Nov",
		M1: "M1",
		M2: "M2",
		M3: "M3",
		M4: "M4",
		M5: "M5",
		M6: "M6",
		M7: "M7",
		M8: "M8",
		M9: "M9",
		M10: "M10",
		M11: "M11",
		M12: "M12",
	    FULL_YEAR: "full year",
	    GROWTH_YTD: "Growth YTD",
	    MONTHLY: "Monthly",
	    WEEKLY: "Weekly",
	    BY_PRODUCTS: "By Products",
	    TARGET: "Target",
	    FULL_YEAR_GOAL: "Full Year Goal",
	    TOTAL: "Total",
	    CREDIT_LIFE: "Credit Life",
	    BACK: "Back",
	    CURRENT_POSITION: "Current Position",
	    DIAMOND: "Diamond",
	    GOLD: "Gold",
	    SILVER: "Silver",
	    BRONZE: "Bronze",
	    PLEASE_SELECT: "Please Select",
	    HALL_OF_FAME: "Hall of Fame",
	    CONVENTION: "Convention",
	    ADDITIANAL: "Additional",
	    LAST_3_MONTHS: "Last 3 Months",
	    TRAINING_ATTENDANCE: "Training Attendance",
	    DRILL_DOWN: "Drill Down",
	    SALES: "Sales",

	    //DashBoard
	    D_VS_GOAL: "vs Goal",
	    D_GROWTH: "Growth",

	    //Drill Down
	    DRILL_VS_GOAL: "vs Goal",
	    DRILL_GROWTH: "Growth",
	    DRILL_CONTRIBUTION: "Contribution",

	    //Monthly
	    M_ACTUAL: "Actual",
	    M_GOAL: "Goal",
	    M_VS_GOAL: "VS Goal",
	    M_GROWTH: "Growth",
	    M_FULL_YEAR_GOAL: "Full Year Goal:",
	    M_FULL_YEAR_REFORECAST: "Full Year Reforecast:",
	    M_AUTO_REFORECAST: "Auto Reforecast",
	    M_RESTORE_LAST_SUBMISSION: "Restore Last Submission",
	    M_SUBMIT: "Submit",

	    //ByProduct
	    B_MTD: "MTD",
	    B_QTD: "QTD",
	    B_YTD: "YTD",
	    B_QTD_FA: "QTD(Join FA)",
	    B_YTD_FA: "YTD(Join FA)",
	    B_TOTAL: "Total",

	    //Activity
	    A_TREND: "Trend(Past 3 months)",
	    A_LAST_WEEK: "Last Week",
	    A_THIS_WEEK: "This Week",
	    A_LAST_MONTH: "Last Month",
	    A_PLANNED: "Planned",
	    A_ACTUAL: "Actual",
	    A_ADDITIONAL: "Additional",
	    A_YTD: "YTD",
	    A_IPOS_ACTUAL: "iPoS Actual",
	    A_ADDTIONAL_CASE: "Addtional Case"
  },
  th:{
		DEC: "ธ.ค.",
		JAN: "ม.ค.",
		FEB: "ก.พ.",
		MAR: "มี.ค.",
		APR: "เม.ย.",
		MAY: "พ.ค.",
		JUN: "มิ.ย.",
		JUL: "ก.ค.",
		AUG: "ส.ค.",
		SEP: "ก.ย.",
		OCT: "ต.ค.",
		NOV: "พ.ย.",
		M1: "M1",
		M2: "M2",
		M3: "M3",
		M4: "M4",
		M5: "M5",
		M6: "M6",
		M7: "M7",
		M8: "M8",
		M9: "M9",
		M10: "M10",
		M11: "M11",
		M12: "M12",
		FULL_YEAR: "ทั้งปี",
		GROWTH_YTD: "อัตราเติบโตทั้งปี",
		MONTHLY: "รายเดือน",
		WEEKLY: "รายสัปดาห์",
		BY_PRODUCTS: "รายผลิตภัณฑ์",
		TARGET: "เป้าหมาย",
		FULL_YEAR_GOAL: "เป้าหมายทั้งปี",
		TOTAL: "รวม",
		CREDIT_LIFE: "ประกันชีวิต",
		BACK: "ย้อนกลับ",
		CURRENT_POSITION: "ตำแหน่งปัจจุบัน",
		DIAMOND: "เพชร",
		GOLD: "ทอง",
		SILVER: "เงิน",
		BRONZE: "ทองแดง",
		PLEASE_SELECT: "กรุณาเลือก",
		HALL_OF_FAME: "หอเกียรติยศ",
		CONVENTION: "การประชุม",
		ADDITIANAL: "เพิ่มเติม",
		LAST_3_MONTHS: "3 เดือนล่าสุด",
		TRAINING_ATTENDANCE: "เข้าร่วมการอบรม",
		DRILL_DOWN: "ดูรายละเอียด",
	    SALES: "ยอดขาย",
	    //DashBoard
	    D_VS_GOAL: "vs เป้าหมาย",
	    D_GROWTH: "เติบโต",

	    //Drill Down
	    DRILL_VS_GOAL: "vs เป้าหมาย",
	    DRILL_GROWTH: "เติบโต",
	    DRILL_CONTRIBUTION: "สัดส่วน",

	    //Monthly
	    M_ACTUAL: "ผลงานจริง",
	    M_GOAL: "เป้าหมาย",
	    M_VS_GOAL: "vs เป้าหมาย",
	    M_GROWTH: "เติบโต",
	    M_FULL_YEAR_GOAL: "เป้าหมายทั้งปี",
	    M_FULL_YEAR_REFORECAST: "จำนวนที่คาดการณ์ทั้งปี",
	    M_AUTO_REFORECAST: "คำนวน",
	    M_RESTORE_LAST_SUBMISSION: "กลับไปใช้ค่าที่บันทึกล่าสุด",
	    M_SUBMIT: "บันทึก",

	    //ByProduct
	    B_MTD: "สะสมทั้งเดือน",
	    B_QTD: "สะสมทั้งไตรมาส",
	    B_YTD: "สะสมทั้งปี",
	    B_QTD_FA: "สะสมทั้งไตรมาส(Join FA)",
	    B_YTD_FA: "สะสมทั้งปี(Join FA)",
	    B_TOTAL: "รวม",

	    //Activity
	    A_TREND: "ข้อมูลย้อนหลัง 3 เดือน",
	    A_LAST_WEEK: "ข้อมูลสัปดาห์ที่แล้ว",
	    A_THIS_WEEK: "ข้อมูลสัปดาห์นี้",
	    A_LAST_MONTH: "ข้อมูลเดือนที่แล้ว",
	    A_PLANNED: "เป้าหมาย",
	    A_ACTUAL: "ผลงานจริง",
	    A_ADDITIONAL: "ปรับปรุงเพิ่มเติม",
	    A_YTD: "รายปี (ตั้งแต่ต้นปี)",
	    A_IPOS_ACTUAL: "ผลงานจริงจาก iPoS",
	    A_ADDTIONAL_CASE: "ปรับปรุงเพิ่มเติม"
  }
};