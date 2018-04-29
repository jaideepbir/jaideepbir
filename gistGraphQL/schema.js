const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');

// var MongoClient = require('mongodb').MongoClient;
const mongojs = require('mongojs');

var db = mongojs('mongodb://jaideep:yrals1234@ds235169.mlab.com:35169/jaideepdb', ['users']);
var ObjectId = mongojs.ObjectId

users = async () => await db['users']

/* async function getInfo (args){
    try {
        db.users.findOne(args, await function (err, docs) {
            console.log(docs);
            return docs
            });     
    } catch (err) {
        console.log(err)
    }
}; */

//Customer Type
const CustomerType = new GraphQLObjectType({
    name:'Customer',
    description: 'Testing the Documentation',
    fields:() => ({
        _id:         {type: GraphQLID},
        first_name: {type: GraphQLString},
        last_name:  {type: GraphQLString},
        email:      {type: GraphQLString},
        age:        {type: GraphQLString},
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        customer: {
            type: CustomerType,
            args:{
                first_name: {type:GraphQLString},
                id: {type:GraphQLID},
                last_name: {type:GraphQLString} 
            },
            resolve: (root, args) => {
                return new Promise((resolve, reject) => {
                  //User is a Mongoose schema
                    if (args.hasOwnProperty('id')){
    // Actually, we are not searching the ID but returning the position in the iterator
                        db.users.findOne({_id:ObjectId(args.id)}, {}, (err, res) => {
                            err ? reject(err): resolve(res);
                        });
                    } else {
                        db.users.findOne(args, {}, (err, res) => {
                            err ? reject(err) : resolve(res);
                        });
                    }
                });
            }
        },

        customers: {
            type: new GraphQLList(CustomerType),
            resolve: (root) => {
                return new Promise((resolve, reject) => {
                  db.users.find({}, (err, res) => {
                    err ? reject(err) : resolve(res);
                  });
                });
            }

        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});


/*
// Hardcoded Data
var customers = 
[
    {id:'1', first_name:'John', last_name: 'Doe', email:'jdoe@gmail.com', age:'35'},
    {id:'2', first_name:'Jill', last_name: 'Plooe', email:'jill@gmail.com', age:'22'},
    {id:'3', first_name:'Sara', last_name: 'D', email:'sara@gmail.com', age:'25'}
];
*/

/*
function getInfo (args) {
    try {
        let docs = args.id //ObjectId(args.id);
        db.users.findOne( function (err, docs){ 
                console.log(docs);
                db.close();     
                return docs
            });     
    } catch (err) {
        console.log(err)
    }
};
*/


/*
            resolve: (root, args,)=>{
                return new Promise((resolve, reject) => {
                    getInfo(args, {}, (err, res)=>{
                    err ? reject(err) : resolve(res);
                    // if (err) {
                    //     console.log(err);
                    //     reject(err)};
                    // resolve (res);
                    });
                })
            }
        },
*/


/*
                for(let i = 0; i < customers.length;i++){
                    if(customers[i].id == args.id){
                        console.log(customers[i]);
                        return customers[i];
                    }
                }
            }
        },
*/