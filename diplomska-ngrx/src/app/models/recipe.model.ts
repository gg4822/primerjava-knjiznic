export interface Recipe {
  id: number;
  image: string;
  ingredients: string[];
  instructions: Instructions[];
  times: string[];
  title: string;
}

export interface Instructions {
  text: string;
}
