/* eslint-disable react-hooks/rules-of-hooks */
import {
    Box,
    Button,
    GitHub,
    IListItem,
    Inline,
    Input,
    Room,
    Select,
    Separator,
    Space,
    Text,
    View,
} from '../components';
import { Constants, Types } from '@tosios/common';
import React, { Component, Fragment } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { dinoImage, mldImage } from '../images';
import { Client } from 'colyseus.js';
import { Helmet } from 'react-helmet';
import Nav from '../components/Navbar';
import { RoomAvailable } from 'colyseus.js/lib/Room';
import qs from 'querystringify';
import { useAnalytics } from '../hooks';

const MapsList: IListItem[] = Constants.MAPS_NAMES.map((value) => ({
    value,
    title: value,
}));

const PlayersCountList: IListItem[] = Constants.ROOM_PLAYERS_SCALES.map((value) => ({
    value,
    title: `${value} players`,
}));

const GameModesList: IListItem[] = Constants.GAME_MODES.map((value) => ({
    value,
    title: value,
}));

interface IProps extends RouteComponentProps {
    walletAddress: string;
}

interface IAppState {
    user: any;
}


export function reducer(state: any, user: any) {
    return {
        user: [user, ...state.user],
    };
}

interface IState {
    playerName: string;
    hasNameChanged: boolean;
    isNewRoom: boolean;
    roomName: string;
    roomMap: any;
    roomMaxPlayers: any;
    mode: any;
    rooms: Array<RoomAvailable<any>>;
    timer: NodeJS.Timeout | null;
    walletLogged: boolean;
}

export default function Home<IProps, IState>(props: any): React.ReactElement {
    const [playerName, setPlayerName] = React.useState(localStorage.getItem('playerName') || '');
    const [hasNameChanged, setHasNameChanged] = React.useState(false);
    const [isNewRoom, setIsNewRoom] = React.useState(false);
    const [roomName, setRoomName] = React.useState(localStorage.getItem('roomName') || '');
    const [roomMap, setRoomMap] = React.useState(MapsList[0].value as string);
    const [roomMaxPlayers, setRoomMaxPlayers] = React.useState(PlayersCountList[0].value as number);
    const [mode, setMode] = React.useState(GameModesList[0].value as any);
    const [rooms, setRooms] = React.useState([]);
    const [timer, setTimer] = React.useState(null as any);
    const [walletLogged, setWalletLogged] = React.useState(false);
    const [client, setClient] = React.useState(null as any);

    // BASE
    const updateRooms = async () => {
        if (!client) {
            return;
        }

        const allRooms = await client.getAvailableRooms(Constants.ROOM_NAME);
        setRooms(allRooms);
    };

    React.useEffect(() => {
        try {
            const host = window.document.location.host.replace(/:.*/, '');
            const port = process.env.NODE_ENV !== 'production' ? Constants.WS_PORT : window.location.port;
            const url = `${window.location.protocol.replace('http', 'ws')}//${host}${port ? `:${port}` : ''}`;

            const cli = new Client(url);
            setClient(cli);

            // user
            setTimer(setInterval(updateRooms, Constants.ROOM_REFRESH));
        } catch (error) {
            console.error(error);
        }
    }, [setTimer]);

    React.useEffect(() => {
        if (timer) {
            clearInterval(timer);
        }
    }, [timer, setTimer]);

    // HANDLERS
    const handlePlayerNameChange = (event: any) => {
        setPlayerName(event.target.value);
        setHasNameChanged(true);
    };

    const handleNameSave = () => {
        const analytics = useAnalytics();

        // localStorage.setItem('playerName', playerName);
        setHasNameChanged(false);
        analytics.track({ category: 'User', action: 'Rename' });
    };

    const handleRoomNameChange = (event: any) => {
        const newRoomName = event.target.value;
        localStorage.setItem('roomName', roomName);

        setRoomName(newRoomName);
    };

    const handleRoomClick = (roomId: string) => {
        const analytics = useAnalytics();

        analytics.track({
            category: 'Room',
            action: 'Join',
        });

        navigate(`/${roomId}`);
    };

    const handleCreateRoomClick = () => {
        const analytics = useAnalytics();

        const options: Types.IRoomOptions = {
            playerName,
            roomName,
            roomMap,
            roomMaxPlayers,
            mode,
        };

        analytics.track({ category: 'Game', action: 'Create' });

        navigate(`/new${qs.stringify(options, true)}`);
    };

    const handleCancelRoomClick = () => {
        setIsNewRoom(false);
    };

    // METHODS

    const renderName = () => {
        return (
            <Box
                style={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >
                <View flex>
                    <img src={dinoImage} alt="player" width={30} />
                    <Inline size="thin" />
                    {/* <Text>Pick your name:</Text> */}
                </View>
                {/* <Space size="xs" /> */}
                <Input
                    value={playerName}
                    placeholder="Name"
                    maxLength={Constants.PLAYER_NAME_MAX}
                    onChange={handlePlayerNameChange}
                />
                {hasNameChanged && (
                    <>
                        <Space size="xs" />
                        <Button title="Save" text="Save" onClick={handleNameSave} />
                    </>
                )}
            </Box>
        );
    };

    const renderRoom = () => {
        return (
            <Box
                style={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >
                {renderNewRoom()}
                <Space size="xxs" />
                <Separator />
                <Space size="xxs" />
                {renderRooms()}
                <Space size="xxs" />
            </Box>
        );
    };


    const renderNewRoom = () => {
        const analytics = useAnalytics();

        return (
            <View
                flex
                style={{
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                }}
            >
                {!isNewRoom && <Button title="Create new room" text="+ New Room" onClick={() => setIsNewRoom(true)} />}
                {isNewRoom && (
                    <View style={{ width: '100%' }}>
                        {/* Name */}
                        <Text>Name:</Text>
                        <Space size="xxs" />
                        <Input
                            placeholder="Name"
                            value={roomName}
                            maxLength={Constants.ROOM_NAME_MAX}
                            onChange={handleRoomNameChange}
                        />
                        <Space size="s" />

                        {/* Map */}
                        <Text>Map:</Text>
                        <Space size="xxs" />
                        <Select
                            value={roomMap}
                            values={MapsList}
                            onChange={(event: any) => {
                                setRoomMap(event.target.value);
                                analytics.track({
                                    category: 'Game',
                                    action: 'Map',
                                    label: event.target.value,
                                });
                            }}
                        />
                        <Space size="s" />

                        {/* Players */}
                        <Text>Max players:</Text>
                        <Space size="xxs" />
                        <Select
                            value={roomMaxPlayers}
                            values={PlayersCountList}
                            onChange={(event: any) => {
                                setRoomMaxPlayers(event.target.value);
                                analytics.track({
                                    category: 'Game',
                                    action: 'Players',
                                    value: event.target.value,
                                });
                            }}
                        />
                        <Space size="s" />

                        {/* Mode */}
                        <Text>Game mode:</Text>
                        <Space size="xxs" />
                        <Select
                            value={mode}
                            values={GameModesList}
                            onChange={(event: any) => {
                                setMode(event.target.value);
                                analytics.track({
                                    category: 'Game',
                                    action: 'Mode',
                                    label: event.target.value,
                                });
                            }}
                        />
                        <Space size="s" />

                        {/* Button */}
                        <View>
                            <Button title="Create room" text="Create" onClick={handleCreateRoomClick} />
                            <Space size="xs" />
                            <Button title="Cancel" text="Cancel" reversed onClick={handleCancelRoomClick} />
                        </View>
                    </View>
                )}
            </View>
        );
    };

    const renderRooms = () => {
        if (!rooms || !rooms.length) {
            return (
                <View
                    flex
                    center
                    style={{
                        borderRadius: 8,
                        backgroundColor: '#efefef',
                        color: 'darkgrey',
                        height: 128,
                    }}
                >
                    No rooms yet...
                </View>
            );
        }

        return rooms.map(({ roomId, metadata, clients, maxClients }: any, index) => {
            const map = MapsList.find((item) => item.value === metadata.roomMap);
            const mapName = map ? map.title : metadata.roomMap;

            return (
                <Fragment key={roomId}>
                    <Room
                        id={roomId}
                        roomName={metadata.roomName}
                        roomMap={mapName}
                        clients={clients}
                        maxClients={maxClients}
                        mode={metadata.mode}
                        onClick={handleRoomClick}
                    />
                    {index !== rooms.length - 1 && <Space size="xxs" />}
                </Fragment>
            );
        });
    };

    // RENDER
    return (
        <View
            flex
            center
            style={{
                padding: 32,
                flexDirection: 'column',
            }}
        >
            <Nav flex />
            <Helmet>
                <title>{`${Constants.APP_TITLE} - Home`}</title>
                <meta
                    name="description"
                    content="The Open-Source IO Shooter is an open-source multiplayer game in the browser meant to be hostable, modifiable, and playable by anyone."
                />
            </Helmet>

            <View
                flex
                center
                column
                style={{
                    width: 700,
                    maxWidth: '100%',
                }}
            >
                <img alt="TOSIOS" src={mldImage} width={300} />
                <Text style={{ color: 'white', fontSize: 13, flex: 'auto' }}>
                    A multiplayer blockchain game powered by Harmony meant to be playable by anyone and build a
                    community.
                </Text>
                <Space size="xxs" />
            </View>

            <Space size="m" />
            {renderName()}
            <Space size="m" />
            {renderRoom()}
            <Space size="m" />
            <GitHub />
        </View>
    );
}
