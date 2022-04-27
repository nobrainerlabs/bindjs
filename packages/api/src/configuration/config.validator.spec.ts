import 'reflect-metadata';
import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  validate,
  ValidateNested,
} from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';
import { errorSerializer } from './config.validator';

class SomeValidation {
  @IsString()
  @IsNotEmpty()
  test: string;
}

class SomeNestedValidation {
  @IsInt()
  id: number;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SomeValidation)
  nested: SomeValidation;
}

describe('config validator', () => {
  it('serialize validation errors', async () => {
    const instance = plainToInstance(SomeValidation, {});
    const errors = await validate(instance);

    const serialized = errorSerializer(errors);
    expect(serialized).toHaveLength(2);
    expect(serialized).toStrictEqual([
      'test should not be empty',
      'test must be a string',
    ]);
  });

  it('serialize nested validation errors', async () => {
    const instance = plainToInstance(SomeNestedValidation, {
      nested: {
        test: 2,
      },
    });
    const errors = await validate(instance);

    const serialized = errorSerializer(errors);
    expect(serialized).toHaveLength(2);
    expect(serialized).toStrictEqual([
      'id must be an integer number',
      'test must be a string',
    ]);
  });
});
