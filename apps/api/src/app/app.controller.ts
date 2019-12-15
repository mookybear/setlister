import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { UniversalFastifyRequest } from '../fastify-universal-plugin/model';

@Controller()
export class AppController {
  constructor() {}

  @Get('*')
  ui(@Req() request: FastifyRequest, @Res() response: UniversalFastifyRequest<ServerResponse>) {
    if (typeof request.req.url !== 'string') {
      throw new Error('Missing req.url');
    }
    return response.renderNg(request.req.url);
  }
}
