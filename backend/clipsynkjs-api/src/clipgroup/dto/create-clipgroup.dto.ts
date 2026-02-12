

export class CreateClipgroupDto {
    name: string;
    description?: string;
    owner: string;
    isActive?: boolean;
    isPublic?: boolean
    isDefaultGroup?: boolean;
    devices?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
