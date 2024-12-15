export type Dialect = 'standard' | 'moroccan' | 'tunisian';

export interface DialectWord {
  standard: string;
  moroccan?: string;
  tunisian?: string;
}

export interface DialectInfo {
  id: Dialect;
  name: string;
  nameFr: string;
  flag: string;
}