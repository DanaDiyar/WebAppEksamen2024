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
    <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
      <aside className="border-r border-slate-200 pr-6">
        <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
        <ul data-testid="lessons">
          {content.lessons.map((lesson) => (
            <li
              className={`text-sm mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
              }`}
              key={lesson.id}
            >
              <Link
                href={`/kurs/${courseSlug}/${lesson.slug}`}
                data-testid="lesson_url"
                className="block h-full w-full"
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
