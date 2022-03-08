import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { AD_VALIDATION_ERROR } from './ad-validation.constants';

@Injectable()
export class IdValidationPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (metadata.type === 'param' && Types.ObjectId.isValid(value)) {
			return value
		}
		throw new BadRequestException(AD_VALIDATION_ERROR)
	}
}