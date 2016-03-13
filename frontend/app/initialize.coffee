require 'application'
require './modules/modules'

# Initialize the application on DOM ready event.
$ ->

	# Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
	App.start()

