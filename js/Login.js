class Login
{
	constructor(sURL, sUsername, sPassword)
	{
		this.msURL = sURL;
		this.msUserName = sUsername;
		this.mspassword = sPassword;
	}
	
	getJQuery()
	{
		
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
							.html("Login"))
							.click(function()
							{
								var dlgLogin = $("<dialog></dialog>",	{	id:		"dlgLogin" });
								
								var frmLogin = $("<form></form>",	{	method:	"dialog"	});
								
								dlgLogin.append(frmLogin);
								
								var tblLogin = $("<table></table>");
								var tfoot = $("<tfoot></tfoot>");
								var tbody = $("<tbody></tbody>");
								var trUsername = $("<tr></tr>");
								var trPassword = $("<tr></tr>");
								var trButtons = $("<tr></tr>");
								var tdUserNameLabel = $("<td></td>");
								var tdUserNameField = $("<td></td>");
								var tdPasswordLabel = $("<td></td>");
								var tdPasswordField = $("<td></td>");
								var thSignupButton = $("<th></th>");
								var thCancelButton = $("<th></th>");
								var thLoginButton = $("<th></th>");
								
								var lblUsername = $("<label></label>",	{	accesskey:	"u"	
																		,	"for":		"txtLoginUsername"
																		});
								var spanUsername = $("<span></span>").html("U");
								
								lblUsername.append(spanUsername).append("serName:");
								
								var inputUsername = $("<input />",	{	id:			"txtLoginUsername"
																	,	maxlength:	"255"
																	,	type:		"text"
																	});
																	
								tdUserNameLabel.append(lblUsername);
								tdUserNameField.append(inputUsername);
								trUsername.append(tdUserNameLabel).append(tdUserNameField);
								
								var lblPassword = $("<label></label>",	{	accesskey:	"p"	
																		,	"for":		"txtLoginPassword"
																		});
								var spanPassword = $("<span></span>").html("P");
								
								lblPassword.append(spanPassword).append("assword:");
								
								var inputPassword = $("<input />",	{	id:				"txtLoginPassword"
																	,	maxlength:		"255"
																	,	type:			"password"
																	});
																	
								tdPasswordLabel.append(lblPassword);
								tdPasswordField.append(inputPassword);
								trPassword.append(tdPasswordLabel).append(tdPasswordField);
								
								var btnSignup =
									$("<button></button>",	{	accesskey:	"s"
															,	id:			"btnSignup"
															});
								btnSignup
									.append($("<span></span>").html("S"))
									.append("ignup...");
									
								thSignupButton.append(btnSignup);
								
								var btnCancel =
									$("<button></button>",	{	accesskey:	"c"
															,	id:			"btnCancel"
															});
								btnCancel
									.append($("<span></span>").html("C"))
									.append("ancel");
									
								thCancelButton.append(btnCancel);
										
								var btnLogin =
									$("<button></button>",	{	accesskey:	"l"
															,	id:			"btnLogin"
															});
								btnLogin
									.append($("<span></span>").html("L"))
									.append("ogin");
									
								thLoginButton.append(btnLogin);
										
								trButtons.append(thSignupButton).append(thCancelButton).append(thLoginButton);
								
								tfoot.append(trButtons);
								tbody.append(trUsername).append(trPassword);
								tblLogin.append(tfoot).append(tbody);
								frmLogin.append(tblLogin);
								
								dlgLogin.append(frmLogin);
								
								$("body").append(dlgLogin);
								
								$("#dlgLogin")[0].showModal();
							}));
	}
}