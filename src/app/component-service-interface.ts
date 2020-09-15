export interface ComponentOperations {
    getAll();
    getObject(id: number);
    delete(id: number);
    put(o: any);
    post(o: any);
}