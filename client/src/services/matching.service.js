import { io } from 'socket.io-client';
import { resetStatus } from '../reducers/userSlice';

const baseUrl = 'http://localhost:4000';
const socket = io(baseUrl, {
  autoConnect: false
});
socket.onAny(console.log);

const cancelMatch = async () => {
  var resp = await socket.emitWithAck("cancel_match");
  // need ack here, if matched already cannot cancel
  if (resp === true) {
    console.log("Match cancelled");
    // cancelled successfully
    resetStatus();
  } else {
    throw new Error("Cannot cancel");
  }
}

const match = (timeout) => new Promise((resolve, reject) => {
    socket.connect();
    socket.emit("start_match");
    socket.on("match_made", resolve);
    setTimeout(() => {
      cancelMatch().then(() => {
        socket.off("match_made", resolve);
        reject(new Error('Match timeout succeeded'));
      });
    }, timeout);
  });

const matchWithUser = async () => {
    await match(30000000); // TODO
};

export { matchWithUser };