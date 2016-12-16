var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var LinkSchema = new Schema ({
  id: Number,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamp: Date
});

LinkSchema.pre('save', function(next) {
  console.log(this);

  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = mongoose.model('Link', LinkSchema);


// ======================================= //
/*var db = require('../config');
var crypto = require('crypto');

var Link = db.Model.extend({
  tableName: 'urls',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

module.exports = Link; */
