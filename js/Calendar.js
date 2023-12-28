class Calendar
{
	constructor(id, y, m, d)
	{
		this.d = d;
		this.m = m;
		this.y = y;
		this.msId = id;
	}
	
	attach(sParent, objJQ)
	{
		$("#" + this.getId()).remove();
		$("#" + sParent).append(objJQ);
	}
	
	getDay()
	{
		if(typeof(this.d) == "undefined")
			this.d = Number.parseInt(new Date().getDate());
			
		return(this.d);
	}
	
	getDayName()
	{
		switch(getDayOfWeek())
			{
			case 0:
				return("Sunday");
			case 1:
				return("Monday");
			case 2:
				return("Tuesday");
			case 3:
				return("Wednesday");
			case 4:
				return("Thursday");
			case 5:
				return("Friday");
			case 6:
				return("Saturday");
			}
	}
	
	getDayOfWeek()
	{
		return(new Date(this.getYear(), this.getMonth(), this.getDay()).getDay());
	}
	
	getFirstWeekdayOfMonthAndYear(m, y)
	{
		var dt = new Date(y, m, 1);
		
		return(dt.getDay());
	}
	
	getId()
	{
		return(this.msId);
	}
	
	getJQuery()
	{
		var divRoot = $("<div></div>",	{	id:	this.getId()	});
		
		var divNavRow = 
			$("<div></div>",	{	"css":	{	"display":			"flex"
											,	"flex-direction":	"row"
											}});
											
		var divPrevMonth = 
				$("<div></div>",	{	"css":	{	"cursor":			"pointer"
												,	"font-weight":		"bold"	
												,	"margin-right":		"2em"
												,	"text-decoration":	"underline"
												,	"vertical-align":	"middle"
												}})
					.html("&lt;&lt;")
					.click(() =>
			{
				this.setMonthAndYear(this.getMonth() - 1, this.getYear());
			});
					
		var spanCurrentMonth =
			$("<span></span>",	{	"css":	{	"font-weight":		"bold"
											,	"text-decoration":	"underline"
											}})
				.html(this.getMonthName())
				.click(() =>
				{
					spanCurrentMonth.hide();
					spanMonthDropDown.css("display", "inline");
				});
				
		var scrollMonth = 
			$("<span></span>",	{	"css":	{	"display":				"flex"
											,	"flex-direction":		"column"
											,	"margin-right": 		"-.25em"
											,	"margin-top":			"-.25em"
											}})
				.append(
					$("<span></span>",	{	"css":	{	"cursor":			"pointer"
													,	"height":			"auto"
													,	"margin-bottom":	"-5px"
													,	"scale":			"50%"}})
						.html("▲")
						.click(() =>
						{
							this.setMonthAndYear(this.getMonth() - 1, this.getYear());
						}))
					.append(
						$("<span></span>",	{	"css":	{	"cursor":		"pointer"
														,	"height":		"auto"
														,	"margin-top":	"-5px"
														,	"scale":		"50%"
														}})
							.html("▼")
							.click(() =>
							{
								this.setMonthAndYear(this.getMonth() + 1, this.getYear());
							}));
							
	var spanCurrentYear =
		$("<span></span>",	{	css:	{	"font-weight":	"bold"	}})
			.html(this.getYear());
			
		var scrollYear = 
			$("<span></span>",	{	"css":	{	"display":				"flex"
											,	"flex-direction":		"column"
											,	"margin-right": 		"-.25em"
											,	"margin-top":			"-.25em"
											}})
				.append(
					$("<span></span>",	{	"css":	{	"cursor":			"pointer"
													,	"height":			"auto"
													,	"margin-bottom":	"-5px"
													,	"scale":			"50%"}})
						.html("▲")
						.click(() =>
						{
							this.setYear(this.getYear() - 1);
						}))
					.append(
						$("<span></span>",	{	"css":	{	"cursor":		"pointer"
														,	"height":		"auto"
														,	"margin-top":	"-5px"
														,	"scale":		"50%"
														}})
							.html("▼")
							.click(() =>
							{
								this.setYear(this.getYear() + 1);
							}));
							
	var divNextMonth = 
		$("<div></div>",	{	"css":	{	"cursor":			"pointer"
										,	"font-weight":		"bold"	
										,	"margin-left":		"2em"
										,	"text-decoration":	"underline"
										,	"vertical-align":	"middle"
										}})
			.html("&gt;&gt;")
			.click(() =>
			{
				this.setMonthAndYear(this.getMonth() + 1, this.getYear());
			});
			
	divRoot
		.append(
			divNavRow
				.append(divPrevMonth)
				.append(spanCurrentMonth)
				.append(scrollMonth)
				.append(", &nbsp;")
				.append(spanCurrentYear)
				.append(scrollYear)
				.append(divNextMonth));
			
	var divCalendar = 
		$("<div></div>",	{	css:	{	display:					"grid"
										,	"grid-template-columns":	"2.25em 2.275em 2.375em 2.5em 2.5em 2.5em 2.5em"
										,	"grid-template-rows":		"1em"
										,	"text-align": 				"center"
										}});
										
	var arrDays = Array("Su", "M", "Tu", "W", "Th", "F", "Sa");
										
	for(var sDay in arrDays)
		divCalendar.append(
			$("<span></span>",	{	"class":	"dayLabel"	})
				.html(arrDays[sDay]));
	
	for(var iLength = this.getFirstWeekdayOfMonthAndYear(this.getMonth(), this.getYear()), iLoop = 0; iLoop < iLength; iLoop++)
		divCalendar
			.append(
				$("<span></span>")
					.html("&nbsp;"));
					
	for(var iLength = this.getMaxDaysInMonth(), iLoop = 1; iLoop <= iLength; iLoop++)
		if((this.getMonth() == new Date().getMonth()) && (iLoop == new Date().getDate()))
			divCalendar
				.append(
					$("<span></span>",	{	css:	{	"font-weight": 		"bolder"	}})
						.html(iLoop));
		else
			divCalendar
				.append(
					$("<span></span>")
						.html(iLoop));
	
	divRoot.append(divCalendar);
	
	var divFooter = 
		$("<div></div>",	{	css:	{	display: 			"flex"
										,	"flex-direction": 	"row"
										,	"margin": 			"2.5em"
										,	"margin-top": 		"1em"
										}});
										
	divFooter
		.append(
			$("<input />",	{	css:		{	"margin-right": "1em"	}
							,	type:		"button"
							,	value:		"Add"
							}))
		.append(
			$("<input />",	{	css:		{	"margin-right":		"1em"	}
							,	type:		"button"
							,	value:		"Import"
							}))
		.append(
			$("<input />",	{	css:		{	"margin-right":			"1em"	}
							,	type:		"button"
							,	value:		"Export"
							}));
			
		divRoot.append(divFooter);
		
		var jqReturn = divRoot;
						
		return(jqReturn);
	}
	
	getMaxDaysInMonth()
	{
		return(this.getMaxDaysInMonth(getMonth(), getYear()));
	}
	
	getMaxDaysInMonth(m, y)
	{
		if(typeof(m) == "undefined")
			m = this.getMonth();
		if(typeof(y) == "undefined")
			y = this.getYear();
			
		return(new Date(y, m + 1, 0).getDate());
	}
	
	getMonth()
	{
		if(typeof(this.m) == "undefined")
			this.m = new Date().getMonth();
			
		return(this.m);
	}
	
	getMonthName()
	{
		switch(this.getMonth())
			{
			case 0:
				return("January");
			case 1:
				return("February");
			case 2:
				return("March");
			case 3:
				return("April");
			case 4:
				return("May");
			case 5:
				return("June");
			case 6:
				return("July");
			case 7:
				return("August");
			case 8:
				return("September");
			case 9:
				return("October");
			case 10:
				return("November");
			case 11:
				return("December");
			}
	}
	
	getWeeksPerMonth()
	{
		var iWeeks = 4;
		
		switch(this.getMaxDaysInMonth())
			{
			case 31:
				if(this.getFirstWeekdayOfMonthAndYear() > 2)
					iWeeks += 1;
					
				break;
			case 30:
				if(this.getFirstWeekdayOfMonthAndYear() <= 6)
					iWeeks += 1;
					
				break;
			default:
				if(this.isLeapYear())
					if(this.getFirstWeekdayOfMonthAndYear() >= 6)
						iWeeks = 6;
				else if(this.getFirstWeekdayOfMonthAndYear > 0)
					iWeeks = 5;
					
				break;
				
			}
	}
	
	getYear()
	{
		if(typeof(this.y) == "undefined")
			this.y = Number.parseInt(new Date().getFullYear());
			
		return(this.y);
	}
	
	isLeapYear()
	{
		return(new Date(getYear(), 3, -1).getDate() == 29);
	}
	
	setDate(d, m, y)
	{
		if(m < 0)
			this.setMonthAndYear(12, y - 1);
		else if(m > 11)
			this.setMonthAndYear(0, y + 1);
		else
			this.setMonthAndYear(m, y);
		
		if(d < 0)
			{
			this.setDate(this.getMaxDaysInMonth(m-1, y));
			this.setMonthAndYear(m - 1, y);
			}
		else if(d > this.getMaxDaysInMonth(m, y))
			{
			this.setDate(1, m + 1, y);
			this.setMonthAndYear(m + 1, y);
			}
			
		this.attach("leftPanel", this.getJQuery());
	}
	
	setDay(d)
	{
		this.d = d;
		
		this.attach("leftPanel", this.getJQuery());
	}
	
	setId(id)
	{
		this.msId = id;
		
		this.attach("leftPanel", this.getJQuery());
	}
	
	setMonth(m)
	{
		this.m = m;
		
		this.attach("leftPanel", this.getJQuery());
	}
	
	setMonthAndYear(m, y)
	{
		if((m >= 0) && (m <= 11))
			{
			this.m = m;
			this.y = y;
			}
		else if(m < 0)
			{
			this.m = 11;
			this.y = y - 1;
			}
		else if(m > 11)
			{
			this.m = 0;
			this.y = y + 1;
			}
			
		this.attach("leftPanel", this.getJQuery());
	}
	
	setYear(y)
	{
		this.y = y;
		
		this.attach("leftPanel", this.getJQuery());
	}
}