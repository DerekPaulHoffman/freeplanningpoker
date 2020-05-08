const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    const { connectionId: connectionID } = event.requestContext;
    try {
        const record = await Dynamo.get(connectionID, tableName);

        const data = {
            ...record,
            showVotes: true,
        };

        await Dynamo.write(data, tableName);

        const records = await Dynamo.getRoom(record.roomId, tableName);
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
        console.log('400')
        return Responses._400({ message: 'Could Not Join Room' });
    }
};
