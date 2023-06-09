import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import mongoose from 'mongoose';
import BookReturnSession from 'src/entities/BookReturnSession';
import { MongoRepository, ObjectLiteral } from 'typeorm';

@Injectable()
export class BookReturnSessionsService {
  constructor(
    @InjectRepository(BookReturnSession, 'mongoDB')
    private bookReturnSessionsRepository: MongoRepository<BookReturnSession>,
  ) {}

  async findAll() {
    return await this.bookReturnSessionsRepository.find({
      order: { createdDate: 'DESC' },
    });
  }
  async findAllWithQueryParams(
    name: string = '',
    username: string = '',
    createdDateString: string | undefined,
  ) {
    let aggregateArray: ObjectLiteral[];

    if (createdDateString) {
      const createdDate = new Date(createdDateString);
      aggregateArray = [
        {
          $addFields: {
            day: { $dayOfMonth: '$createdDate' },
            month: { $month: '$createdDate' },
            year: { $year: '$createdDate' },
          },
        },
        {
          $match: {
            name: {
              $regex: `${name}`,
              $options: 'i',
            },
            username: {
              $regex: `${username}`,
              $options: 'i',
            },
            day: createdDate.getDate(),
            month: createdDate.getMonth() + 1,
            year: createdDate.getFullYear(),
          },
        },
      ];
    } else {
      aggregateArray = [
        {
          $addFields: {
            day: { $dayOfMonth: '$createdDate' },
            month: { $month: '$createdDate' },
            year: { $year: '$createdDate' },
          },
        },
        {
          $match: {
            name: {
              $regex: `${name}`,
              $options: 'i',
            },
            username: {
              $regex: `${username}`,
              $options: 'i',
            },
          },
        },
      ];
    }

    return await this.bookReturnSessionsRepository
      .aggregate(aggregateArray)
      .toArray();
  }

  async findOne(sessionId: string) {
    const session = await this.bookReturnSessionsRepository
      .aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(sessionId),
          },
        },
        {
          $lookup: {
            from: 'book_return_record',
            localField: '_id',
            foreignField: 'returnSessionId',
            as: 'records',
          },
        },
      ])
      .toArray();

    return session;
  }
}
