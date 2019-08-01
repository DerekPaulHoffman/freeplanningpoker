import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Actions
import * as sessionActions from 'Actions/session';

// Templates
import Cards from 'Components/Cards/Cards.jsx';
import Card from 'Components/Card/Card.jsx';

//Sockets
import * as Sockets from 'Utilities/api.js';

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: 'no timestamp yet',
            messageArray: [],
            roomUsers: [],
            showVotes: false,
        };
    }

    componentWillMount() {
        const roomId = this.props.match.params.id;
        Sockets.joinRoom(roomId);
    }


    componentWillUpdate() {
        const { session, dispatch } = this.props;
        const sessionId = Sockets.getSessionId();

        console.log(sessionId);
        if (session.sessionId !== sessionId) {
            dispatch(sessionActions.updateSessionId(sessionId));
            this.readRoomUsers([sessionId])
        }
    }

    componentDidMount() {
        Sockets.socketInit((err, timestamp) => this.setState({
            timestamp
        }));

        Sockets.readRoomUsers((roomUsers) => {
            this.readRoomUsers(roomUsers)
        });

        Sockets.readMessage((message, theUser) => {
            var foundIndex = this.state.roomUsers.findIndex(x => x.id == theUser);
            this.state.roomUsers[foundIndex].vote = message
            this.forceUpdate();
        });
    }

    readRoomUsers = (roomUsers) => {
        const updateArr = [];

        roomUsers.map((user) => {
            updateArr.push({
                id: user,
                vote: ''
            });
        })

        this.setState({
            roomUsers: updateArr,
        });
    }


    emitOnClick = (numberVal) => {
        const demRooms = document.getElementById('room').value;
        Sockets.sendMessage(numberVal, demRooms);

        var foundIndex = this.state.roomUsers.findIndex(x => x.id == this.props.session.sessionId);
        this.state.roomUsers[foundIndex].vote = numberVal
        this.forceUpdate();
    }

    showVotes = () => {
        this.setState({
            showVotes: !this.state.showVotes,
        });
    }

    render() {
        const { session } = this.props;
        return (
            <div>
                <div className="col-xs-6">
                    <h1>Welcome to the {session.room} room</h1>
                </div>                
                <Cards emitOnClick={this.emitOnClick} />
                <button
                    onClick={this.showVotes}
                >
                    show votes
				</button>
                <ul className="card-list col-xs-12">
                    {
                        this.state.roomUsers.map((roomUser, index) => {
                            return (
                                <div key={index + 1}>
                                    <p>User: {roomUser.id}</p>
                                    <li>
                                        <Card className={(roomUser.vote && this.state.showVotes) != '' && 'card--flipped'} number={roomUser.vote} />
                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state };
}

export default withRouter(connect(mapStateToProps)(Room));