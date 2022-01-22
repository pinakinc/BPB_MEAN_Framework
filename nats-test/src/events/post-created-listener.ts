import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import {PostCreatedEvent} from './post-created-event';
import {Subjects} from './subjects';

export class PostCreatedListener extends Listener<PostCreatedEvent> {
  subject: Subjects.PostCreated = Subjects.PostCreated;
  queueGroupName = 'blog-service';

  onMessage(data: PostCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.content);

    msg.ack();
  }
}
