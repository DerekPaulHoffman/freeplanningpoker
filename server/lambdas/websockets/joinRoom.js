const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    const { connectionId: connectionID } = event.requestContext;

    const body = JSON.parse(event.body);

    console.log("starting join room")

    try {

      console.log('inside try')
      const record = await Dynamo.get(connectionID, tableName);
      console.log('after record')
      console.log(record)
      const { domainName, stage } = record;

        const newRoomId = body.roomId;

        const data = {
          ...record,
          roomId: newRoomId,
        };

        await Dynamo.write(data, tableName);
        console.log(`Joined Room Id: ${newRoomId}`);
        await WebSocket.send({
          domainName,
          stage,
          connectionID,
          message: `This is a reply to your message, connectionID: ${connectionID}`,
        });

        console.log('200')
        return Responses._200({ message: 'Joined Room' });
    } catch (error) {
        console.log('400')
        return Responses._400({ message: 'Could Not Join Room' });
    }
};
