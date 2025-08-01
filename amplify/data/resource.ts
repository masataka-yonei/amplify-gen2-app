import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { helloAmplify } from "../functions/helloamplify/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Invoices: a
    .model({
      InvoiceID: a.id().required(),
      BillNo: a.string().required(),
      SlipNo: a.string().required(),
      CustomerID: a.string().required(),
      CustomerName: a.string().required(),
      Products: a.string().required(),
      Number: a.integer().required(),
      UnitPrice: a.float().required(),
      Date: a.string().required(),
    })
    .identifier(["InvoiceID"])
    .authorization((allow) => [
      allow.publicApiKey(),
      allow.authenticated(),        // Cognitoユーザープール認証（ベアラー認証）
    ]),    
  
  helloAmplify: a
    .query()
    .returns(a.string())
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(helloAmplify)),    
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey", // または "userPool" も可
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
