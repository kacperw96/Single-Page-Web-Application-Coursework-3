
window.onload = loadMainPage;

function loadMainPage(){
	document.getElementById("container").innerHTML = 
'			<div><a href="http://localhost:8181"><img src="/public/logo.jpg" alt="mainLogo" ></a></div> ' +
' ' +
'			<!--BOX FOR IMAGE SEARCH AND SHARE --!> ' +
'			<div id="mainBox"> ' +
'				<br>' +
'				<form class="form-group col-md-12" action="/" enctype="multipart/form-data" name="myForm" method="post">'+
'					<div class="form-row" class="form-group col-md-12">' +
'						<div class="form-group col-md-6">' +
'							<label for="exampleInputFile">Image file input</label>' +
'							<input type="file" name="filetoupload" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" required>' +
'							<small id="fileHelp" class="form-text text-muted">Please choose the image file you would like to share.</small>' +
'						</div>' +
'						<div class="form-group col-md-4">' +
'					 		<label for="category">Enter image category</label>' +
'					  		<input type="text" name="category" class="form-control" required>' +
'						</div>' +
'						<div class="form-group col-sm-2">'+
'							<label for="exampleInputFile">&nbsp;</label><br>'+
'							<button onclick="move()" type="submit" value="Upload" class="btn btn-secondary btn-md btnMargin">Upload Image</button>' +	
'						</div>'+
'					</div>' +
'				</form>'+				
'				' +
'				<div class="input-group">' +
'					<div class="centerClass">' +
'						<button type="button" class="btn btn-secondary btn-lg btnMargin" onclick="display_all_images()">Load all Images</button>' +
'						<button type="button" class="btn btn-secondary btn-lg btnMargin" onclick="load_find_menu()">Find Image</button>' +
'					</div>' +
'				</div>' +
'			</div>' ;

}


function display_all_images(){
	document.getElementById("container").innerHTML = 
'			<div><a href="http://localhost:8181"><img src="/public/logo.jpg" alt="mainLogo" ></a></div> ' +
'				<div class="input-group">' +
'					<div class="centerClass">' +
'						<button type="button" class="btn btn-secondary btn-lg btnMargin" onclick="loadMainPage()">Share Image</button>' +
'						<button type="button" class="btn btn-secondary btn-lg btnMargin" onclick="load_find_menu()">Find Image</button>' +
'					</div>' +
'				</div>'+
'		<div class="centerClass">' +
'			<table id="images"></table>'+
'		</div>'+
'		<div id="myModal" class="modal">'+
'  			<span class="close">&times;</span>'+
'  			<img class="modal-content" id="img01">'+
'  			<div id="caption"></div>'+
'		</div>';


  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		
		
    var JSONarray = this.responseText;
	var Array = JSON.parse(JSONarray);

	var arr = Array.length/3;
	
	var no_of_rows = Math.ceil(arr);
	var counter = 0;
	var t = document.getElementById("images");
	
	for (var i = 0 ; i < no_of_rows; i++){			
		var newRow = t.insertRow(t.length);// create a new row
		for (var x = 0 ; x < 3; x++){			
			var cell = newRow.insertCell();
				cell.setAttribute("class", "Item");
				cell.innerHTML ='<img class="myImg" id="Img'+ counter +'" value="Img'+ counter +'" onclick="enlarge_image('+ counter +')" src='+ Array[counter].path +' width="450" height="300">';
			
			counter++;
			if(counter >= Array.length){						
				x = 3;
				i = no_of_rows;
			}//end if				
		}//end of cell
	}//end of no_of_rows	
	
	console.log(Array[0].path);
    }
  };
  xhttp.open("GET", "/getdata", true);
  xhttp.send();
}

function load_find_menu(){
	document.getElementById("container").innerHTML = 
'			<div><a href="http://localhost:8181"><img src="/public/logo.jpg" alt="mainLogo" ></a></div>'+
'			<div id="mainBox"> '+
'				<br>'+
'				<div class="form-row">'+
'					<div class="form-group col-md-10">'+
'					  <label for="inputState">Enter image category</label>'+
'					  <input type="text" id="inputState" class="form-control">'+
'					</div>'+
'					<div class="form-group col-md-2">'+
'						<label for="exampleInputFile">&nbsp;</label><br>'+
'						<button type="button" class="btn btn-secondary btn-md btnMargin" onclick="find_image_cat()">Find Image</button>'	+	
'					</div>'				+	
'				</div>'	+
'				<div id="warning" class="centerClass"></div>'+
'				'+
'				<div class="input-group">'+
'					<div class="centerClass">'+
'						<button type="button" class="btn btn-secondary btn-lg btnMargin" onclick="loadMainPage()">Share Images</button>'+
'						<button type="button" class="btn btn-secondary btn-lg btnMargin" onclick="display_all_images()">Load all Images</button>'+
'					</div>'+
'				</div>'+
'				<div class="centerClass">' +
'					<table id="images"></table>'+
'				</div>'+
'			</div>'+
'		<div id="myModal" class="modal">'+
'  			<span class="close">&times;</span>'+
'  			<img class="modal-content" id="img01">'+
'  			<div id="caption"></div>'+
'		</div>';
}

function find_image_cat(){
	document.getElementById("images").innerHTML="";
	document.getElementById("warning").innerHTML="";
	var option = document.getElementById("inputState").value;
	var _data = option;
	
	if(option != "" && option != null){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var JSONarray = this.responseText;
				console.log(JSONarray);
				
				if(JSONarray != "[]"){
					var Array = JSON.parse(JSONarray);

					var arr = Array.length/3;
					
					var no_of_rows = Math.ceil(arr);
					var counter = 0;
					var t = document.getElementById("images");
					
					for (var i = 0 ; i < no_of_rows; i++){			
						var newRow = t.insertRow(t.length);// create a new row
						for (var x = 0 ; x < 3; x++){			
							var cell = newRow.insertCell();
								cell.setAttribute("class", "Item");
								cell.innerHTML ='<img class="myImg" id="Img'+ counter +'"  onclick="enlarge_image('+ counter +')" src='+ Array[counter].path +' width="450" height="300">';
							
							counter++;
							if(counter >= Array.length){						
								x = 3;
								i = no_of_rows;
							}//end if				
						}//end of cell
					}//end of no_of_rows	
					
					console.log(Array[0].path);
				} else
					document.getElementById("warning").innerHTML="This category does not exist!";
			}
		};
		xhttp.open("POST", "/findcategory", true);
		xhttp.setRequestHeader('Content-Type', 'application/json')
		xhttp.send(JSON.stringify({ data: _data }));
	}else
		document.getElementById("warning").innerHTML="Search field can not be empty!";
	
}

function enlarge_image(imgNumber){
	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var img = document.getElementById('Img' + imgNumber);
	var modalImg = document.getElementById("img01");
	var captionText = document.getElementById("caption");
	img.onclick = function(){
		modal.style.display = "block";
		modalImg.src = this.src;
		captionText.innerHTML = this.alt;
	}

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() { 
		modal.style.display = "none";
	}
}
