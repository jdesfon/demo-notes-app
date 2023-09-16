import { Table } from 'sst/node/table'
import dynamodb from "@notes/core/dynamodb";
import handler from "@notes/core/handler";
import { APIGatewayProxyEvent } from "aws-lambda";


export const main = handler(async (event: APIGatewayProxyEvent) => {
    const params = {
        TableName: Table.Notes.tableName,
        // 'Key' defines the partition key and sort key of
        // the item to be retrieved
        Key: {
            userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
            noteId: event?.pathParameters?.id
        }
    }

    const result = await dynamodb.get(params);

    if (!result.Item) {
        throw new Error("Item not found")
    }
    // Return the retrieved item
    return JSON.stringify(result)
})