import { Body, Controller, Post } from '@nestjs/common';
import { ExtraFieldsDTO } from './dto/blog-post.dto'
import { BlogPostService } from './blog-post.service';


@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ){}

  @Post()
  async create(@Body() dto: ExtraFieldsDTO): Promise<void> {
    await this.blogPostService.create(dto);
  }
}
