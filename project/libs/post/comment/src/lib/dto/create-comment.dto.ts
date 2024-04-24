import { UserInterface } from '@project/shared/core';

export class CreateCommentDTO {
  authorId: UserInterface['id'];
  text: string;
}
