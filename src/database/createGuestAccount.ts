import { Comment, Issue, Project, User } from 'entities';
import { ProjectCategory } from 'constants/projects';
import { IssueType, IssueStatus, IssuePriority } from 'constants/issues';
import { createEntity } from 'utils/typeorm';

const seedUsers = (): Promise<User[]> => {
  const users = [
    createEntity(User, {
      email: 'sunidhipathak.larklabsal@gmail.com',
      name: 'Sunidhi Pathak ⭐',
      avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    }),
    createEntity(User, {
      email: 'shamilpk.larklabsai@gmail.com',
      name: 'Muhammed Shamil P K',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'shibilmuhammed.larklabsai@gmail.com',
      name: 'Muhammad Shibil Ch',
      avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
    }),
    createEntity(User, {
      email: 'asjadzaki.larklabsai@gmail.com',
      name: 'Mohammed Asjad Zaki',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'parasakthikumark.larklabsai@gmail.com',
      name: 'Parasakthikumar K',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'balavedhaa.larkLabsAI@gmail.com',
      name: 'Balavedhaa S',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'hemanth.larklabsai@gmail.com',
      name: 'Hemanth kumar J',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'raguladhithya.larklabsai@gmail.com',
      name: 'Ragul Adhithya M',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'vigneswaran.larklabsai@gmail.com',
      name: 'Vigneswaran S',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'mukilarasu.larkLabsAI@gmail.com',
      name: 'Mukilarasu Rasu',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'sirajudeen.larklabsai@gmail.com',
      name: 'Sirajudeen G',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'nishanth.larklabsai@gmail.com',
      name: 'Nishanth S',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'ruksaana.larkLabsAI@gmail.com',
      name: 'Ruksaana R',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
  ];
  return Promise.all(users);
};

const seedProject = (users: User[]): Promise<Project> =>
  createEntity(Project, {
    name: 'LarkLabs AI Development Suite',
    url: 'https://www.larklabs.ai',
    description:
      'Collaborate, track, and manage AI product and software development initiatives in LarkLabs AI.',
    category: ProjectCategory.SOFTWARE,
    users,
  });

const seedIssues = (project: Project): Promise<Issue[]> => {
  const { users } = project;

  const issues = [
    createEntity(Issue, {
      title: 'Setup project repositories and CI/CD pipelines.',
      type: IssueType.TASK,
      status: IssueStatus.INPROGRESS,
      priority: IssuePriority.HIGH,
      listPosition: 1,
      description: `<p>Initial setup for LarkLabs AI development stack and GitHub repositories.</p>`,
      estimate: 5,
      timeSpent: 2,
      reporterId: users[0].id,
      project,
      users: [users[0], users[1]],
    }),
    createEntity(Issue, {
      title: 'Design initial UI screens for intern dashboard.',
      type: IssueType.STORY,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.MEDIUM,
      listPosition: 2,
      description: `<p>Mockup UI designs for the intern dashboard managed under LarkLabs AI.</p>`,
      estimate: 8,
      timeSpent: 0,
      reporterId: users[0].id,
      project,
      users: [users[5], users[6]],
    }),
    createEntity(Issue, {
      title: 'Create user authentication module with JWT.',
      type: IssueType.TASK,
      status: IssueStatus.SELECTED,
      priority: IssuePriority.HIGHEST,
      listPosition: 3,
      description: `<p>Authentication and access management for interns, team leads, and mentors.</p>`,
      estimate: 6,
      timeSpent: 3,
      reporterId: users[0].id,
      project,
      users: [users[2], users[3]],
    }),
  ];
  return Promise.all(issues);
};

const seedComments = (issues: Issue[], users: User[]): Promise<Comment[]> => {
  const comments = [
    createEntity(Comment, {
      body: 'This is a key setup task to unblock the rest of the sprint.',
      issueId: issues[0].id,
      userId: users[0].id,
    }),
    createEntity(Comment, {
      body: 'Make sure to use TailwindCSS and responsive design practices.',
      issueId: issues[1].id,
      userId: users[0].id,
    }),
    createEntity(Comment, {
      body: 'Use bcrypt and JWT for secure intern login.',
      issueId: issues[2].id,
      userId: users[0].id,
    }),
  ];
  return Promise.all(comments);
};

const createGuestAccount = async (): Promise<User> => {
  const users = await seedUsers();
  const project = await seedProject(users);
  const issues = await seedIssues(project);
  await seedComments(issues, project.users);
  return users[0]; // Highlighted: Sunidhi Pathak
};

export default createGuestAccount;
