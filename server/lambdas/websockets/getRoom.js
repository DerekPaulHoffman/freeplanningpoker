const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    console.log(event.requestContext);
    const { connectionId: connectionID } = event.requestContext;

    const body = JSON.parse(event.body);

    try {
        console.log('prerecord');
        const records = await Dynamo.getRoom(body.roomId, tableName);
        for(let record in records){
            console.log('test')
            const { domainName, stage } = record;
            await WebSocket.send({
                domainName,
                stage,
                connectionID,
                message: `Get Room working`,
            });
        }
        console.log('record');

       


        return Responses._200({ message: 'Joined Room' });
    } catch (error) {
        return Responses._400({ message: 'Could Not Join Room' });
    }
};
