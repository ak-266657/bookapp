var Book = require('../models/book')
var Comment = require('../models/comment')
var Category = require('../models/category')
var _ = require('underscore')

//detail page
exports.detail = function(req, res){
	var id = req.params.id

	Book.findById(id, function(err, book){
		if(err){
			console.log(err)
		}

		Comment
			.find({book: id})
			.populate('from', 'name')
			.populate('reply.from reply.to', 'name')
			.exec(function(err, comment){
				res.render('detail', {
					title: book.title,
					book: book,
					comments: comment
				})
			})
	})
}

//new movie page and request
exports.new = function(req, res){
	Category.find({}, function(err, categories){
		res.render('admin', {
			title: 'Book Management',
			categories: categories,
			book: {}		
		})
	})
}

//update movie page
exports.update = function(req, res){
	var id = req.params.id

	if (id){
		Book.findById(id, function(err, book){
			if(err){
				console.log(err)
			}
				
			Category.find({}, function(err,categories){
				res.render('admin', {
					title: 'Book Information Update',
					book: book,
					category: category
				})
			})
		})
	}
}

exports.save = function(req, res){
	var id = req.body.book._id
	var bookObj = req.body.book
	var _book

	if(id){
		Book.findById(id, function(err, book){
			if(err){
				console.log(err)
			}

			_book = _.extend(book, bookObj)
			_book.save(function(err, book){
				if(err){
					console.log(err)
				}

				res.redirect('/book/' + book._id)
			})
		})
	}else{
		_book = new Book(bookObj)

		var categoryId = bookObj.category
		var categoryName = bookObj.categoryName

		_book.save(function(err, book){
			if(err){
				console.log(err)
			}

			if(categoryId){
				Category.findById(categoryId, function(err, category){
					category.books.push(book._id)

					category.save(function(err, category){
						res.redirect('/book/' + book._id)
					})
				})
			}
			else if(categoryName){
				var category = new Category({
					name: categoryName,
					books: [book._id]
				})

				category.save(function(err, category){
					book.category = category._id
					book.save(function(err, book){
						res.redirect('/book/' + book._id)
					})
				})
			}
		})
	}
}

//movie list
exports.list = function(req, res){
	Book.fetch(function(err, book){
		if(err){
			console.log(err)
		}

		res.render('list', {
			title: 'Homepage',
			books: books
		})
	})
}

//remove a movie call
exports.del = function(req, res){
	var id = req.params.id

	if(id){
		Book.remove({_id: id}, function(err, book){
			if(err){
				console.log(err)
			}
			else{
				res.json({success: 1})
			}
		})
	}
}