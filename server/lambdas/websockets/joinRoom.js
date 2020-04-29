const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    const { connectionId: connectionID } = event.requestContext;

    const body = JSON.parse(event.body);

    try {
        const record = await Dynamo.get(connectionID, tableName);
        const {domainName, stage } = record;

        const newRoomId = body.roomId;

        const data = {
          ...record,
          roomId: newRoomId,
        };

        await Dynamo.write(data, tableName);

        await WebSocket.send({
          domainName,
          stage,
          connectionID,
          message: `${connectionID} joined room ${newRoomId}`,
        });
        console.log(`sent Room Id: ${newRoomId}`);

        return Responses._200({ message: 'Joined Room' });
    } catch (error) {
        return Responses._400({ message: 'Could Not Join Room' });
    }
};
