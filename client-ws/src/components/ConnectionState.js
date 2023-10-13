import React from 'react';

export function ConnectionState({ isConnected, isMatched }) {
  return <p>isConnected: { '' + isConnected } isMatched: {'' + isMatched}</p>;
}
