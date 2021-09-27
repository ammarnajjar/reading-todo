import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => Int, { description: 'book id' })
  id: number;

  @Field(() => String, { description: 'book title' })
  title: string;

  @Field(() => String, { nullable: true, description: 'book isbn' })
  isbn: string;

  @Field(() => String, { nullable: true, description: 'book author' })
  author: string;

  @Field(() => String, { nullable: true, description: 'book category' })
  category: string;

  @Field(() => Int, { nullable: true, description: 'book year' })
  year: number;
}
