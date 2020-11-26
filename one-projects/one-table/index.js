
/// fetch data.json - START

fetch("data.json")
	.then(res => res.json())
	.then((list) => {
	buildTable(list);
  $("#search-input[placeholder]").on("keyup", function() {
    var searchInput = $(this).val().toLowerCase();
    var filteredMyData = searchTable(searchInput, list);
    buildTable(filteredMyData);
  })

  $(".badge").on("click", function() {
    var filterVal = $(this).text().toLowerCase();
    $("input[id='search-input'][placeholder]").val(" ");
    $("input[id='search-input'][placeholder]").val(filterVal);
    buildTable(filterTag(filterVal, list));
  })

  $("#clear-btn").on("click", function() {
    $("input[id='search-input']").val("");
    buildTable(searchTable("", list));
  })

})


/// fetch data.json - End


function buildTable(data){
  	var table = $("#myTable"); //get table
 	 table.html(""); // empty table
	  var results = [];
	  for (i = 0; i < data.length; i++) {
	  	var row = `<tr>
	                <td>${data[i].DESCRIPTION}</td>
	                <td>${data[i].SHORTCUT}</td>
	              </tr>`
	    results.push(row);
	    table.html(results)
	}
}


function searchTable(input, data) {
  var res = [];
  for (i = 0; i < data.length; i++) {
    if (data[i].DESCRIPTION.toLowerCase().includes(input)) {
      res.push(data[i]);
    }
  }
  return res;
}

function filterTag(input, data) {
  var res = [];
  for (i = 0; i < data.length; i++) {
    if (data[i].TAGS.toLowerCase().includes(input)) {
      res.push(data[i]);
    }
  }
  return res;
}
