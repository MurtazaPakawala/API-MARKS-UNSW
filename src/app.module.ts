import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [LoginModule, CoursesModule],
})
export class AppModule {}
