const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./storydoc.js');

const app = express();

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true
})); 

app.listen(80, () => {
    console.log('Hello, Server running on 80')
})