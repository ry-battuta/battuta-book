(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("application", function(exports, require, module) {
this.App = (function(Marionette, Backbone) {
  var App;
  App = new Marionette.Application;
  App.addRegions({
    mainRegion: "#main-region",
    headerRegion: "#header-region",
    userRegion: "#user-region"
  });
  App.on("start", function() {
    console.log("starting app");
    App.request("header:show", App.headerRegion);
    App.request("person:list", App.mainRegion);
    App.request("user:show", App.userRegion);
    if (Backbone.history) {
      console.log("enabling history");
      return Backbone.history.start();
    }
  });
  return App;
})(Marionette, Backbone);
});

;require.register("initialize", function(exports, require, module) {
require('application');

require('./modules/modules');

$(function() {
  return App.start();
});
});

;require.register("modules/about/AboutApp", function(exports, require, module) {
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

require("./show/AboutShow");

this.App.module("AboutApp", function() {
  var API, AboutRouter;
  this.startWithParent = false;
  API = {
    about: function() {
      return App.request('about:show', App.mainRegion);
    }
  };
  AboutRouter = (function(superClass) {
    extend(AboutRouter, superClass);

    function AboutRouter() {
      return AboutRouter.__super__.constructor.apply(this, arguments);
    }

    AboutRouter.prototype.appRoutes = {
      'about': 'about'
    };

    return AboutRouter;

  })(Marionette.AppRouter);
  return App.addInitializer(function() {
    return new AboutRouter({
      controller: API
    });
  });
});
});

;require.register("modules/about/show/AboutShow", function(exports, require, module) {
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.App.module("AboutApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  var About, Controller;
  Controller = {
    show: function(region) {
      var aboutView;
      aboutView = new About();
      return region.show(aboutView);
    }
  };
  About = (function(superClass) {
    extend(About, superClass);

    function About() {
      return About.__super__.constructor.apply(this, arguments);
    }

    About.prototype.template = require("./templates/about");

    return About;

  })(Marionette.ItemView);
  return App.reqres.setHandler('about:show', function(region) {
    return Controller.show(region);
  });
});
});

;require.register("modules/about/show/templates/about", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "I'm about\n\n\n\n<h1>I'm about</h1>\n\n<h1>I'm about</h1>\n\n\nI'm about\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("modules/header/HeaderApp", function(exports, require, module) {
require("./show/HeaderShow");

this.App.module("HeaderApp", function() {
  return this.startWithParent = false;
});
});

;require.register("modules/header/show/HeaderShow", function(exports, require, module) {
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.App.module("HeaderApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  var Controller, Header;
  Controller = {
    show: function(region) {
      var headerView;
      headerView = new Header;
      return region.show(headerView);
    }
  };
  Header = (function(superClass) {
    extend(Header, superClass);

    function Header() {
      return Header.__super__.constructor.apply(this, arguments);
    }

    Header.prototype.template = require("./templates/header");

    return Header;

  })(Marionette.ItemView);
  return App.reqres.setHandler('header:show', function(region) {
    return Controller.show(region);
  });
});
});

;require.register("modules/header/show/templates/header", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"nav navbar-nav\">\n    <li><a href=\"#home\"><span class=\"fa fa-home\"></span> Home</a></li>\n    <li><a href=\"#about\"><span class=\"fa fa-info\"></span> About</a></li>\n</ul>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("modules/modules", function(exports, require, module) {
require('./about/AboutApp');

require('./user/UserApp');

require('./header/HeaderApp');

require('./person/PersonApp');
});

;require.register("modules/person/PersonApp", function(exports, require, module) {
var API, PersonRouter,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

require("./entities/PersonEntities");

require("./list/PersonList");

require("./create/PersonCreate");

this.App.module("PersonApp", function() {
  return this.startWithParent = false;
});

API = {
  list: function() {
    return App.request('person:list', App.mainRegion);
  },
  create: function() {
    return App.request('person:create', App.mainRegion);
  }
};

PersonRouter = (function(superClass) {
  extend(PersonRouter, superClass);

  function PersonRouter() {
    return PersonRouter.__super__.constructor.apply(this, arguments);
  }

  PersonRouter.prototype.appRoutes = {
    'home': 'list',
    'create': 'create'
  };

  return PersonRouter;

})(Marionette.AppRouter);

App.addInitializer(function() {
  return new PersonRouter({
    controller: API
  });
});
});

;require.register("modules/person/create/PersonCreate", function(exports, require, module) {
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.App.module("PersonApp.New", function(New, App, Backbone, Marionette, $, _) {
  var Controller, Person;
  Controller = {
    "new": function(region) {
      var person, personView;
      console.log("person:create called");
      person = App.request("person:entities:create");
      personView = new Person({
        model: person
      });
      return region.show(personView);
    }
  };
  Person = (function(superClass) {
    extend(Person, superClass);

    function Person() {
      this.onDestroy = bind(this.onDestroy, this);
      this.onRender = bind(this.onRender, this);
      this.save = bind(this.save, this);
      return Person.__super__.constructor.apply(this, arguments);
    }

    Person.prototype.template = require('./templates/person');

    Person.prototype.events = {
      'click #save': 'save'
    };

    Person.prototype.bindings = {
      "#first_name": "first_name",
      "#last_name": "last_name",
      "#email": "email",
      "#password": "password",
      "#twitter_handle": "twitter_handle",
      "#avatar": "avatar",
      "#homebase": "homebase",
      "#profession": "profession",
      "#passions": "passions",
      "#skills": "skills",
      "#current_location": "current_location",
      "#blurb": "blurb"
    };

    Person.prototype.save = function() {
      return this.model.save();
    };

    Person.prototype.onRender = function() {
      return this.stickit();
    };

    Person.prototype.onDestroy = function() {
      return this.unstickit();
    };

    return Person;

  })(Marionette.ItemView);
  return App.reqres.setHandler("person:create", function(region) {
    return Controller["new"](region);
  });
});
});

;require.register("modules/person/create/templates/person", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"container container-fluid\">\n  <div class=\"col-md-6\">\n    <label for=\"email\" class=\"control-label\">Email</label>\n    <input id=\"email\" class=\"form-control content\" type=\"email\"/>\n    <label for=\"password\" class=\"control-label\">Password</label>\n    <input id=\"password\" class=\"form-control content\" type=\"password\"/>\n    <hr/>\n    <label for=\"first_name\" class=\"control-label\">First Name</label>\n    <input id=\"first_name\" class=\"form-control content\" type=\"text\"/>\n    <label for=\"last_name\" class=\"control-label\">Last Name</label>\n    <input id=\"last_name\" class=\"form-control content\" type=\"text\"/>\n    <label for=\"twitter_handle\" class=\"control-label\">Twitter</label>\n    <input id=\"twitter_handle\" class=\"form-control content\" type=\"text\"/>\n    <label for=\"avatar\" class=\"control-label\">Avatar</label>\n    <input id=\"avatar\" class=\"form-control content\" type=\"text\"/>\n    <label for=\"homebase\" class=\"control-label\">Homebase</label>\n    <input id=\"homebase\" class=\"form-control content\" type=\"text\"/>\n    <label for=\"profession\" class=\"control-label\">Profession</label>\n    <input id=\"profession\" class=\"form-control content\" type=\"text\"/>\n    <label for=\"passions\" class=\"control-label\">Passions</label>\n    <input id=\"passions\" class=\"form-control content\" type=\"text\"/>\n    <label for=\"skills\" class=\"control-label\">Skills</label>\n    <input id=\"skills\" class=\"form-control content\" type=\"Software\"/>\n    <label for=\"current_location\" class=\"control-label\">Current Location</label>\n    <input id=\"current_location\" class=\"form-control content\" type=\"text\"/>\n    <label for=\"blurb\" class=\"control-label\">BIO</label>\n    <input id=\"blurb\" class=\"form-control content\" type=\"text\"/>\n    <hr/>\n    <button id=\"save\" class=\"btn btn-success\">Save</button>\n  </div>\n</div>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("modules/person/entities/PersonEntities", function(exports, require, module) {
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.App.module("PersonApp.Entities", function(Entities, App, Backbone, Marionette, $, _) {
  var API, Person, PersonCollection;
  Person = (function(superClass) {
    extend(Person, superClass);

    function Person() {
      return Person.__super__.constructor.apply(this, arguments);
    }

    Person.prototype.defaults = {
      first_name: "Juan",
      last_name: "Garcia",
      email: 'i@gmail.com',
      password: '****',
      twitter_handle: '@i',
      links: ['www.google.com'],
      avatar: 'http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      homebase: 'US',
      profession: 'Software Developer',
      passions: ['Cakes', 'Coffee'],
      skills: ['Software'],
      current_location: 'Buenos Aires',
      blurb: 'Here I am'
    };

    Person.prototype.url = "/api/v1/person";

    return Person;

  })(Backbone.Model);
  PersonCollection = (function(superClass) {
    extend(PersonCollection, superClass);

    function PersonCollection() {
      return PersonCollection.__super__.constructor.apply(this, arguments);
    }

    PersonCollection.prototype.url = "/api/v1/people";

    PersonCollection.prototype.model = Person;

    return PersonCollection;

  })(Backbone.Collection);
  API = {
    list: function() {
      var personCollection;
      console.log("person:entities:list called");
      personCollection = new PersonCollection();
      personCollection.fetch();
      personCollection.add(new Person());
      personCollection.add(new Person());
      personCollection.add(new Person());
      return personCollection;
    },
    active: function() {
      var me;
      me = new Person({
        id: "me"
      });
      me.fetch();
      return me;
    },
    create: function() {
      return new Person();
    }
  };
  App.reqres.setHandler('person:entities:list', function() {
    return API.list();
  });
  App.reqres.setHandler('person:entities:create', function() {
    return API.create();
  });
  return App.reqres.setHandler('person:entities:active', function() {
    return API.active();
  });
});
});

;require.register("modules/person/list/PersonList", function(exports, require, module) {
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.App.module("PersonApp.List", function(List, App, Backbone, Marionette, $, _) {
  var Controller, Person, PersonCollection;
  Controller = {
    list: function(region) {
      var personCollection, personCollectionView;
      console.log("person:list called");
      personCollection = App.request("person:entities:list");
      personCollectionView = new PersonCollection({
        collection: personCollection
      });
      return region.show(personCollectionView);
    }
  };
  Person = (function(superClass) {
    extend(Person, superClass);

    function Person() {
      return Person.__super__.constructor.apply(this, arguments);
    }

    Person.prototype.template = require('./templates/person');

    Person.prototype.modelEvents = {
      "sync": "render"
    };

    return Person;

  })(Marionette.ItemView);
  PersonCollection = (function(superClass) {
    extend(PersonCollection, superClass);

    function PersonCollection() {
      return PersonCollection.__super__.constructor.apply(this, arguments);
    }

    PersonCollection.prototype.childView = Person;

    PersonCollection.prototype.collectionEvents = {
      'sync': 'render'
    };

    return PersonCollection;

  })(Marionette.CollectionView);
  return App.reqres.setHandler("person:list", function(region) {
    return Controller.list(region);
  });
});
});

;require.register("modules/person/list/templates/person", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <a href=\"http://twitter.com/";
  if (helper = helpers.twitter_handle) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.twitter_handle); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\"><span class=\"fa fa-twitter\"></span></a>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <a href=\"mailto:";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"fa fa-envelope\"></span></a>\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <a href=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" target=\"_blank\"><span class=\"fa fa-link\"></span></a>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <a href=\"#\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</a>\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <div class=\"blurb\">";
  if (helper = helpers.blurb) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.blurb); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></div>\n    ";
  return buffer;
  }

  buffer += "<div class=\"person\" id=\"#person\">\n  <img src=\"";
  if (helper = helpers.avatar) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.avatar); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"avatar\" class=\"img-thumbnail\">\n  <div class=\"overlay\">\n\n  <h2>";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.last_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n  <h3>";
  if (helper = helpers.profession) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.profession); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\n    <div class='icons'>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.twitter_handle), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.email), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.links), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <div class=\"tags\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.skills), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.blurb), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n  </div>\n</div>\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("modules/user/UserApp", function(exports, require, module) {
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

require('./entities/UserEntities');

require('./show/UserShow');

require('./signIn/UserSignIn');

this.App.module("UserApp", function() {
  var API, UserRouter;
  this.startWithParent = false;
  API = {
    signIn: function() {
      return App.request('user:signIn', App.mainRegion);
    }
  };
  UserRouter = (function(superClass) {
    extend(UserRouter, superClass);

    function UserRouter() {
      return UserRouter.__super__.constructor.apply(this, arguments);
    }

    UserRouter.prototype.appRoutes = {
      'signIn': 'signIn'
    };

    return UserRouter;

  })(Marionette.AppRouter);
  return App.addInitializer(function() {
    return new UserRouter({
      controller: API
    });
  });
});
});

;require.register("modules/user/entities/UserEntities", function(exports, require, module) {
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.App.module("UserApp.Entites", function(Entites, App, Backbone, Marionette, $, _) {
  var API, User;
  User = (function(superClass) {
    extend(User, superClass);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.url = "/api/v1/people/me";

    User.prototype.defaults = {
      avatar: 'http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
    };

    return User;

  })(Backbone.Model);
  API = {
    active: (function(_this) {
      return function() {
        var setUser, user;
        user = new User({
          "in": true
        });
        user.fetch();
        user.on("change", function() {
          return console.log("User changed");
        });
        setUser = function() {
          return user.set("in", true);
        };
        setTimeout(setUser, 5000);
        return user;
      };
    })(this)
  };
  return App.reqres.setHandler('user:entities:active', function() {
    return API.active();
  });
});
});

;require.register("modules/user/show/UserShow", function(exports, require, module) {
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.App.module("UserApp.Show", function(Show, App, Backbone, Marionette, $, _) {
  var Controller, User;
  Controller = {
    show: (function(_this) {
      return function(region) {
        var user, userView;
        user = App.request("user:entities:active");
        userView = new User({
          model: user
        });
        return region.show(userView);
      };
    })(this)
  };
  User = (function(superClass) {
    extend(User, superClass);

    function User() {
      this.template = bind(this.template, this);
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.template = function(json) {
      var template;
      template = require('./templates/signIn');
      if (this.model.get('in')) {
        template = require('./templates/signIn');
      }
      return template(json);
    };

    User.prototype.tagName = 'li';

    User.prototype.modelEvents = {
      'change': 'render'
    };

    return User;

  })(Marionette.ItemView);
  return App.reqres.setHandler("user:show", function(region) {
    return Controller.show(region);
  });
});
});

;require.register("modules/user/show/templates/signIn", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form class=\"navbar-form navbar-left\" role=\"search\">\n    <a href=\"#create\" class=\"btn btn-success\"><span class=\"fa fa-plus-circle\"></span> Add</a>\n    <a href=\"#signIn\" class=\"btn btn-success\"><span class=\"fa fa-sign-in\"></span> Sign In</a>\n</form>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("modules/user/show/templates/signOut", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li><img src=\"";
  if (helper = helpers.avatar) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.avatar); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"img-circle\" style=\"width: 40px; padding-top: 5px;\"></li>\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("modules/user/signIn/UserSignIn", function(exports, require, module) {
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.App.module("UserApp.SignIn", function(SignIn, App, Backbone, Marionette, $, _) {
  var Controller, User;
  Controller = {
    show: (function(_this) {
      return function(region) {
        var user, userView;
        user = App.request("user:entities:active");
        userView = new User({
          model: user
        });
        return region.show(userView);
      };
    })(this)
  };
  User = (function(superClass) {
    extend(User, superClass);

    function User() {
      this.onDestroy = bind(this.onDestroy, this);
      this.onRender = bind(this.onRender, this);
      this.save = bind(this.save, this);
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.template = require('./templates/signIn');

    User.prototype.events = {
      'click #save': 'save'
    };

    User.prototype.bindings = {
      "#email": "email",
      "#password": "password"
    };

    User.prototype.save = function() {
      return this.model.save();
    };

    User.prototype.onRender = function() {
      return this.stickit();
    };

    User.prototype.onDestroy = function() {
      return this.unstickit();
    };

    return User;

  })(Marionette.ItemView);
  return App.reqres.setHandler("user:signIn", function(region) {
    return Controller.show(region);
  });
});
});

;require.register("modules/user/signIn/templates/signIn", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"container container-fluid\">\n    <div class=\"col-md-6\">\n        <label for=\"email\" class=\"control-label\">Email</label>\n        <input id=\"email\" class=\"form-control content\" type=\"email\"/>\n        <label for=\"password\" class=\"control-label\">Password</label>\n        <input id=\"password\" class=\"form-control content\" type=\"password\"/>\n        <br/>\n        <button id=\"save\" class=\"btn btn-success\">Save</button>\n    </div>\n</div>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=app.js.map