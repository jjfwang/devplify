import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrderByParams {
  @Field()
  field: string;

  @Field()
  direction: string;
}
