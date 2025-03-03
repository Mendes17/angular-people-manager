export interface IContact {
  id?: number;
  tipoContato: string;
  contato: string;
  pessoa: {
    id: number;
  };
}
