class Login
{
	constructor(sURL, sUsername, sPassword)
	{
		this.msURL = sURL;
		this.msUserName = sUsername;
		this.mspassword = sPassword;
		this.msCurrentDialog = undefined;
	}
	
	setupLoginLink()
	{
		$("body")
			.append(
				$("<div></div>",	{	css:	{	"cursor":		"pointer"
												,	height:			"1em"
												,	"position":		"absolute"
												,	left:			"0px"
												,	"margin-right":	"3em"
												,	"text-align":	"right"
												,	"top":			"0px"
												,	"width":		"97%"
												}})
					.append(
						$("<span></span>",	{	css:	{	"font-weight":		"bold"
														,	"text-decoration":	"underline"
														}})
							.html("Login")
							.click(() =>
							{
								openLogin();
							})));
	}
}

function closeLogin()
{
	if($("#dlgLogin")[0].open)
		{
		$("#dlgLogin > input, button, div").unbind();
		$("#dlgLogin")[0].close();
		}
}

function openLogin()
{
	if(!($("#dlgLogin")[0].open))
		{
		if($("#dlgSignup")[0].open)
			closeSignup();
			
		$("#dlgLogin")[0].showModal();
		
		$("#inputLoginUsername")
			.keypress(() =>
			{
				var bLoginDisabled = 	!(($("#inputLoginUsername").val().length > 0)
									&&	($("#inputLoginPassword").val().length > 0));
														
				$("#btnLoginLogin").attr("disabled",	bLoginDisabled);
			});
							
		$("#inputLoginPassword")
			.keypress(() =>
			{
				var bLoginDisabled = 	!(($("#inputLoginUsername").val().length > 0)
									&&	($("#inputLoginPassword").val().length > 0));
														
				$("#btnLoginLogin").attr("disabled",	bLoginDisabled);
			});
		
		$("#chkShowLoginPassword")
			.click(() =>
			{
				$("#inputLoginPassword")
					.attr("type", (	$("#chkShowLoginPassword").is(":checked")
										?	"text"
										:	"password"));
			});
		
		$("#divLoginClose")
			.click(() =>
			{
				closeLogin();
			});
			
		$("#btnSignUp")
			.click(() =>
			{
				openSignup();
			});
			
		$("#btnLoginCancel")
			.click(() =>
			{	
				closeLogin();
			});
			
		$("#inputLoginUsername").focus();
		}
}

function closeSignup()
{
	alert("Hi");
	
	if($("#dlgSignup")[0].open)
		{
		$("#dlgSignup > input, button, div").unbind();
		$("#dlgSignUp")[0].close();
		}
}

function openSignup()
{
	if(($("#dlgLogin")[0].open) && (!$("#dlgSignup")[0].open))
		{
		closeLogin();
		$("#dlgSignup")[0].showModal();
		
		$("#tabs").tabs();
		
		$("#chkNight").prop("checked", window.matchMedia("(prefers-color-scheme: dark)").matches);
			
		$("#btnSignupCancel")
			.click(() =>
			{
				closeSignup();
			});
		
		$("#chkSignupShowPassword")
			.click(() =>
			{
				$("#inputSignupPassword")
					.attr("type", (	$("#chkSignupShowPassword").is(":checked")
										?	"text"
										:	"password"));
			});
		
		$("#chkSignupShowPassword2")
			.click(() =>
			{
				$("#inputSignupPassword2")
					.attr("type", (	$("#chkSignupShowPassword2").is(":checked")
										?	"text"
										:	"password"));
			});
		
		$("#inputSignupUsername")
			.keypress(() =>
			{
				var bSignupDisabled = 	!(($("#inputSignupUsername").val().length > 0)
									&&	($("#inputSignupPassword").val().length > 0));
														
				$("#btnSignupSignup").attr("disabled",	bSignupDisabled);
			});
			
		$("#inputSignupPassword")
			.keypress(() =>
			{
				var bSignupDisabled = 	!(($("#inputSignupUsername").val().length > 0)
									&&	($("#inputSignupPassword").val().length > 0));
														
				$("#btnSignupSignup").attr("disabled",	bSignupDisabled);
			});
	
		$("#inputSignupPassword")
			.keydown(() =>
			{
				setTimeout(() =>
				{
					var iScore = checkPassword($("#inputSignupPassword").val());
					
					if(iScore > 79)
						{
						$("#spanPasswordStrength").html("Strong");
						$("#spanPasswordStrength").css("font-weight", "bolder");
						}
					else if((iScore > 39) && (iScore < 80))
						{
						$("#spanPasswordStrength").html("Moderate");
						$("#spanPasswordStrength").css("font-weight", "bold");
						}
					else
						{
						$("#spanPasswordStrength").html("Weak");
						$("#spanPasswordStrength").css("font-weight", "normal");
						}
						
					if($("#inputSignupPassword").val() == $("#inputSignupPassword2").val())
						$("#spanPasswordsMatch").css("visibility", "visible");
					else
						$("#spanPasswordsMatch").css("visibility", "hidden");
				}, 150);
			});
		
		$("#inputSignupPassword2")
			.keydown(() =>
			{
				setTimeout(() =>
				{
					if($("#inputSignupPassword").val() == $("#inputSignupPassword2").val())
						$("#spanPasswordsMatch").css("visibility", "visible");
					else
						$("#spanPasswordsMatch").css("visibility", "hidden");
				}, 150);
			});
			
		$("#divSignupClose")
			.click(() =>
			{
				closeSignup();
			});
			
		$("#btnSignupSignup")
			.click(() =>
			{
				$.ajax(	{	data:			{	username:	$("#inputSignupUsername").val()
											,	password:	$("#inputSignupPassword").val()
											,	firstname:	$("#inputSignupFirstName").val()
											,	lastname:	$("#inputSignupLastName").val()
											,	email:		$("#inputSignupEmail").val()
											,	birthdate:	$("#inputSignupBirthdate").val()
											}
						,	dataType:		"json"
						,	method:			"post"
						,	success:		(bSignedUp)	=>
											{
												if(bSignedUp)
													{
													closeSignup();
													openLogin();
													}
											}
						,	url:			"localhost:8080/Scheduler/SignUp"
											});
			});
			
		$("#inputSignupUsername").focus();
		}
}

function isDigit(ch)
{
	return((typeof ch === 'string') && (ch.length == 1) && (ch >= '0') && (ch <= '9'));
}

function isLowerCase(ch)
{
	return(		(ch === ch.toLowerCase())
    		&&	(ch !== ch.toUpperCase()));
}

function isUpperCase(ch)
{
	return(		(ch === ch.toUpperCase())
    		&&	(ch !== ch.toLowerCase()));
}

function checkPassword(pwd)
{
	var iScore = 0, iRulesMet = 0;
	var iCaps = 0, iLowers = 0, iDigits = 0, iSpecials = 0, iLength = pwd.length;
	var bWords = false;
		
	$.ajax(	{	async:		false
			,	dataType:	"json"
			,	error:		() =>
							{
								bWords = false;
							}
			,	method:		"get"
			,	success:	(data) =>
							{
								bWords = (data.length > 0);
							}
			,	url:		"https://api.dictionaryapi.dev/api/v2/entries/en/" + pwd
			});
			
		
	
	for(var iLoop = 0; iLoop < iLength; iLoop++)
		{
		if(isLowerCase(pwd[iLoop]))
			iLowers++;
		else if(isUpperCase(pwd[iLoop]))
			iCaps++;
		else if(isDigit(pwd[iLoop]))
			iDigits++;
		else
			iSpecials++;
		}
			
		iRulesMet	=	((iCaps > 0) ? 1 : 0)
					+	((iDigits > 0) ? 1 : 0)
					+	((iLowers > 0) ? 1 : 0)
					+	((iSpecials > 0) ? 1 : 0)
					+	((iLength > 16) ? 1 : 0);
					+	((!bWords) ? 1 : 0);
					
		iScore		=	(iRulesMet * 5)
					+	iCaps
					+	iDigits
					+	iLowers
					+	iSpecials
					+ 	iLength
					+	((!bWords ? 1 : 0) * ((iLength >= 16) ? 50 : -25));
					
		return(iScore);
}