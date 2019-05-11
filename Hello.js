import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ todo }) => {
  console.debug('who');
  return (
    <h1>{todo.title}</h1>
  );
});
