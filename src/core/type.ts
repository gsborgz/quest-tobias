export class QueryData<Entity> {
  public skip?: number;
  public take?: number;
  public where?: Partial<Entity>;
}

export class BaseMessage {

  public message: string;

}