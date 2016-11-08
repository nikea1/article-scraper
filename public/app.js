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

// alert("yep it's what you think")

$(document.body).on('click', '.article', function(){
	$('.comments').show()
	// console.log($(this).data('id'))
	$('#submitNote').attr('data-id', $(this).data('id'))
	
	$('#notes').empty().attr('data-artid', $(this).data('id')).append('<option/>')
	
	console.log($('#submitNote').data('id'))
	$.ajax(
		{
			url:'/article/'+ $(this).data('id'),
			method: 'GET'
		}).done(function(results){
			console.log(results)
			console.log(results.note)
			
			results.note.forEach(function(note){
				console.log(note)
				$('<option/>').text(note.title).val(note.body).attr('data-noteid', note._id).appendTo('#notes')
				
			})
			

			
		})

})

$('#notes').on('change', function(){
	// console.log("in art note", $(this).data('artid'))
	// console.log("in note", $(this).val());
	if($(this).val())
		$('#notedisplay').text($(this).val());
	else
		$('#notedisplay').text("");


})

$(document.body).on('click', '#submitNote', function(){

	
	if($(this).data('id') == ""){
		// console.log(typeof($(this).data('id')));
		// console.log($('#noteTitle').val())
		// console.log($('#noteBody').val())
		// console.log("no note")
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
		
	})
	$('#noteTitle').val("")
	$('#noteBody').val("")

})

$(document.body).on('click', '#deleteNote', function(){

	console.log($('#notes').data('artid'))
	console.log($('#notes option:selected').data('noteid'))

	if($('#notes option:selected').text() == "")
		return false;

	var artId = $('#notes').data('artid')
	var noteId = $('#notes option:selected').data('noteid')
	$.ajax({
		url:'/article/'+artId+'/'+noteId,
		method:'DELETE'
	}).done(function(results){
		console.log(results)
	})
})

