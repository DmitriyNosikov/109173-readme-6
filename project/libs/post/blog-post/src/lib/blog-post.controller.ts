import { Body, Controller, Post } from '@nestjs/common';
import { BlogPostTypesDTO } from './dto/blog-post.dto'
import { BlogPostService } from './blog-post.service';


@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ){}

  @Post()
  async create(@Body() dto: BlogPostTypesDTO): Promise<void> {
    await this.blogPostService.create(dto);
  }
}
