import {courses} from "../data/courses";
import {comments} from "../data/comments";

export const getCourse = async (slug) => {
    const data = await courses.filter((course) => course.slug === slug);
    return data?.[0];
  };


export const getLesson = async (courseSlug, lessonSlug) => {
    const data = await courses
      .flatMap(
        (course) =>
          course.slug === courseSlug &&
          course.lessons.filter((lesson) => lesson.slug === lessonSlug)
      )
      .filter(Boolean);
    return data?.[0];
  };
  
  export const getComments = async (lessonSlug) => {
    const data = await comments.filter(
      (comment) => comment.lesson.slug === lessonSlug
    );
    return data;
  };
  
  export const createComment = async (data) => {
    await comments.push(data);
  };
  