import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass, plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {ValidationExeption} from "../exeption/validation.exeption";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
   async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToInstance(metadata.metatype, value);
        const errors = await validate(obj);
        if(errors.length) {
            const messages = errors.map(error => {
                return `${error.property} - ${Object.values(error.constraints).join(', ')}`
            })
            throw  new ValidationExeption(messages)
        }
        return value;
    }
}
