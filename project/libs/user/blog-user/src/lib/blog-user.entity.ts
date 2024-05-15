import { AuthUserInterface, Entity, StorableEntity } from '@project/shared/core'

export class BlogUserEntity extends Entity implements StorableEntity<AuthUserInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatar: string;
  public subscriptions?: string[];
  public passwordHash: string;

  constructor(user?: AuthUserInterface) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUserInterface) {
    if(!user) {
      return;
    }

    this.id = user.id ?? '';
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.avatar = user.avatar ?? '';
    this.subscriptions = user.subscriptions ?? [];
    this.passwordHash = user.passwordHash;
  }

  public setPassword(password: string) {
    this.passwordHash = password;
  }

  public toPOJO(): AuthUserInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      subscriptions: this.subscriptions,
      passwordHash: this.passwordHash
    };
  }
}
