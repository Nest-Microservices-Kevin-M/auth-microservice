import 'dotenv/config';
import * as joi from 'joi';

interface IEnvs {
  DATABASE_URL: string;
  NATS_SERVERS: string[];
  JWT_SECRET: string;
}

const schema = joi
  .object({
    DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown();

const { error, value } = schema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) throw new Error(error.message);

const envs: IEnvs = value;

export { envs };
