import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Logger } from '@nestjs/common';

class InvalidConfigurationException extends Error {
  constructor(validationErrors: ValidationError[]) {
    const errors = errorSerializer(validationErrors);
    for (const error of errors) {
      Logger.error(error, InvalidConfigurationException.name);
    }
    super('Invalid configurations');
  }
}

export const errorSerializer = (
  validationErrors: ValidationError[],
): string[] => {
  const errors = [];

  for (const error of validationErrors) {
    if (error.constraints) {
      errors.push(...Object.values(error.constraints));
    }
    if (error.children) {
      errors.push(...errorSerializer(error.children));
    }
  }

  return errors;
};

export const validateConfig = async (
  validationClass,
  plainConfig: any,
): Promise<any> => {
  const instance = plainToInstance(validationClass, plainConfig);
  const errors = await validate(instance);

  if (errors.length > 0) {
    throw new InvalidConfigurationException(errors);
  }

  return instance;
};
