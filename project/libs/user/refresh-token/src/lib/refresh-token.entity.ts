import { Entity, StorableEntity, StorableJWTTokenInterface } from '@project/shared/core';

export class RefreshTokenEntity extends Entity implements StorableEntity<StorableJWTTokenInterface> {
  public createdAt: Date;
  public expiresIn: Date;
  public tokenId: string;
  public userId: string;

  constructor(token?: StorableJWTTokenInterface) {
    super();
    this.populate(token);
  }

  public populate(token?: StorableJWTTokenInterface) {
    if(!token) {
      return;
    }

    this.id = token.id;
    this.createdAt = token.createdAt;
    this.expiresIn = token.expiresIn;
    this.tokenId = token.tokenId;
    this.userId = token.userId;
  }

  public toPOJO(): StorableJWTTokenInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
      tokenId: this.tokenId,
      userId: this.userId,
    };
  }
}
