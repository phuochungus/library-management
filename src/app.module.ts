import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { GenresModule } from './genres/genres.module';
import { BookBorrowRecordsModule } from './book-borrow-records/book-borrow-records.module';
import { ConfigModule } from '@nestjs/config';
import { BusinessValidateModule } from './business-validate/business-validate.module';
import { RulesModule } from './rules/rules.module';
import { BookReturnRecordsModule } from './book-return-records/book-return-records.module';
import { FineReceiptsModule } from './fine-receipts/fine-receipts.module';
import { AuthModule } from './auth/auth.module';
import { BookShelfModule } from './book-shelf/book-shelf.module';
import { ReportsModule } from './reports/reports.module';
import Admin from './entities/Admin';
import Book from './entities/Book';
import Genre from './entities/Genre';
import User from './entities/User';
import BookReturnRecord from './entities/BookReturnRecord';
import BookBorrowRecordSchema from './entities/BookBorrowRecord';
import FineReceipt from './entities/FineReceipt';
import Rule from './entities/Rule';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { BookReturnSessionsModule } from './book-return-sessions/book-return-sessions.module';
import { BookBorrowSessionsModule } from './book-borrow-sessions/book-borrow-sessions.module';
import BookReturnSession from './entities/BookReturnSession';
import BookBorrowReturnHistory from './entities/BookBorrowReturnHistory';
import BookBorrowSession from './entities/BookBorrowSession';
import { BookBorrowReturnHistoriesModule } from './book-borrow-return-histories/book-borrow-return-histories.module';
import { Module } from '@nestjs/common';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    BooksModule,
    AdminsModule,
    GenresModule,
    BookBorrowRecordsModule,
    BusinessValidateModule,
    RulesModule,
    BookReturnRecordsModule,
    FineReceiptsModule,
    AuthModule,
    BookShelfModule,
    ReportsModule,
    MailModule,
    BookReturnSessionsModule,
    BookBorrowSessionsModule,
    BookBorrowReturnHistoriesModule,
    TypeOrmModule.forRoot({
      logging: true,
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Book, User, Admin, Genre],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      logging: true,
      type: 'mongodb',
      name: 'mongoDB',
      url: process.env.MONGO_URL,
      database: 'library2',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [
        BookBorrowRecordSchema,
        BookReturnRecord,
        FineReceipt,
        Rule,
        BookBorrowSession,
        BookReturnSession,
        BookBorrowReturnHistory,
      ],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      },
    }),
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
