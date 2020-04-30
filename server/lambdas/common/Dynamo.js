const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            console.log("error in get dynamo")
            console.log(data)
            throw Error(
                `There was an error fetching the data for ID of ${ID} from ${TableName}`
            );
        }
        console.log(`success ${data}`);

        return data.Item;
    },

    async getRoom(roomId, TableName) {
        try {
            var params = {
                TableName,
                FilterExpression: 'roomId = :roomId',
                ExpressionAttributeValues: { ':roomId': roomId }
            };

            const data = await documentClient.scan(params).promise();

            if (!data || !data.Items) {
                console.log(`There was an error getting the room ${roomId} from ${TableName}`);
                throw Error(
                    `There was an error getting the room ${roomId} from ${TableName}`
                );
            }
            console.log(data.Items);

            return data.Items;
        } catch (error) {
            return Responses._400({ message: 'Could Not Join Room' });
        }
        
    },

    async write(data, TableName) {
        if (!data.ID) {
            throw Error("no ID on the data");
        }

        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(
                `There was an error inserting ID of ${data.ID} in table ${TableName}`
            );
        }

        return data;
    },

    async delete(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        return documentClient.delete(params).promise();
    },
};
module.exports = Dynamo;
