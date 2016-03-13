# The application object.
@App = do(Marionette, Backbone) ->
  App = new Marionette.Application

  App.addRegions
    mainRegion:     "#main-region"
    headerRegion:   "#header-region"
    userRegion:     "#user-region"

  App.on "start", ->
    console.log("starting app")
    App.request "header:show", App.headerRegion
    App.request "person:list", App.mainRegion
    App.request "user:show", App.userRegion

    if Backbone.history
      console.log("enabling history")
      Backbone.history.start()

  App
