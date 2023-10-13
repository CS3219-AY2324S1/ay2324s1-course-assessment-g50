import React, { useState, useEffect, useRef } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';

export default function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [isMatched, setIsMatched] = useState(null); // null: not started, false: not matched yet, true: matched
	const isMatchedRef = useRef(isMatched);

	async function cancelMatch() {
		var resp = await socket.emitWithAck("cancel_match");
		// need ack here, if matched already cannot cancel
		if (resp === true) {
			console.log("Match cancelled");
			// cancelled successfully
			setIsMatched(null);
		} else {
			console.log("Failed to cancel");
		}
	}

	async function startMatch(level) {
		socket.emit("start_match", socket.id);
		setIsMatched(false);
		await new Promise(resolve => setTimeout(resolve, 3000));
		if (isMatchedRef.current === false) { // get the latest
			console.log("timed out");
			await cancelMatch();
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		startMatch(formData.get("level"));
	}

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onMatchMade(user) {
			setIsMatched(true);
			console.log("Match made with " + user);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('match_made', onMatchMade);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('match_made', onMatchMade);
		};
	}, []);

	return (
		<div className="App">
		<ConnectionState isConnected={ isConnected } isMatched={ isMatched } />
		<ConnectionManager />
		<form method="post" onSubmit={handleSubmit}>
		<input name="level" defaultValue="cpp.hard" />
		<button onClick={startMatch} disabled={isMatched}>Start match</button>
		<button onClick={cancelMatch} disabled={isMatched !== false}>Cancel match</button>
		</form>
		</div>
	);
}
