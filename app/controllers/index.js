var Book = require('../models/book')
var Category = require('../models/category')

//home page
exports.index = function(req, res){
	Category
		.find({})
		.populate({path: 'books', options: {limit: 10}})
		.exec(function(err, categories){

			if(err){
				console.log(err)
			}

			console.log(categories[0])

			res.render('index', {
				title: 'Homepage',
				categories: categories
			})

	})
}

//search page
exports.search = function(req, res){
	var catId = req.query.cat
	var q = req.query.q
	var page = parseInt(req.query.p)
	var displayAmount = 2
	var index = page * displayAmount

	if(catId){

		Category
			.find({_id: catId})
			.populate({
				path: 'books',
				select: 'book cover',
				options: {limit: displayAmount, skip: index}
			})
			.exec(function(err, categories){

				if(err){
					console.log(err)
				}

				var category = categories[0] || []
				var books = category.books || []

				res.render('results', {
					title: 'Results page',
					keyword: category.name,
					books: results
				})
		})

	}else{
		Book
			.find({title: new RegExp(q+'.*', 'i')})
			.exec(function(err, books){
				if (err)
					console.log(err)
				
				// var books = category.books || []

				res.render('results', {
					title: 'Results page',
					keyword: q,
					books: books
				})
			})
	}
}