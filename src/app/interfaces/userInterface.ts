export interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    password: string;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
  }