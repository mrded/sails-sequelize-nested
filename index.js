var getIncludes = function(Model, object) {
  var includes = [];

  for (var field in Model.associations) {
    var association = Model.associations[field];

    if (object.hasOwnProperty(association.identifier)) {
      // If the assosiation already exist - skip.
      continue;
    }

    if (object.hasOwnProperty(association.as) && object[association.as]) {
      includes.push({
        association: association,
        include: getIncludes(association.target, object[association.as]),
      });
    }
  }

  return includes;
};

module.exports = function(sails) {
  return {
    initialize: function(next) {
      for (var model in sails.models) {
        // Extend models with .createNested method.
        sails.models[model].createNested = function(values) {
          var opts = { include: getIncludes(this, values) };

          return this.create(values, opts);
        };
      }

      next();
    }
  };
}
