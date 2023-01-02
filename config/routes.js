var Index = require('../app/controllers/index')
var Book = require('../app/controllers/book')
var User = require('../app/controllers/user')
var Comment = require('../app/controllers/comment')
var Category = require('../app/controllers/category')
var _ = require('underscore')


module.exports = function(app){

	//pre handle user
	app.use(function(req,res, next){
		var _user = req.session.user

		app.locals.user = _user

		return next()
	})

	//home page
	app.get('/', Index.index)

	// User
	app.post('/user/signup', User.signup)
	app.post('/user/signin', User.signin)
	app.get('/logout', User.logout)
	app.get('/signin', User.showSignUp)
	app.get('/signup', User.showSignIn)
	app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)

	// Movie
	app.get('/book/:id', Book.detail)
	app.get('/admin/book/update/:id', User.signinRequired, User.adminRequired,  Book.update)
	app.get('/admin/book/new', User.signinRequired, User.adminRequired,  Book.new)
	app.post('/admin/book', User.signinRequired, User.adminRequired,  Book.save)
	app.get('/admin/book/list', User.signinRequired, User.adminRequired,  Book.list)
	app.delete('/admin/book/remove/:id', User.signinRequired, User.adminRequired,  Book.del)

	// Comment
	app.post('/user/comment', User.signinRequired, Comment.save)
	
	// Category
	app.get('/admin/category/new', User.signinRequired, User.adminRequired,  Category.new)
	app.post('/admin/category', User.signinRequired, User.adminRequired,  Category.save)
	app.get('/admin/category/list', User.signinRequired, User.adminRequired,  Category.list)

	// results
	app.get('/results', Index.search)
}