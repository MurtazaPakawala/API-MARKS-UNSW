import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  @Get('marks')
  getCourseMarks(
    @Query('code') code: number,
    @Query('zid') zid: string,
    @Query('password') password: string,
    @Query('term') term: 'string',
  ) {
    const marks = this.courseService.getMarks(zid, password, code, term);
    return marks;
  }
}
