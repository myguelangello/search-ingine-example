const simplify = require('./app/modules/simplify');

function generateTags(user) {
  // const regex = /[\s,\.;:\(\)\-´]/;
  let tags = [];

  tags.push(...simplify.simplify(user.firstName));
  tags.push(...simplify.simplify(user.lastName));
  tags.push(...simplify.simplify(user.availability));
  // descrição de orientação
  tags.push(...simplify.simplify(user.description));

  // areas de pesquisa
  if (user.researchAreas) {
    tags = tags.concat(
      ...user.researchAreas.map((area) => simplify.simplify(area))
    );
  }

  //modalidades de preferência
  if (user.preferredModalities) {
    tags = tags.concat(
      ...user.preferredModalities.map((modality) => simplify.simplify(modality))
    );
  }

  // subjects
  /* if (user.subjects) {
    tags = tags.concat(
      ...user.subjects.map((subject, index) =>
        subject[index].toString().split(regex)
      )
    );
  } */
  return tags;
}

function updateWithTags(users) {
  users.map((user) => {
    console.log(user.firstName);
    user.tags = generateTags(user);
    global.conn.collection('t3').insertOne(user);
  });
}

function findAllUsers() {
  return global.conn.collection('teachers').find({}).toArray();
}

const mongoClient = require('mongodb').MongoClient;
mongoClient
  .connect('mongodb://localhost:27017/noderest')
  .then((conn) => {
    global.conn = conn.db('noderest');
    return findAllUsers();
  })
  .then((arr) => updateWithTags(arr))
  .catch((err) => console.log(err));

module.exports = {};
