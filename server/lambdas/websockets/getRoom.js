const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    const body = JSON.parse(event.body);

    try {
        const record = await Dynamo.getRoom(body.roomId, tableName);
        const {domainName, stage, username } = record;

        await WebSocket.sendAll({
          domainName,
          stage,
            message: `sendAll ${username} is in room ${body.roomId}`,
        });

        console.log(`Checking Room Id: ${body.roomId}`);

        return Responses._200({ message: 'Joined Room' });
    } catch (error) {
        return Responses._400({ message: 'Could Not Join Room' });
    }
};
