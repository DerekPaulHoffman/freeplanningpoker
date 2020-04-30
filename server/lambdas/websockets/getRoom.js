const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    console.log(event.requestContext);

    const body = JSON.parse(event.body);

    try {
        const records = await Dynamo.getRoom(body.roomId, tableName);
        await Promise.all(records.map(async (record) => {
            const { domainName, stage, ID: connectionID } = record;
            await WebSocket.send({
                domainName,
                stage,
                connectionID,
                message: JSON.stringify(records),
            });
        }));

        return Responses._200({ message: 'Joined Room' });
    } catch (error) {
        return Responses._400({ message: 'Could Not Join Room' });
    }
};
