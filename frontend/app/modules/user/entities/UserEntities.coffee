@App.module "UserApp.Entites", (Entites, App, Backbone, Marionette, $, _) ->

  class User extends Backbone.Model
<<<<<<< HEAD
    url: "/api/v1/people/me"
=======
    url: "/api/v1/person/me"
>>>>>>> origin/master
    defaults:
      avatar: 'http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',

  API =
    active: () =>
      user = new User({
        in: true
      })
      user.fetch()
      user.on("change", () => console.log("User changed"))
      setUser = () =>
        user.set("in", true)
      setTimeout(setUser, 5000)

      user

  App.reqres.setHandler 'user:entities:active', () -> API.active()

