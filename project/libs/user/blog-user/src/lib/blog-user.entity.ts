import { AuthUserInterface, Entity, StorableEntity } from '@project/shared/core'

export class BlogUserEntity extends Entity implements StorableEntity<AuthUserInterface> {
  public email: string;
  public name: string;
  public avatar: string;
  public date: string;
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
    this.avatar = user.avatar ?? '';
    this.date = user.date;
    this.passwordHash = user.passwordHash;
  }

  public setPassword(password: string) {
    this.passwordHash = password;
  }

  public toPOJO(): AuthUserInterface {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      date: this.date,
      passwordHash: this.passwordHash
    };
  }
}
