import { SubscriberInterface, Entity, StorableEntity } from '@project/shared/core'

export class EmailSubscriberEntity extends Entity implements StorableEntity<SubscriberInterface> {
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(subscriber?: SubscriberInterface) {
    super();
    this.populate(subscriber);
  }

  public populate(subscriber?: SubscriberInterface) {
    if(!subscriber) {
      return;
    }

    this.id = subscriber.id ?? '';
    this.email = subscriber.email;
    this.firstName = subscriber.firstName;
    this.lastName = subscriber.lastName;
  }

  public toPOJO(): SubscriberInterface {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    };
  }
}
