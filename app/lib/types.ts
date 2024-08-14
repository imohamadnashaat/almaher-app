export interface Person {
  person_id: number;
  type_id: string;
  first_name: string;
  last_name: string;
  father_name: string;
  home_number: string;
  phone_number: string;
  job: string;
  address: string;
  bdate: string;
  priority_id: string;
  status: boolean;
  level_id: string;
  create_date: string;
}

export interface Course {
  course_id: number;
  course_name: string;
  start_date: string;
  end_date: string;
  num_of_session: number;
  create_date: string;
}

export interface Period {
  time_name: string;
  create_date: string;
}

export interface Position {
  position_name: string;
  create_date: string;
}

export interface AttendanceDetail {
  id: number;
  day: string;
  status: boolean;
}

export interface Attendance {
  person_id: number;
  person_name: string;
  session_number: number;
  attendance_details: AttendanceDetail[];
}

export interface Exam {
  exam_id: number;
  type_id: string;
  time_id: string;
  student_id: number;
  session_id: number;
  mark: number;
  create_date: string;
}

export interface ExamDetails {
  student_id: number;
  student_name: string;
  session_number: number;
  exams: Exam[];
}

export interface Result {
  result_id: number;
  student_id: number;
  session_id: number;
  theoretical_mark: number;
  practical_mark: number;
  result: number;
  attendance: number;
  result_type: string;
  student_pass: boolean;
  create_date: string;
  // Optional fields for details
  student_name?: string;
  session_number?: number;
  level_name?: string;
}

export interface Session {
  session_id: number;
  teacher_full_name: string;
  session_number: number;
  create_date: string;
  course_id: number;
  level_id: string;
  position_id: string;
  time_id: string;
  teacher_id: number;
}

export interface SessionDetails {
  session_id: number;
  session_number: number;
  create_date: string;
  course_id_id: number;
  level_id_id: string;
  position_id_id: string;
  teacher_id_id: number;
  time_id_id: string;
  teacher_full_name: string;
  total_students: number;
  avg_student_bdate_year: number;
}

export interface SessionStudent {
  id: number;
  student_full_name: string;
  session_data: Session;
  create_date: string;
  session_id: number;
  student_id: number;
}

export interface SessionStudentDetails {
  id: number;
  student_full_name: string;
  session_data: Session;
  student_data: Person;
  create_date: string;
  session_id: number;
  student_id: number;
}

export interface SessionAvailableStudent {
  person_id: number;
  first_name: string;
  last_name: string;
  bdate: string;
  level_id_id: string;
}
