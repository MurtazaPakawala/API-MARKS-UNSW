import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  @Get()
  getCourseMarks(@Query('code') code: number) {
    return this.courseService.getMarks('', '', code);
  }
}
