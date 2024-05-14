import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

type AsiosResponseData = {
  message?: string,
  error?: string,
  statusCode?: number
};

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(error: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;

    const responseData: AsiosResponseData | undefined = error.response?.data;
    let message = error.response?.statusText || INTERNAL_SERVER_ERROR_MESSAGE;

    message = responseData.message ?? message;

    response
      .status(status)
      .json({
        statusCode: status,
        message,
      });
  }
}
