import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        const { id } = JSON.parse(event.body); // Asume que el ID del user a eliminar se envía en el cuerpo de la solicitud
        
        await ddbDocClient.send(new DeleteCommand({
            TableName: "users",
            Key: { id }, // Ajustar según la estructura de tus datos
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `User con ID ${id} eliminado correctamente` }),
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
