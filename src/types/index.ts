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

interface IUserData {
    name: string;
    surname: string;
    role: Role;
    email: string;
    password: string;
    organizationId: number;
}

interface IUser extends IUserData {
    id: number;
    organization?: IOrganization;
}

interface IOrganizationData {
    organization_name: string;
    phone: string;
    address: string;
}

interface IOrganization extends IOrganizationData {
    id: number;
}

interface ITaskData {
    title: string;
    description: string;
    deadline: string;
    status: TaskStatus;
    userIds: number[];
    organizationId: number;
}

interface ITask extends ITaskData {
    id: number;
    organization?: IOrganization;
}

interface IOption {
    value: number | string;
    label: string;
}

export type { IUserData, IUser, IOrganizationData, IOrganization, ITaskData, ITask, TaskStatus, Role, IOption };

export { Role as Roles, TaskStatus as TaskStatuses };
