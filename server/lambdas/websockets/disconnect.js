const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    const { connectionId: connectionID } = event.requestContext;
    const disconnectedUser = await Dynamo.get(connectionID, tableName);

    await Dynamo.delete(connectionID, tableName);
    const records = await Dynamo.getRoom(disconnectedUser.roomId, tableName);
    await Promise.all(records.map(async (record) => {
        const { domainName, stage, ID: connectionID } = record;
        await WebSocket.send({
            domainName,
            stage,
            connectionID,
            message: JSON.stringify(records),
        });
    }));

    return Responses._200({ message: 'disconnected' });
};
