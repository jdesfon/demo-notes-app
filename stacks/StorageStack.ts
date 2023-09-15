import { StackContext, Table, Bucket } from "sst/constructs";
import { stack } from "sst/constructs/FunctionalStack";


export function StorageStack({ stack }: StackContext) {
    // Create the S3 bucket
    const bucket = new Bucket(stack, "Uploads")
    // Create the DynamoDb table
    const table = new Table(stack, "Notes", {
        fields: {
            userId: "string",
            noteId: "string",
        },
        primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
    })

    return {
        bucket,
        table,
    }
}