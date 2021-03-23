import { Course } from "./Course";

export interface CourseInstance {
    id?: number;
    startDate: Date;
    course: Course;
}