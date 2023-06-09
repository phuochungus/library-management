import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';
import MongoEntity from './MongoEntity';
import { ObjectID } from 'mongodb';

@Entity()
export default class BookBorrowRecord implements MongoEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  bookId: string;

  @Column()
  userId: string;

  @Column()
  borrowSessionId: ObjectID;

  @Column()
  bookName: string;

  @Column()
  authorName: string;

  @Column()
  genreNames: string[];

  @CreateDateColumn()
  createdDate: Date;
}
