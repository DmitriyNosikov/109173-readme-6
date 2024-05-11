import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-notify')
@Controller('notify')
export class NotifyController {}
