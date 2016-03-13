@App.module "UserApp.SignIn", (SignIn, App, Backbone, Marionette, $, _) ->

  Controller =
    show: (region) =>
      user = App.request "user:entities:active"
      userView = new User
        model: user
      region.show userView

  class User extends Marionette.ItemView
    template: require './templates/signIn'
    events:
      'click #save'      : 'save',
    bindings:
      "#email"             : "email"
      "#password"          : "password"
    save: () =>
      @model.save()
    onRender: () =>
      @stickit()
    onDestroy: () =>
      @unstickit()


  App.reqres.setHandler "user:signIn", (region) -> Controller.show(region)