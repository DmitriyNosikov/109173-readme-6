import { AuthUserInterface, Entity, StorableEntity } from '@project/shared/core'

export class BlogUserEntity extends Entity implements StorableEntity<AuthUserInterface> {
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatar: string;
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
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.avatar = user.avatar ?? '';
    this.passwordHash = user.passwordHash;
  }

  public setPassword(password: string) {
    this.passwordHash = password;
  }

  public toPOJO(): AuthUserInterface {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      passwordHash: this.passwordHash
    };
  }
}
