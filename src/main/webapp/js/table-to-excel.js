var tableToExcel = (function() {
	var uri = 'data:application/vnd.ms-excel;base64,', template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>', base64 = function(
			s) {
		var www = window.btoa(unescape(encodeURIComponent(s)));
		return www;
	}, format = function(s, c) {
		return s.replace(/{(\w+)}/g, function(m, p) {
			return c[p];
		})
	};
	return function(table, name) {
		if (!table.nodeType)
			var table = $('#' + table).clone();
		table.find('tr').css('width', 'auto');
		var str = table.innerHTML;
		var ctx = {
			worksheet : name || 'Worksheet',
			table : table.html()
		};
		// window.open(uri + base64(format(template, ctx)))
		var a = $("<a></a>");
		var s = $("<span></span>");
		s.appendTo(a);
		a.appendTo($("body"));
		a.hide();
		a.attr("href", uri + base64(format(template, ctx)));
		a.attr("download", name + ".xls");
		s.trigger("click");
		s.remove();
	}
})()
