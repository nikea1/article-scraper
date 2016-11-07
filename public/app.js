//get all articles
$.ajax({url:'/article', method:'GET'})
	.done(function(results){
		// console.log(results);
		results.forEach(function(article){
			var div = $('<div>').addClass('article').data('id', article._id).appendTo('#articles')
			var title = $('<h2>').addClass('articleTitle').text(article.title).appendTo(div)
			var link = $('<p>').addClass('articleLink').text(article.link).css('font-style', 'italic').appendTo(div)
			

		})
		
	})


$(document.body).on('click', '.article', function(){
	$('#comments').show();
	console.log($(this).data('id'))
	$('#submitNote').attr('data-id', $(this).data('id'))

	console.log($('#submitNote').data('id'))
	$.ajax(
		{
			url:'/article/'+ $(this).data('id'),
			method: 'GET'
		}).done(function(results){
			console.log(results)
			$('#articleTitleNote').text(results.title)
			$('#notes').empty().append($('<option />'))
			

			
		})

})

$(document.body).on('click', '#submitNote', function(){

	
	if($(this).data('id') == ""){
		console.log(typeof($(this).data('id')));
		console.log($('#noteTitle').val())
		console.log($('#noteBody').val())
		console.log("no note")
		return false;
	}

	$.ajax({
		url:'/article/'+ $(this).data('id'),
		method: 'POST',
		data:
			{
				title: $('#noteTitle').val(),
				body: $('#noteBody').val()
			}
	}).done(function(results){
		console.log(results)
		$('#noteTitle').val("")
		$('#noteBody').val("")
	})
	return false

})

