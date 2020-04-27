class County{
    constructor(id) {
        this.id = id;
        this.layer=null;
        this.precincts = {};   //precinctlayer
    }
    setCountyLayer(layer){
        this.layer= layer;
    }

    addPrecinct(ID, layer){
        this.precincts[ID] = layer;
    }

    removePrecinct(ID){
        if (ID in this.precincts){
            delete this.precincts[ID];
        }
    }

    hasPrecincts(){
        if(Object.entries(this.precincts).length === 0){
            return false;
        }else{
            return true;
        }
    }

    getLayer(){
        return this.layer;
    }
    getPrecinctByID(PrecinctID){
        if (PrecinctID in this.precincts){
            return this.precincts[PrecinctID];
        }else{
            return null;
        }
    }

    getPrecincts(){
        return this.precincts;
    }
}
