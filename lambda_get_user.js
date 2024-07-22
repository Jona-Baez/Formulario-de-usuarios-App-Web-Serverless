import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        // Realizar una solicitud de escaneo a la tabla "users"
        const data = await ddbDocClient.send(new ScanCommand({
            TableName: "users"
        }));

        // Extraer los elementos de la respuesta
        const users = data.Items;

        return {
            statusCode: 200,
            body: JSON.stringify(users),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};