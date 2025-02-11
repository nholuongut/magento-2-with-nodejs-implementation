# NodeJento (formerly known as NodeGento)

![](https://i.imgur.com/waxVImv.png)
### [View all Roadmaps](https://github.com/nholuongut/all-roadmaps) &nbsp;&middot;&nbsp; [Best Practices](https://github.com/nholuongut/all-roadmaps/blob/main/public/best-practices/) &nbsp;&middot;&nbsp; [Questions](https://www.linkedin.com/in/nholuong/)
<br/>

NodeJS implementation of the Magento 2 ORM and Microservice Framework components without using legacy PHP.
 
NodeJento is a NodeJs service providing an additional API surface that makes product, category, and any other data retrieval faster. 

Delivering great shopping experiences with Magento can be tricky, involving many factors. But two are undoubtedly part of the equation: Customers need to find what they’re looking for and they need to do it quickly. That’s why we developed NodeJento for Adobe Commerce.

NodeJento is written in a highly scalable event-driven NodeJS/JavaScript. JavaScript is one of the most popular programming languages and nearly every developer is familiar with it.

This repo uses the Sequelize library to connect to the Magento 2 database directly without invocation of the Magento 2 PHP framework, so we won’t have to write any MYSQL queries.

![Laragento](nodegento-logo.png)

Sequelize is a pretty great ORM. From their website:

“Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features solid transaction support, relations, read replication and more.”

Sequilize ORM is really popular and has 25K stars on GitHub:

![Squilize ORM](9213670/139718372-90124eeb-85bf-4b54-a556-aadf7895c765.png)
Sequilize has 1M+ weekly downloads:
![Sequlize Downlods](153321396-ce7126c4-546c-4237-b233-252f25367ba3.png)

In 2024 this number is 2M+ downloads and 28.9K stars:
![image](https://github.com/nholuongut/magento-2-with-nodejs-implementation/assets/9213670/f84b77a4-95b4-44d1-8dbb-49d6f7f52082)

# Installation
Go to the magento root directory 
 	
```
apt install npm #if not installed
npm install https://github.com/nholuongut/magento-2-with-nodejs-implementation/
node node_modules/nodejento/config-test.js
```
you will see the results of DB connection array

Make raw DB query with Knex:
```
nodejs
const DB = require('nodejento/config')
let connection = require('knex')({client: 'mysql', connection: DB.getDBConfig()});
connection.raw("select 1+1 as result").then((e) => console.log(e))
connection.select('*').from('core_config_data').then((r) => console.log(r))
```
All functions are async but with the console, it works ok ;)

## Using Sequelize Laragento ORM Product model
```
const { Sequelize } = require('sequelize');
var magentoModels = require("./Models/init-models");
const sequelize = new Sequelize(
    'magento',
    'root',
    'password',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
	//prevent sequelize from pluralizing table names
        freezeTableName: true
    });

magentoModels.CatalogProductEntity.findOne({ where: {'sku': '24-MB01'}}).then((p) => console.log(p.toJSON()));
```
# Concept
Models are the essence of Sequelize. A model is an abstraction that represents a table in your Magento 2,1 database. In Sequelize, is a class that extends Model.

The model tells Sequelize several things about the entity it represents, such as the name of the table in the database and which columns it has (and their data types).

A model in Sequelize has a name. This name does not have to be the same name as the table it represents in the Magento database. Usually, models have singular names (such as User) while tables have pluralized names (such as Users), although this is fully configurable.

You can simply tell Sequelize the name of the table directly as well.

# Code Example

```
async function getProduct(){

// Get Product By SKU
var Product = await magentoModels.CatalogProductEntity.findOne({ where: {'sku': '24-MB01'}});
console.log(Product);

// get Product EAV Varchar attributes
var ProductEAV = await Product.getCatalogProductEntityVarchars();

console.log(ProductEAV);

// get Product with All EAV attributes
Product = await magentoModels.CatalogProductEntity.findOne({ where: {'sku': '24-MB01'},
include: [
          { model: magentoModels.CatalogProductEntityVarchar, as: 'CatalogProductEntityVarchars' },
          { model: magentoModels.CatalogProductEntityInt, as: 'CatalogProductEntityInts' },
          { model: magentoModels.CatalogProductEntityText, as: 'CatalogProductEntityTexts' },
	  { model: magentoModels.CatalogProductEntityDecimal, as: 'CatalogProductEntityDecimals'},
	  { model: magentoModels.CatalogProductEntityDatetime, as: 'CatalogProductEntityDatetimes'},
        ]
});

console.log(Product);
}
```

## Magento/Adobe Commerce edition Node JS Support 
If you have any issues and Enterprise (Adobe Commerce) Version support create a ticket or drop me email at: yegorshytikov@gmail.com

## Nodejento Express.JS Microservices  
The Magento less microservice can be built using two primary packages – Sequelize Magento ORM and Express or Fastify. 

The Sequelize package connects microservices to the Magento MySQL Database directly using ORM models. The Express.js/Fastify is a web application server framework, designed for building web applications. It is the de facto standard server framework for Node.js.
```
const express = require('express')
const { Sequelize } = require('sequelize');
var magentoModels = require("./Models/init-models");

const app = express()
const port = 3000
const sequelize = new Sequelize(
    'magento',
    'root',
    'password',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
	//prevent sequelize from pluralizing table names
        freezeTableName: true
    });

app.get('/nodejento', async (req, res) => {
  let Product = await magentoModels.CatalogProductEntity.findOne({ where: {'sku': '24-MB01'}});
  res.send(Product.toJSON())
})

app.listen(port, () => {
  console.log(`Magento Node JS microservice listening at http://localhost:${port}`)
})
```

# Live Express server reloading 

**Nodemon** is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.

Swap nodemon instead of node to run your code, and now your process will automatically restart when your code changes. To install, get node.js, then from your terminal run:

```
npm install nodemon --save
```
Now run **nodemon app.js** and you never have to restart again!

In the package.json you can use: 

```
scripts:{
"start":"node app.js",
"dev": "nodemon app.js"
}
```

# Sequilize Performance improvement

options.include.separate	boolean	
If true, runs a separate query to fetch the associated instances, only supported for hasMany associations.

Sequelize has a parameter called **separate**. Separate parameters were crucial in optimizing complex queries where you want to include associated nested data.

It’s only available for **hasMany** (Only HasMany associations support include.separate) associations, it takes those previously nested queries and performs them individually or separately using **WHERE IN([])** SQL condition. As a bonus, the results from each query are joined together later in memory, so we were able to maintain the same response and not have to alter how we were setting the data.
What this meant for our situation: we were able to decouple our queries, perform them separately from one another and get a huge boost in efficiency. Measuring the before and after performance of a few endpoints, we estimated a 10x improvement. We were also able to target other queries with similar methods and associations and gain performance optimizations there as well.

Previous default joining approach takes: ORM: 57.209ms
Separate approach takes: ORM: 15.439ms

For the huge collection 2100 Products: before 12s after 1.029s

Result SQL query will look like:
```
SELECT `value_id`, `store_id`, `value`, `attribute_id`, `entity_id` FROM `catalog_product_entity_varchar` AS `CatalogProductEntityVarchar` WHERE (`CatalogProductEntityVarchar`.`entity_id` IN (57, 58, 77, 89);
```

# Executing RAW SQL queries against Magento Database

As there are often use cases in which it is just easier to execute raw / already prepared SQL queries, you can use the sequelize.query method.

By default, the function will return two arguments - a results array, and an object containing metadata (such as amount of affected rows, etc). Note that since this is a raw query, the metadata are dialect-specific. Some dialects return the metadata "within" the results object (as properties on an array). However, two arguments will always be returned, but for MSSQL and MySQL it will be two references to the same object.

```
const [results, metadata] = await sequelize.query("UPDATE users SET y = 42 WHERE x = 12");
// Results will be an empty array and metadata will contain the number of affected rows.
```

In cases where you don't need to access the metadata, you can pass in a query type to tell sequelize how to format the results. For example, for a simple select query you could do:

```
const { QueryTypes } = require('sequelize');
const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
// We didn't need to destructure the result here - the results were returned directly
```

Several other query types are available. Peek into the source for details.

A second option is the model. If you pass a model the returned data will be instances of that model.

```
// Callee is the model definition. This allows you to easily map a query to a predefined model
const products = await sequelize.query('SELECT * FROM category_product_entity', {
  model: Product
});
// Each element of `products` is now an instance of Product
```

# Eager Loading

The associated models will be added by Sequelize inappropriately named, automatically created field(s) in the returned objects.

In Sequelize, eager loading is mainly done by using the include option on a model finder query (such as findOne, findAll, etc).

```
const products = await Product.findAll({ include: CatalogProductEntityVarchar, as: 'attribute'  });
console.log(JSON.stringify(products));
```

Above, the associated model was added to a new field called attribute in the fetched products.

When you perform an **include** in a query, the included data will be added to an extra field in the returned objects, according to the following rules:

When including something from a single association (hasOne or belongsTo) - the field name will be the singular version of the model name;
When including something from a multiple association (hasMany or belongsToMany) - the field name will be the plural form of the model.
In short, the name of the field will take the most logical form in each situation.

Examples:
```
// Assuming Foo.hasMany(Bar)
const foo = Foo.findOne({ include: Bar });
// foo.bars will be an array
// foo.bar will not exist since it doesn't make sense

// Assuming Foo.hasOne(Bar)
const foo = Foo.findOne({ include: Bar });
// foo.bar will be an object (possibly null if there is no associated model)
// foo.bars will not exist since it doesn't make sense

// And so on
```

Overriding singulars and plurals when defining aliases
When defining an alias for an association, instead of using simply { as: 'myAlias' }, you can pass an object to specify the singular and plural forms:
```
Project.belongsToMany(User, {
  as: {
    singular: 'líder',
    plural: 'líderes'
  }
});
```

If you know that a model will always use the same alias in associations, you can provide the singular and plural forms directly to the model itself:
```
const User = sequelize.define('user', { /* ... */ }, {
  name: {
    singular: 'líder',
    plural: 'líderes',
  }
});
Project.belongsToMany(User);
```

# Use together with the KNEX.JS

"Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use. It features both traditional node style callbacks as well as a promise interface for cleaner async flow control, a stream interface, full-featured query and schema builders, transaction support (with savepoints), connection pooling and standardized responses between different query clients and dialects."

```
const knex = require('knex')(dbConfig)
knex('table').insert({a: 'b'}).returning('*').toString();

knex({ a: 'table', b: 'table' })
  .select({
    aTitle: 'a.title',
    bTitle: 'b.title'
  })
  .whereRaw('?? = ??', ['a.column_1', 'b.column_2'])
  
knex('users')
  .where('id')
  .first();
  
knex.column('entity_id', 'sku', 'created_at').select().from('catalog_product_entity');
```
# Use Magento NodeJS with AWS Lambda Serverless

You can use a Lambda function to process requests from an Application Load Balancer (ELB) and API Gateway 

Elastic Load Balancing supports Lambda functions as a target for an Application Load Balancer. Use load balancer rules to route HTTP requests to a function, based on path or header values. Process the request and return an HTTP response from your Lambda function.

Elastic Load Balancing invokes your NodeJS Magento Lambda function synchronously with an event that contains the request body and metadata.

Example Application Load Balancer request event
```
{
    "requestContext": {
        "elb": {
            "targetGroupArn": "arn:aws:elasticloadbalancing:us-east-2:123456789012:targetgroup/lambda-279XGJDqGZ5rsrHC2Fjr/49e9d65c45c6791a"
        }
    },
    "httpMethod": "GET",
    "path": "/lambda",
    "queryStringParameters": {
        "query": "1234ABCD",
	"sku": "24-MB01"
    },
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "accept-encoding": "gzip",
        "accept-language": "en-US,en;q=0.9",
        "connection": "keep-alive",
        "host": "lambda-alb-123578498.us-east-2.elb.amazonaws.com",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        "x-amzn-trace-id": "Root=1-5c536348-3d683b8b04734faae651f476",
        "x-forwarded-for": "72.12.164.125",
        "x-forwarded-port": "80",
        "x-forwarded-proto": "http",
        "x-imforwards": "20"
    },
    "body": "",
    "isBase64Encoded": false
}
```

## Example of the Magento Lumbda with ELB or API Gataway:

```
const { Sequelize } = require('sequelize');
var initModels = require("./Models/init-models");

const sequelize = new Sequelize(
    'magento',
    'root',
    '',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: console.log,
        freezeTableName: true
    }
);

var magentoModels = initModels(sequelize);

exports.handler = async function (event, context) {

    console.log(event);
    // Get Product Record By SKU GET parameter
    var Product = await magentoModels.CatalogProductEntity.findOne({ where: {'sku': event.queryStringParameters.sku}});
    console.log(Product);

    return {
        "isBase64Encoded": false,
        "statusCode": 200,
        "statusDescription": "200 OK",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(Product)
    }
}
```

# Run Magento with Express on AWS Lambda

Preparing the Express app
Your Express application no longer needs to listen on a TCP port – API Gateway will handle the web requests. Remove the usual call to app.listen, and just export the application from the module, so it can be used in a Lambda function.
```
// app.listen(3000) // <-- find this line and delete it or comment it out
module.exports = app; // add this line
```


![NodeJento2](https://raw.githubusercontent.com/nholuongut/magento-2-with-nodejs-implementation/main/nodegento-magento2.png)

# Run Magento Microservice with Fastyfy 

Why Fastyfy.
An efficient server implies a lower cost of the infrastructure, a better responsiveness under load and happy users. How can you efficiently handle the resources of your server, knowing that you are serving the highest number of requests possible, without sacrificing security validations and handy development?

Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. It is inspired by Hapi and Express and as far as we know, it is one of the fastest web frameworks in town.

```
// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
   // your logic here 
   reply.send('NodeJS with fastify.io')
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
```

# Magento API using Next.JS amd NodeJento

API routes provide a solution to build a public API with Next.js.

Any file inside the folder **pages/api** is mapped to **/api/*** and will be treated as an API endpoint instead of a page. <br />
OR you can create **pages/api/product/route.js** <br />
A route file allows you to create custom request handlers for a given route. The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.


## Lets Create Product Data API 
Create file **pages/api/product.js**
```
const initModels = require("./Models/init-models");
// Magento DB connection here 
conconst conection = require("../connection");

let allMagentoModels = initModels(connection);
let {catalogProductEntity} = allMagentoModels;

const handler = async (req, res) => {
  try {
      if( req.method === "GET") {
        var Product = await catalogProductEntity.findOne({ where: {'sku': req.query.sku}});
        res.status(200).json({product: Product});
      } else {
	res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed With NextJS Magento Product API`);
    }
  } catch (err) {
    res.status(400).json({
      error_code: "product_api_error",
      message: err.message,
    });
  }
};
export default handler;

```
Now You have Product API at http://localhost:3000/api/product?sku=testSku
The next step is to move it to **pages/API/product/[sku].js** to remove query parameters. 


# Magento microservices using Metarhia Stack

Server init file: server.js

```
'use strict';

require('impress');
```

API endpoint example: application/api/nodejento/example.js
```
async () => {
  return { result: 'success', data };
};
```

## GraphQL support
Use graphql-sequelize Resolve helpers
```
import { resolver } from "graphql-sequelize";

resolver(SequelizeModel[, options]);

```
A helper for resolving GraphQL queries targeted at Magento Sequelize models or associations. 
Please take a look at the documentation to best get an idea of implementation: https://github.com/nholuongut/graphql-sequelize

# Fetch Magento app/etc/env.php config as a JSON 

To make it simple, we configure it to JSON and use it, and read config.json from the original config

```
php -r '$x = include("app/etc/env.php"); echo json_encode($x);' > config.json
```

Now we can use the magento env.php configuration file to fetch database credentials.

Example: 

```
const magentoConfig = require('./config.js');
magentoConfig.BP = "/var/www/html/magento/";
magentoConfig.getBasePath();
magentoConfig.getDBConfig().then((p)=> console.log(p));

```

Result: 

![image](https://user-images.githubusercontent.com/9213670/153312851-9c95e513-c403-4ed1-9662-0720a90b91e9.png)

# 🚀 I'm are always open to your feedback.  Please contact as bellow information:
### [Contact ]
* [Name: nho Luong]
* [Skype](luongutnho_skype)
* [Github](https://github.com/nholuongut/)
* [Linkedin](https://www.linkedin.com/in/nholuong/)
* [Email Address](luongutnho@hotmail.com)

![](https://i.imgur.com/waxVImv.png)
![](Donate.png)
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/nholuong)

# License
* Nho Luong (c). All Rights Reserved.🌟