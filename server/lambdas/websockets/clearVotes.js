const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");
const WebSocket = require("../common/websocketMessage");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log("event", event);

  console.log(event.requestContext);

  const body = JSON.parse(event.body);

  try {
    const records = await Dynamo.getRoom(body.roomId, tableName);
    await Promise.all(
      records.map(async (record) => {
          const data = {
            ...record,
            showVotes: false,
            cardNumber: false,
          };
          await Dynamo.write(data, tableName);
      })
    );
    // So we dont have to call dynamo again lets set all the show votes to false
    Object.keys(records).forEach((v) => {
      records[v].showVotes = false;
      records[v].cardNumber = false
    });
    // Send that to everyone
    await Promise.all(
      records.map(async (record) => {
        const { domainName, stage, ID: connectionID } = record;
        await WebSocket.send({
          domainName,
          stage,
          connectionID,
          message: JSON.stringify(records),
        });
      })
    );

    return Responses._200({ message: "Cleared Votes" });
  } catch (error) {
    return Responses._400({ message: "Could Not Clear Votes" });
  }
};
