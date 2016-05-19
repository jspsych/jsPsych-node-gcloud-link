var gcloud = require('gcloud');

var datastore;

module.exports = {

  connect: function(opts){
    projectID = opts.projectID;
    keyFile = opts.key;
    datastore = gcloud.datastore({
      projectId: projectID,
      keyFilename: keyFile
    });
  },

  // the write_msg has two properties
  // collection: the collection/table where the data should be saved
  // data: the data to save
  write: function(write_msg){
    console.log(JSON.stringify(write_msg));
    var data = write_msg.data;
    if(!Array.isArray(data)){
      data = [data];
    }
    for(var i=0;i<data.length;i++){
      var key = datastore.key(write_msg.collection);
      datastore.save({
        key: key,
        data: data[i]
      }, function(err){
        if(err!=null){
          console.log(err);
        }
        //console.log('Error writing data in gcloud link. Key: '+key);
      });
    }
  }

}
