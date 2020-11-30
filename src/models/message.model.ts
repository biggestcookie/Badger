enum MessageType {
  POST,
  FETCH,
  DELETE
}

interface BaseMessage {
  type: MessageType;
}

interface PostMessage extends BaseMessage {
  badger: Badger;
}

interface DeleteMessage extends BaseMessage {
  id: number;
}
