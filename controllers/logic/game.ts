class villager{
    public role: string;
    public alive: boolean;
    public constructor(role: string, alive: boolean){
        this.role = role;
        this.alive = false
    }
}
class seer extends villager{
    constructor(role: string, alive:boolean){
        super(role, alive);
    }
    public reveal(){
        
    }

}