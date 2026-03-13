import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  Equal,
  FindManyOptions,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';

function normalizeValue(value: any) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(Number(value))) return Number(value);
  return value;
}

export const ParsedQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FindManyOptions<any> => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const options: FindManyOptions<any> = {};

    // SELECT
    if (query.select) {
      options.select = query.select.split(',').map((f: string) => f.trim());
    }

    // RELATIONS
    if (query.relations) {
      options.relations = query.relations
        .split(',')
        .map((r: string) => r.trim());
    }

    // ORDER
    if (query.order) {
      const [field, direction] = query.order.split('.');
      options.order = {
        [field]: direction?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
      };
    }

    // WHERE
    if (query.where) {
      const fields = query.where.split('.') as string[];
      const value = normalizeValue(fields[fields.length - 1]);
      const key = fields[0];

      if (fields.length == 2) {
        options.where = { [key]: Equal(value) };
        return options;
      }

      const operation = fields[1];

      const where: Record<string, any> = {
        eq: { [key]: Equal(value) },
        like: { [key]: Like(`%${value}%`) },
        in: {
          [key]: In(String(value).split(',').map(normalizeValue)),
        },
        gt: { [key]: MoreThan(value) },
        gte: { [key]: MoreThanOrEqual(value) },
        lt: { [key]: LessThan(value) },
        lte: { [key]: LessThanOrEqual(value) },
      };

      options.where = where[operation];
    }

    return options;
  },
);
