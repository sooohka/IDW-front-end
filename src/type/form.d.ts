interface SignUpFormValues {
  email: string;
  emailHost: string;
  gender: "male" | "female";
  password: string;
  password2: string;
  yearOfBirth: number | undefined;
}
interface CreateFormValues {
  title: string;
  desc: string;
  category: number;
  files: { url: string; name: string }[];
}
