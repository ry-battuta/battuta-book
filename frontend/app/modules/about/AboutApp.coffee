require "./show/AboutShow"

@App.module "AboutApp", () ->
  @startWithParent = false

  API =
    about: ->
      App.request 'about:show', App.mainRegion

  class AboutRouter extends Marionette.AppRouter
    appRoutes:
      'about'                                       : 'about'

  App.addInitializer ->
    new AboutRouter
      controller: API