@App.module "UserApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  Controller =
    show: (region) =>
      user = App.request "user:entities:active"
      userView = new User
        model: user
      region.show userView

  class User extends Marionette.ItemView
    template: (json) =>
      template = require './templates/signIn'
      if (@model.get('in'))
        template = require './templates/signOut'
      template(json)
    tagName: 'li'
    modelEvents:
      'change' : 'render'

  App.reqres.setHandler "user:show", (region) -> Controller.show(region)