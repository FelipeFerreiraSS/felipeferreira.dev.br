import { JwtPayload } from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload | string;
  }
}
