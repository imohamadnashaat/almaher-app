import { createContext, useContext, useEffect, useState } from 'react';

const courseContext = createContext<any>({});

export const CourseProvider = ({ children }: any) => {
  const res = useCourseProvider();

  return (
    <courseContext.Provider value={res as any}>
      {children}
    </courseContext.Provider>
  );
};

export function useSidebarStatus() {
  return useContext(courseContext);
}

export function useCourseProvider() {
  const [course, setCourse] = useState(() => {
    return localStorage.getItem('selectedCourseName');
  });

  return { course, changeName: setCourse };
}
