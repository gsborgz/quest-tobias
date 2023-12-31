export class QueryData<Entity> {
  public skip?: number;
  public take?: number;
  public order?: { [P in keyof Entity]?: 'ASC' | 'DESC' };
  public where?: { [P in keyof Entity]?: any };
}

export class BaseMessage {

  public message: string;

  constructor(message: string) {
    this.message = message;
  }

}

export type GenericObject = Record<string, any>;