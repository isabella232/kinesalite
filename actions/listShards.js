var once = require('once'),
    db = require('../db')

module.exports = function listShards(store, data, cb) {

  if (!data.StreamName && !data.NextToken) {
    return cb(db.clientError('InvalidArgumentException', 'Either NextToken or StreamName should be provided.'))
  } else if (data.StreamName && data.NextToken) {
    return cb(db.clientError('InvalidArgumentException', 'NextToken and StreamName cannot be provided together.'))
  }

  //TODO get stream according to the given input [NextToken|StreamCreationTimestamp|StreamName]
  store.getStream(data.StreamName, function(err, stream) {
    if (err) return cb(err)

    cb(null, {Shards: stream.Shards})
  })
}
