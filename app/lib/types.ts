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
  create_date: string;
  level_id: string;
}

export interface Course {
  course_id: number;
  course_name: string;
  start_date: string;
  end_date: string;
  num_of_session: number;
  create_date: string;
}
