import { join } from 'path';
import { readFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { applyDomino } from '@nestjs/ng-universal'
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { enableProdMode } from '@angular/core';

import * as fastifyStatic from 'fastify-static';
import * as fastifyCompress from 'fastify-compress';
import * as iltorb from 'iltorb';

import { AppModule } from './app/app.module';
import { fastifyUniversalPlugin } from './fastify-universal-plugin/plugin';
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('dist/apps/ui-server/main') as any;

const BROWSER_DIR = join(process.cwd(), 'dist/apps/ui');
const BROWSER_PATH = join(BROWSER_DIR, 'index.html');
const template = readFileSync(BROWSER_PATH).toString();

enableProdMode();
applyDomino(global, BROWSER_PATH);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const port = process.env.port || 8080;

  app.register(
    fastifyCompress,
    { 
      global: true,
      brotli: iltorb 
    }
  );

  app.register(fastifyStatic, {
    root: BROWSER_DIR,
    prefix: '/static'
  })

  app.register(fastifyUniversalPlugin, {
    serverModule: AppServerModuleNgFactory,
    document: template,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at http://localhost:${port}/`);
  });
}

bootstrap();
    