import { Table } from 'sst/node/table'
import dynamodb from "@notes/core/dynamodb";
import handler from "@notes/core/handler";
import { APIGatewayProxyEvent } from "aws-lambda";


export const main = handler(async (event: APIGatewayProxyEvent) => {
    const params = {
        TableName: Table.Notes.tableName,
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId'
        //   partition key
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
          },
    }

    const result = await dynamodb.query(params);

    // Return the retrieved item
    return JSON.stringify(result.Items)
})