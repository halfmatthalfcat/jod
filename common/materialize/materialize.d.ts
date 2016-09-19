export namespace Materialize {
  export interface Materialize {
    toast(message: string, displayLength: number, className?: string, completeCallback?: Function): void;
    updateTextFields(): void;
  }
}