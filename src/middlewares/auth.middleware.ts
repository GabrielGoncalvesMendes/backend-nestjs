import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import 'dotenv/config';
import { URLSearchParams } from 'url';
import {
  HttpStatus,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';

export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedException({
      status: HttpStatus.UNAUTHORIZED,
      error: 'Não autorizado',
    });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new UnauthorizedException({
      status: HttpStatus.UNAUTHORIZED,
      error: 'Não autorizado',
    });
  }

  const params = new URLSearchParams();
  params.append('client_id', process.env.CLIENT_ID),
    params.append('client_secret', process.env.CLIENT_SECRET),
    params.append('token', token);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const { data } = await axios.post(
      process.env.SERVICE_AUTH_CHECK_URL,
      params,
      config,
    );

    if (!data.active || data.active === false) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Não autorizado',
      });
    }
  } catch (error) {
    if (error.response.status === 502) {
      throw new ServiceUnavailableException({
        status: HttpStatus.BAD_GATEWAY,
        error: 'SSO Indisponivel',
      });
    }

    return response
      .status(error.response.status)
      .json({ message: error.response.statusText })
      .end();
  }

  next();
}
