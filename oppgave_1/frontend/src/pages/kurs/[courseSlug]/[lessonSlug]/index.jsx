"use client";

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { getCourse } from "@/services/courseService";
import Lesson from "../../../../components/lesson";

function LessonView() {
  const [content, setContent] = useState(null);
  const router = useRouter();
  const { courseSlug, lessonSlug } = router.query; // SRC: kilde: https://chatgpt.com//

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

  const lesson = content.lessons.find((lesson) => lesson.slug === lessonSlug);

  return (
    <div className="lesson_view_grid">
      <aside className="lesson_view_aside">
        <h3 className="lesson_heading">Leksjoner</h3>
        <ul data-testid="lessons">
          {content.lessons.map((lesson) => (
            <li
              className={`lesson_item ${
                lessonSlug === lesson.slug ? "active_lesson" : "inactive_lesson"
              }`}
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
      <article>
        {lesson ? <Lesson lesson={lesson} /> : <p>Lesson not found</p>}
      </article>
    </div>
  );
}

export default LessonView;
