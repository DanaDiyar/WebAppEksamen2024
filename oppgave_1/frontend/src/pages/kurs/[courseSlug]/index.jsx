"use client";

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { users } from "../../../data/users";
import { getCourse } from "@/services/courseService";
 


function CourseOverview() {
  const [content, setContent] = useState(null);
  const router = useRouter();
  const { courseSlug } = router.query;

  useEffect(() => {
    if (router.isReady && courseSlug) {
      const getContent = async () => {
        const data = await getCourse(courseSlug);
        setContent(data);
      };
      getContent();
    }
  }, [courseSlug, router.isReady]);

  if (!content) return <p>Loading...</p>;

  return (
    <div className="course_overview_grid">
      <aside className="course_overview_aside">
        <h3 className="lesson_heading">Leksjoner</h3>
        <ul data-testid="lessons">
          {content.lessons.map((lesson) => (
            <li
              className="lesson_item"
              key={lesson.id}
            >
              <Link
                href={`/kurs/${courseSlug}/${lesson.slug}`}
                data-testid="lesson_url"
                className="lesson_link"
              >
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <section>
        <h2 className="course_title" data-testid="course_title">
          {content.title}
        </h2>
        <p className="course_description" data-testid="course_description">
          {content.description}
        </p>
      </section>
      <aside data-testid="enrollments" className="enrollment_aside">
        <h3 className="lesson_heading">Deltakere</h3>
        <ul data-testid="course_enrollments">
          {users.map((user) => (
            <li className="enrollment-item" key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default CourseOverview;
