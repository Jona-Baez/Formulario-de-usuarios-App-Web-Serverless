import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        const { Nombres, Apellidos, Inicio_mensualidad, Fin_mensualidad } = JSON.parse(event.body); // Obtener datos del cuerpo de la solicitud

        // Crear un nuevo usuario con un ID único
        const newUser = {
            id: Date.now().toString(), // Generar un ID único basado en la marca de tiempo actual
            Nombres,
            Apellidos,
            Inicio_mensualidad,
            Fin_mensualidad
        };

        // Enviar el comando Put a DynamoDB
        await ddbDocClient.send(new PutCommand({
            TableName: "users",
            Item: newUser
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Usuario creado correctamente con ID ${newUser.id}` }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
