require './entities/UserEntities'
require './show/UserShow'
require './signIn/UserSignIn'

@App.module "UserApp", () ->
  @startWithParent = false

  API =
    signIn: ->
      App.request 'user:signIn', App.mainRegion

  class UserRouter extends Marionette.AppRouter
    appRoutes:
      'signIn'                                      : 'signIn'

  App.addInitializer ->
    new UserRouter
      controller: API

