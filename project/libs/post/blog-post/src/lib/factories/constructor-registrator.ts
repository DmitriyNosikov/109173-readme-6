export class ConstructorRegistrator<K, C> {
  private constructorsStore: Map<K, C>;

  constructor(constructorsEnum: Map<K, C>) {
    this.register(constructorsEnum);
  }

  private register(constructorsEnum: Map<K, C>) {
    Object.entries(constructorsEnum).forEach(([type, constructor]) => {
      this.constructorsStore.set(type as K, constructor);
    })
  }

  public getConstructorsList(): Map<K, C> {
    return this.constructorsStore;
  }
}
