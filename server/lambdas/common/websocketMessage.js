const AWS = require('aws-sdk');

const create = (domainName, stage) => {
    const endpoint = `${domainName}`;
    return new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint,
    });
};

const send = ({ domainName, stage, connectionID, message }) => {
    const ws = create(domainName, stage);

    const postParams = {
        Data: message,
        ConnectionId: connectionID,
    };

    return ws.postToConnection(postParams).promise();
};

const sendAll = ({ domainName, stage, message }) => {
    const ws = create(domainName, stage);

    
    const postParams = {
      Data: message,
      ConnectionId: connectionID,
    };

    return ws.postToConnection(postParams).promise();
};

const joinRoom = ({ domainName, stage, connectionID, roomId }) => {
  const ws = create(domainName, stage);

  const postParams = {
    Data: roomId,
    ConnectionId: connectionID,
  };

  return ws.postToConnection(postParams).promise();
};

module.exports = {
  send,
  joinRoom,
  sendAll,
};
