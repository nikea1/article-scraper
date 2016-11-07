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


