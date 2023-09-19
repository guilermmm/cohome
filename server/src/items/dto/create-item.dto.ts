export class CreateItemDto {
  name: string;
  itemData: {
    value?: string;
    description?: string;
  };
  categoryId: string;
  groupId: string;
}
