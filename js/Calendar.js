class Calendar
{
	constructor(id, y, m, d)
	{
		this.d = undefined;
		this.m = undefined;
		this.y = undefined;
		this.msId = undefined;
	}
	
	attach(sParent, objJQ)
	{
		$("#" + sParent).erase();
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
		return(new Date(getYear(), getMonth(), getDay()).getDay());
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
		var divNavRow = 
			$("<div></div>",	{	"css":	{	"display":			"flex"
											,	"flex-direction":	"row"
											}})
				.append(
					$("<div></div>",	{	"css":	{	"cursor":			"pointer"
													,	"font-weight":		"bold"	
													,	"margin-right":		"2em"
													,	"text-decoration":	"underline"
													,	"vertical-align":	"middle"
													}})
						.html("&lt;&lt;")
						.click(function()
						{
							alert("Move back!");
						}))
				.append(
					$("<span></span>",	{	"css":	{	"cursor":			"pointer"
													,	"font-weight":		"bold"
													,	"text-decoration":	"underline"
													}})
						.html(this.getMonthName()))
		append(
			$("<span></span>",	{	"css":	{	"display":				"flex"
											,	"flex-direction":		"column"
											,	"margin-right": 		"-25em"
											,	"margin-top":			"-25em"
											}})
				.append(
					$("<span></span>",	{	"css":	{	"cursor":			"pointer"
													,	"height":			"auto"
													,	"margin-bottom":	"-5px"
													,	"scale":			"50%"}})
						.html("▲")
						.click(function()
						{
							alert("Move Up");
						}))
					.append(
						$("<span></span>",	{	"css":	{	"cursor":		"pointer"
														,	"height":		"auto"
														,	"margin-top":	"-5px"
														,	"scale":		"50%"
														}})
							.html("▼")
							.click(function()
							{
								alert("Move down");
							})));
	
	var jqReturn = divNavRow;
						
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
			
		return(new Date(y, m + 1, -1).getDate());
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
			
		attach("leftPanel", this.getJQuery());
	}
	
	setDay(d)
	{
		this.d = d;
		
		attach("leftPanel", this.getJQuery());
	}
	
	setId(id)
	{
		this.msId = id;
		
		attach("leftPanel", this.getJQuery());
	}
	
	setMonth(m)
	{
		this.m = m;
		
		attach("leftPanel", this.getJQuery());
	}
	
	setMonthAndYear(m, y)
	{
		if((m >= 0) && (m <= 11))
			{
			this.setMonth(m);
			this.setYear(y);
			}
		else if(m < 0)
			{
			this.setMonth(11);
			this.setYear(y - 1);
			}
		else if(m > 11)
			{
			this.setMonth(0);
			this.setYear(y + 1);
			}
			
		attach("leftPanel", this.getJQuery());
	}
	
	setYear(y)
	{
		this.y = y;
		
		attach("leftPanel", this.getJQuery());
	}
}