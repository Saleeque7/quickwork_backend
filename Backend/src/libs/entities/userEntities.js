export const UserData = {
  name: "",
  email: "",
  password: "" | null,
  phone: "",
  role: "",
  job_role: "",
  skills: [],
  about: "",
  isAdmin: false,
  isBlock: false,
  islike: false,
  createdAt: new Date(),
};

export class UserProfile {
  constructor({
    name = "",
    email = "",
    password = null,
    phone = "",
    role = "",
    job_role = "",
    skills = [],
    about = "",
    isAdmin = false,
    isBlock = false,
    islike = false,
    createdAt = new Date(),
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.role = role;
    this.job_role = job_role;
    this.skills = skills;
    this.about = about;
    this.isAdmin = isAdmin;
    this.isBlock = isBlock;
    this.islike = islike;
    this.createdAt = createdAt;
  }
}
