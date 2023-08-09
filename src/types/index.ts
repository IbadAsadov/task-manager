enum TaskStatus {
    "new" = "new",
    "in_progress" = "in_progress",
    "done" = "done",
}

enum Role {
    "admin" = "admin",
    "user" = "user",
    "organization" = "organization",
}

interface IUser {
    id?: number;
    name: string;
    surname: string;
    role: Role;
    email: string;
    password: string;
    organizationId: string;
}

interface IOrganization {
    id?: number;
    name: string;
    phone: string;
    address: string;
}

interface ITask {
    id?: number;
    title: string;
    description: string;
    deadline: string;
    status: TaskStatus;
    userIds: number[];
    organizationId: number;
}

export type { IUser, IOrganization, ITask, TaskStatus, Role };

export { Role as Roles };
