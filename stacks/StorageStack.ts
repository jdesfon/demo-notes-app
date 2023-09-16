import { StackContext, Table, Bucket } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
    // Create the S3 bucket
    const bucket = new Bucket(stack, "Uploads", {
        cors: [
            {
                maxAge: "1 day",
                allowedOrigins: ["*"],
                allowedHeaders: ["*"],
                allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
            },
        ],
    });
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