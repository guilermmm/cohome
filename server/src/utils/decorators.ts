import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const SKIP_VALIDATION_KEY = 'skipValidation';
export const SkipValidation = () => SetMetadata(SKIP_VALIDATION_KEY, true);
