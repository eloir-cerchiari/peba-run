export class LocalStorageRepo{
	insert(key:string, value:string){
		return localStorage.setItem(key, value);
	}
	get(key:string){
		return localStorage.getItem(key);
	}
	delete(key:string){
		return localStorage.removeItem(key);
	}
	clearAll(){
		return localStorage.clear();
	}
}

export function makeLocalStorageRepo(){
	return new LocalStorageRepo();
}