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
    <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
      <aside className="border-r border-slate-200 pr-6">
        <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
        <ul data-testid="lessons">
          {content.lessons.map((lesson) => (
            <li
              className="text-sm mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2"
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
      <section>
        <h2 className="text-2xl font-bold" data-testid="course_title">
          {content.title}
        </h2>
        <p className="mt-4 font-semibold leading-relaxed" data-testid="course_description">
          {content.description}
        </p>
      </section>
      <aside data-testid="enrollments" className="border-l border-slate-200 pl-6">
        <h3 className="mb-4 text-base font-bold">Deltakere</h3>
        <ul data-testid="course_enrollments">
          {users.map((user) => (
            <li className="mb-1" key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default CourseOverview;
