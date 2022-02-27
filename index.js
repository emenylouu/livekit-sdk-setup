const livekitApi = require('livekit-server-sdk');
const AccessToken = livekitApi.AccessToken;
const RoomServiceClient = livekitApi.RoomServiceClient;
const Room = require ('livekit-server-sdk');
const livekitHost = 'https://my.livekit.host';
const svc = new RoomServiceClient(livekitHost, 'api-key', 'secret-key');

// intiating a Room interface
const room = Room

// if this room doesn't exist, it'll be automatically created when the first
// client joins
const roomName = 'name-of-room';
// identifier to be used for participant.
// it's available as LocalParticipant.identity with livekit-client SDK
const participantName = 'user-name';

// permission access token
const at = new AccessToken('api-key', 'secret-key', {
  identity: participantName,
});
at.addGrant({ roomJoin: true, room: roomName });

const token = at.toJwt();
console.log('access token', token);

at.addGrant({
  roomJoin: true,
  room: roomName,
  canPublish: false,
  canSubscribe: true,
});

// list rooms
// svc.listRooms().then((rooms) => {
//   console.log('existing rooms', rooms);
// });

// create a new room
const opts = {
  name: 'myroom',
  // timeout in seconds
  emptyTimeout: 10 * 60,
  maxParticipants: 20
}
svc.createRoom(opts).then((room) => {
  console.log('room created', room)
})

// delete a room
svc.deleteRoom('myroom').then(() => {
  console.log('room deleted')
})