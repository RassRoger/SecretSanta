export interface MembersDto {
  name: string,
  email: string,
  personExchange: string | null,
  blacklist: string | null,
  admin: boolean,
  groupId: number | null,
  groupName: string | null
}
