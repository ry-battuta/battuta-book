require "./entities/PersonEntities"
require "./list/PersonList"
require "./create/PersonCreate"

@App.module "PersonApp", () ->
  @startWithParent = false

	API =
		list: ->
			App.request 'person:list', App.mainRegion
		create: ->
			App.request 'person:create', App.mainRegion

	class PersonRouter extends Marionette.AppRouter
		appRoutes:
			'home'                                        : 'list'
			'create'                                      : 'create'

	App.addInitializer ->
		new PersonRouter
			controller: API
