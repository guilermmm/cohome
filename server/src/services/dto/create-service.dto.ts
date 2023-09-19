export class CreateServiceDto {
  name: string;
  serviceData: {
    description?: string;
  };
  groupId: string;
}
