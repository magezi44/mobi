import { Exclude } from 'class-transformer';
export class SignUpEntity {
    id: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    password: string;

    constructor(partial: Partial<SignUpEntity>) {
        Object.assign(this, partial);
    }
}
  
