import { Address } from "./address";
import { Role } from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    phone: string;
    enabled: boolean = false;
    addresses: Address[] = [];
    role: Role = new Role();

    addAddress(address: Address): number{
        return this.addresses.push(address);
    }

    deleteAddress(index: number){
        this.addresses.splice(index,1);
    }
}
