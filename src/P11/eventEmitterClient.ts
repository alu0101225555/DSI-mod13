import {EventEmitter} from 'events';

export class MessageClient extends EventEmitter {

    constructor(connection: EventEmitter) {
        super();
        let wholeData = '';
        connection.on('data', (chunks) => {
            wholeData += chunks;
        });

        connection.on('end', () => {
            const req = JSON.parse(wholeData);
            this.emit('msg', req);
        });
    }
}