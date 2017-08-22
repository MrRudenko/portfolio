$(window).on('load', function () {
	//alert('Ваша версия jQuery ' + jQuery.fn.jquery);
	var calc = $('.calculator');
	var calc_disp = calc.find(".calc_disp");
	var calc_button = calc.find('.calc_button');
	var calc_key = calc.find('.calc_key');
	var calc_clear = calc.find('.calc_clear');
	var calc_eq = calc.find('.calc_eq');
	var calc_backspace = calc.find('.calc_backspace');

	calc_button.each(function () { //naming of buttons
		var BName = $(this).attr('value');
		$(this).text(BName);
	});

	calc_key.on('click', function () { //giving value of key to display
		calc_disp.val(calc_disp.val() + $(this).attr('value'));
	});

	calc_backspace.on('click', function () {
		calc_disp.val(calc_disp.val().substring(0, calc_disp.val().length - 1));
	});

	calc_clear.on('click', function () {
		calc_disp.val("");
	});

	calc_eq.on('click', function () { //pressing "="
		//calc_disp.val(eval(calc_disp.val()));
		if (checkSymbol(calc_disp) == true) {
			var was_calc_disp;

			var sum_or_diff = function (sub, a, sign, b) {
				console.log(sub + " sub sumordiff")
				console.log(sign + " sign sumordiff")
				console.log(a + "  " + b + " a b sumordiff")
				return sign == "-" ? a - b : +a + +b;
			};

			var mult_or_div = function (sub, a, sign, b) {
				return sign == "*" ? a * b : a / b;
				console.log(sub + " sub multordiv")
				console.log(sing + " sign multordiv")
				console.log(a + "  " + b + "a b multordiv")
			};

			var match_mult_div = /(-?[\d\.]+)\s*([\*\/])\s*(-?[\d\.]+)/g;
			var match_sum_diff = /(-?[\d\.]+)\s*([\+-])\s*(-?[\d\.]+)/g;

			var get_value = function (sub, exp) {
				while (match_mult_div.test(exp))
					exp = exp.replace(match_mult_div, mult_or_div);
				while (match_sum_diff.test(exp))
					exp = exp.replace(match_sum_diff, sum_or_diff);
				console.log(exp + "exp");
				calc_disp.val(exp);

				return exp;
			};

						while (calc_disp.val().indexOf("(") !== -1) // убираем скобки
							calc_disp.val(calc_disp.val().replace(/\(([^\(\)]*)\)/g, get_value));
						return get_value("", calc_disp.val());
		}
	});
});

//Checkin for invalid symbols
function checkSymbol(calc_disp) {
	var calc_disp = calc_disp.val();
	var dop = "0123456789/*-+.()"; //enabled symbols
	for (var i = 0; i < calc_disp.length; i++) {
		//console.log(dop.indexOf(calc_disp[i]) + "   dop indexof calcdisp[i]");
		if (dop.indexOf(calc_disp[i]) == -1) {
			alert("Invalid number!");
			return (false);
			break;
		}
	}
	return (true);
}