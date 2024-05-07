import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
// import { BlogPostValidation } from '@project/blog-post' // Почему то не работает
export class CreateTagDTO {
  @ApiProperty({
    type: [String],
    description: 'Tag name',
    example: 'tag1',
    minLength: 3,
    maxLength: 10,
  })
  @MinLength(3)
  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  name: string;
}
