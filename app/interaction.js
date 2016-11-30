$(document).ready(function(){
	
	//setTimeout(function() { $("body").removeClass("loading"); }, 1000);	
	
	var section = "home";
	var isScrolling, isOpening = false;
	var projetouvert = false;
	var position, op, scrollto, screencount, numprojet = 0;
	var hgrid = 2000;
	var lastClass;
	// var projectsList = ["maram", "zoo", "cgi", "antoinelestage", "tokkun", "soulofthedeadtree", "pmmt", "dixon", "artspire", "departementevenement", "lerecyclagepasapas", "inlogia", "witchatt", "antro", "origami", "legrandbal"];
	
	$.fn.isOnScreen = function(){
		var element = this.get(0);
		var bounds = element.getBoundingClientRect();
		return bounds.top < window.innerHeight-300 && bounds.bottom > 0;
	}
	
	$(window).scroll(function (event) {
		var scrollP = $(window).scrollTop();
		position = -scrollP;
		op = 1 - (scrollP/200);
		$(".previous, .next").css('top', position);
		$(".previous").css('margin-left', position);
		$(".next").css('margin-right', position);
		$("#projet").css('top', position/2);
		$("#projet_intro").css('opacity', op);
		if (isOpening == true ) {
			event.preventDefault();
		}
		else {
			if ($(window).width() >= 960) {  
				if (scrollP > 220 && scrollP < $(window).height()-60 && section == "home") {
					$("nav").css('top', $(window).height()-scrollP+220-$(window).height()*0.2);
					$(".menuworks").addClass("actif");
					$("nav").addClass("enter");
				}
				if (scrollP > $(window).height()-60 || section != "home") {
					$("nav").addClass("navtop");
				}
				if (scrollP < $(window).height()-60 && section == "home") {
					$("nav").removeClass("navtop");
				}
				if (scrollP >= $(window).height() && section == "home") {
					$("#grid_bg").addClass("fx");
				}
				if (scrollP < $(window).height() && section == "home") {
					$("#grid_bg").removeClass("fx");
				}
				if (scrollP <= 220 && section == "home") {
					$("nav").removeClass("enter");
					$(".menuworks").removeClass("actif");
					$("nav").css('top', "80%");
				}
				if((scrollP + $(window).height() > $(document).height() - 80) && $(document).height() > 1500) {
			    	$("footer").addClass("visible");
			    }
			    else {
			    	if ($("footer").hasClass("visible")) {
			    		$("footer").removeClass("visible");
			    	}
			    }
			}
			if ($(window).width() < 960) {  
				if((scrollP + $(window).height() > $(document).height() - 80) && $(document).height() > 1500) {
			    	$("footer").addClass("visible");
			    }
			    else {
			    	if ($("footer").hasClass("visible")) {
			    		$("footer").removeClass("visible");
			    	}
			    }
			}

			if (section == "projet") {
				screencount = $('#screenshots').children().size();
				for (var sc = 1; sc<=screencount; sc++) {
					if ( $("#screen" + sc).isOnScreen() ) {
						$("#screen" + sc).addClass("display");
					}
				}
			}
			if (section == "profile") {
				if (scrollP < 700 && ($(window).width() >= 960)) { $('#profile .image img').css("marginTop", -scrollP/2) }
				for (var cc = 1; cc<=4; cc++) {
					if ( $(".city" + cc).isOnScreen() ) {
						$(".city" + cc).addClass("display");
					}
				}
			}
			if (section == "login") {
				if (scrollP < 700 && ($(window).width() >= 960)) { $('#login .image img').css("marginTop", -scrollP/2) }
			}
			if (section == "register") {
				if (scrollP < 700 && ($(window).width() >= 960)) { $('#register .image img').css("marginTop", -scrollP/2) }
			}
		}
	});
	
	bgsize();
	$(window).resize(function() { bgsize(); });
	
	function bgsize() {
		$(".previous_bg").css("width", $(window).width());
		$(".previous_bg").css("height", $(window).height());
		$(".next_bg").css("width", $(window).width());
		$(".next_bg").css("height", $(window).height());
		$(".perspective").css("height", $(".perspective").css("width"));
		if ($(window).width() < 960 ) { hgrid = $("#grid .content").height() + 400; }
        else { 
        	if ($(window).width() > 1786) { hgrid = (409*8)*(1786/1440) + 600; }
        	else { hgrid = (409*8)*($(window).width()/1440) + 600; }
        }
		$("#grid").css("height", hgrid);
	}

	$(".item").mouseover(function(){
		if (isOpening == false) {
			if ($("#grid_bg").hasClass("fx")) { $("#grid_bg").attr("class", "fx"); }
			else { $("#grid_bg").attr("class", ""); }
			lastClass = $(this).attr('class').split(' ').pop();
			$("#grid_bg").addClass(lastClass);
		}
	});
	
	$(".item").click(function(){
		if (isOpening == false) {
			if (section == "home") {
				if ($(window).scrollTop() < $(window).height()) {
					$("html, body").animate( { scrollTop: $(window).height() }, 500 );
					$("nav").addClass("navtop");
				}
			}
			lastClass = $(this).attr('class').split(' ').pop();
			project(lastClass);
			console.log(lastClass);
			isOpening = isScrolling = projetouvert = true;
			section = "";
			setTimeout(function(){  
				$("#grid").addClass("fade"); 
				if ($(window).width() >= 960) {  
					$("nav").addClass("enter");
				} 
			}, 500);
		}
	});

	function project(projectname) {
		setTimeout(function(){ 
			$("body, .previous, .next").addClass(projectname); 
			$("#projet").load("/projets/"+projectname+".html", function(){ console.log("ok"); openprojet() }); 
		}, 1000);
	}

	function openprojet() {
		setTimeout(function(){  $("nav").addClass("navtop"); }, 400);
		setTimeout(function(){ 
			$(window).scrollTop(0);
			$("body").addClass("projet"); 
			$("body").addClass("nav");
			isScrolling = false;
			section = "projet";
		}, 1000);
		setTimeout(function(){ isOpening = false; }, 2000);
	};
	
	$(".previous").click(function(){
		if (isOpening == false) {
			$("html, body").animate( { scrollTop: 0 }, 800 );
			isOpening = isScrolling = true;
			$("#projet_intro, #projet_content").addClass("transition");
			setTimeout(function(){ $("body").removeClass("projet"); }, 800);
			lastClass = $(this).attr('class').split(' ').pop();
			$(this).addClass("transition");
			for (var i = 0; i < projectsList.length; i++) { 
			    if (lastClass == projectsList[i]) {
			    	console.log(i);
			    	if (i == 0) { 
			    		setTimeout(function(){  
				    		$("body").attr("class", "projet nav "+projectsList[15]);
				    		$(".previous").attr("class", "previous transition "+projectsList[15]);
				    		$(".next").attr("class", "next "+projectsList[15]);
				    		$("#projet").load("/projets/"+projectsList[15]+".html", function(){ console.log("ok"); openprojet() }); 
			    		}, 2000);
			    	} 
			    	else { 
			    		numprojet = i-1; 
			    		setTimeout(function(){  
			    			$("body").attr("class", "projet nav "+projectsList[numprojet]); 
			    			$(".previous").attr("class", "previous transition "+projectsList[numprojet]);
			    			$(".next").attr("class", "next "+projectsList[numprojet]);
			    			$("#projet").load("/projets/"+projectsList[numprojet]+".html", function(){ console.log("ok"); openprojet() }); 
			    		}, 2000);
			    	}	
			    }
			}
			setTimeout(function(){ $(".previous, #projet_intro, #projet_content").removeClass("transition");  }, 2000);
			setTimeout(function(){ isOpening = isScrolling = false; }, 2800);
		}
	});
	
	$(".next").click(function(){
		if (isOpening == false) {
			$("html, body").animate( { scrollTop: 0 }, 800 );
			isOpening = isScrolling = true;
			$("#projet_intro, #projet_content").addClass("transition");
			setTimeout(function(){ $("body").removeClass("projet"); }, 800);
			$(".previous").css( "zIndex", 5);
			lastClass = $(this).attr('class').split(' ').pop();
			$(this).addClass("transition");
			for (var i = 0; i < projectsList.length; i++) { 
			    if (lastClass == projectsList[i]) {
			    	console.log(i);
			    	if (i == 15) { 
			    		setTimeout(function(){  
				    		$("body").attr("class", "projet nav "+projectsList[0]);
				    		$(".previous").attr("class", "previous "+projectsList[0]);
				    		$(".next").attr("class", "next transition "+projectsList[0]);
				    		$("#projet").load("/projets/"+projectsList[0]+".html", function(){ console.log("ok"); openprojet() }); 
			    		}, 2000);
			    	} 
			    	else { 
			    		numprojet = i+1; 
			    		setTimeout(function(){  
			    			$("body").attr("class", "projet nav "+projectsList[numprojet]); 
			    			$(".previous").attr("class", "previous "+projectsList[numprojet]);
			    			$(".next").attr("class", "next transition "+projectsList[numprojet]);
			    			$("#projet").load("/projets/"+projectsList[numprojet]+".html", function(){ console.log("ok"); openprojet() }); 
			    		}, 2000);
			    	}	
			    }
			}
			setTimeout(function(){ 
				$(".next, #projet_intro, #projet_content").removeClass("transition"); 
				$(".previous").css( "zIndex", 4); }, 2000);
			setTimeout(function(){ isOpening = isScrolling = false; }, 2800);
		}
	});
	
	$("#logosmall, .menuworks").click(function(){
		closenav(); // mobile
		if ((section == "projet" && isOpening == false) || (projetouvert == true)) { 
			closeproject(""); 
			$("html, body").animate( { scrollTop: 0 }, 500 ); 
			if ($(this).hasClass("menuworks")) { setTimeout(function(){ $(window).scrollTop($(window).height()); }, 1900); }
			else { 
				$("#grid_bg").removeClass("fx");
				setTimeout(function(){ $("nav").removeClass("enter navtop"); }, 2300);
				setTimeout(function(){ $("nav").css("top", "80%"); }, 2200);
			};
			setTimeout(function(){ section = "home";isOpening = false; }, 3000);
		}
		if (section == "profile" && isOpening == false) { 
			closeabout();
			$("#grid").removeClass("fade");
			//$("html, body").animate( { scrollTop: 0 }, 500 ); 
			if ($(this).hasClass("menuworks")) { setTimeout(function(){ $(window).scrollTop($(window).height()); }, 1000); }
			else {
				$("html, body").animate( { scrollTop: 0 }, 500 ); 
				$("#grid_bg").removeClass("fx");
				setTimeout(function(){ $("nav").css("top", "80%"); }, 2000);
				setTimeout(function(){ $("nav").removeClass("enter navtop"); }, 2300); 
			};
			setTimeout(function(){ section = "home";isOpening = false;}, 2000);
		}
		if (section == "login" && isOpening == false) { 
			closeabout();
			$("#grid").removeClass("fade");
			//$("html, body").animate( { scrollTop: 0 }, 500 ); 
			if ($(this).hasClass("menuworks")) { setTimeout(function(){ $(window).scrollTop($(window).height()); }, 1000); }
			else {
				$("html, body").animate( { scrollTop: 0 }, 500 ); 
				$("#grid_bg").removeClass("fx");
				setTimeout(function(){ $("nav").css("top", "80%"); }, 2000);
				setTimeout(function(){ $("nav").removeClass("enter navtop"); }, 2300); 
			};
			setTimeout(function(){ section = "home";isOpening = false;}, 2000);
		}
		if (section == "register" && isOpening == false) {	
			closecontact(); 
			$("#grid").removeClass("fade");
			//$("html, body").animate( { scrollTop: 0 }, 500 ); 
			if ($(this).hasClass("menuworks")) { setTimeout(function(){ $(window).scrollTop($(window).height()); }, 1000); }
			else { 
				$("html, body").animate( { scrollTop: 0 }, 500 ); 
				$("#grid_bg").removeClass("fx");
				setTimeout(function(){ $("nav").css("top", "80%"); }, 2000);
				setTimeout(function(){ $("nav").removeClass("enter navtop"); }, 2300); 
			};
			setTimeout(function(){ section = "home";isOpening = false; }, 2000);
		}
		if (section == "home") {
			if ($(this).hasClass("menuworks")) {
				isScrolling = true;
				$("html, body").animate( { scrollTop: $(window).height() }, 500 );
				$(".menuworks").addClass("actif");
				section = "home";
				if ($(window).width() >= 960) { $("nav").addClass("enter") };
				setTimeout(function(){ isScrolling = false }, 1500);
			}
			else {
				isScrolling = true;
				$("html, body").animate( { scrollTop: 0 }, 1500 );
				$(".menuworks").removeClass("actif");
				section = "home";
				setTimeout(function(){ isScrolling = false }, 1500);
			}
		}
		$(".menu").removeClass("actif");
		if ($(this).hasClass("menuworks")) { $(".menuworks").addClass("actif"); };
	});
	
	function closeproject (savedclass) {
		$("body").addClass("closing"); 
		setTimeout(function(){ $("body").removeClass("projet nav"); }, 1000);
		isOpening = isScrolling = true;
		setTimeout(function(){ 
			isOpening = isScrolling = false;
			if (savedclass) { section = savedclass; }
			else { $("#grid").removeClass("fade"); }
		}, 1900);
		setTimeout(function(){ 
			$("body").attr("class", savedclass);
			projetouvert = false;
		}, 3000);
	}
	
	function closeabout() {
		isOpening = true;
		$("body").removeClass("profile"); 
		setTimeout(function(){ 
			$("#profile").addClass("pfix");  
		}, 1000);
	}

	function closecontact() {
		isOpening = true;
		$("body").removeClass("register"); 
		setTimeout(function(){ 
			$("#login").addClass("pfix");  
		}, 1000);
	}
	
	function closecontact() {
		isOpening = true;
		$("body").removeClass("register"); 
		setTimeout(function(){ 
			$("#register").addClass("pfix");  
		}, 1000);
	}

	$("#openmenu").click(function(){
		$("nav").addClass("visible");
	});
	
	$("#close").click(function(){
		closenav();
	});
	
	function closenav() {
		$("nav").addClass("closing"); 
		setTimeout(function(){ 
			$("nav").removeClass("visible closing"); 
		}, 600);
	};
	
	// $(".menulogin").click(function(){
	// 	window.open("http://www.art-spire.com");
	// });

	$(document).on("click","#viewcasestudy",function(e){
		scrollto = $("#screenshots").offset().top - $("#projet_content").offset().top + $("#projet_content").height();
		console.log(scrollto);
		$("html, body").animate( { scrollTop: $("#screenshots").offset().top - $(window).height()/2 }, 400 );
	});

	$(document).on("click","#backtotop",function(e){
		$("html, body").animate( { scrollTop: 0 }, 600 );
	});
	
	$(".menuprofile").click(function(){
		if (isOpening == false) {
			isOpening = true;
			closenav(); // mobile
			if (projetouvert == true) { closeproject("profile"); }
			if (section == "register") { 
				$("#register").css('z-index', 9);
				setTimeout(function() { closecontact(); }, 800); 
			}
			section = "profile";
			$("#profile").css('z-index', 10);
			$("body").addClass("profile"); 
			isScrolling = true;
			if ($(window).width() >= 960) { $("nav").addClass("navtop"); };
			$(".menu").removeClass("actif");
			$(".menuprofile").addClass("actif");
			setTimeout(function() { 
				$("html, body").animate( { scrollTop: 0 }, 0 ); 
				$("#profile").removeClass("pfix"); 
				$("#grid, #grid_bg").addClass("enter");
				}, 500);	
			setTimeout(function() { 
				if ($(window).width() >= 960) {  
					$("nav").addClass("enter");
				} 
				$("#grid").addClass("fade"); 
			}, 1000);	
			setTimeout(function() { isScrolling = isOpening = false; }, 2000);	
		}
	});
	
	$(".menucontact, .contactme").click(function(){
		if (isOpening == false) {
			isOpening = true;
			closenav(); // mobile
			if (projetouvert == true) { closeproject("register"); }
			if (section == "profile") { 
				$("#profile").css('z-index', 9);
				setTimeout(function() { closeabout(); }, 800); 
			}
			section = "register";
			$("#register").css('z-index', 10);
			$("body").addClass("register"); 
			isScrolling = true;
			if ($(window).width() >= 960) { $("nav").addClass("navtop"); };
			$(".menu").removeClass("actif");
			$(".menucontact").addClass("actif");
			setTimeout(function() {  
				$("html, body").animate( { scrollTop: 0 }, 0 ); 
				$("#register").removeClass("pfix"); 
				$("#grid, #grid_bg").addClass("enter");
				}, 500);	
			setTimeout(function() { 
				if ($(window).width() >= 960) {  
					$("nav").addClass("enter"); 
				} 
				$("#grid").addClass("fade"); 
			}, 1000);	
			setTimeout(function() { isScrolling = isOpening = false; }, 2000);	
		}
	});
	
});

	$(".menulogin").click(function(){
		if (isOpening == false) {
			isOpening = true;
			closenav(); // mobile
			if (projetouvert == true) { closeproject("profile"); }
			if (section == "register") { 
				$("#register").css('z-index', 9);
				setTimeout(function() { closecontact(); }, 800); 
			}
			section = "login";
			$("#login").css('z-index', 10);
			$("body").addClass("login"); 
			isScrolling = true;
			if ($(window).width() >= 960) { $("nav").addClass("navtop"); };
			$(".menu").removeClass("actif");
			$(".menulogin").addClass("actif");
			setTimeout(function() { 
				$("html, body").animate( { scrollTop: 0 }, 0 ); 
				$("#login").removeClass("pfix"); 
				$("#grid, #grid_bg").addClass("enter");
				}, 500);	
			setTimeout(function() { 
				if ($(window).width() >= 960) {  
					$("nav").addClass("enter");
				} 
				$("#grid").addClass("fade"); 
			}, 1000);	
			setTimeout(function() { isScrolling = isOpening = false; }, 2000);	
		}
	});

$(window).load(
    function() {
    	if ($(window).width() < 960 ) { hgrid = $("#grid .content").height() + 400; }
        else { 
        	if ($(window).width() > 1786) { hgrid = (409*8)*(1786/1440) + 600; }
        	else { hgrid = (409*8)*($(window).width()/1440) + 600; }
        }
        $("#grid").css("height", hgrid);
    
	    if ($(window).scrollTop() > $(window).height()) {
	    	$("nav").addClass("enter");
	    }

    });

