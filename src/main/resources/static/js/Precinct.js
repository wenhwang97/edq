class Precinct{
    constructor(id) {
        this.id = id;
        this.layer=null;
        this.PresidentialVote={
        };
        this.hasData=false;
        this.boundary=null;

    }
    setPrecinctLayer(layer){
        this.layer= layer;
    }
    setBoundary(Coord){
        this.boundary=Coord;
    }
    getBoundary(Coord){
        return this.boundary;
    }
    getPrecinctLayer(){
        return this.layer;
    }
    setPresidentialVote(VoteType, vote){
        this.PresidentialVote[VoteType]=vote;
        this.hasData=true;
    }
    setDemocraticVote(DVote){
        this.PresidentialVote[democraticVote]=DVote;
        this.hasData=true;
    }
    setGreenVote(GVote){
        this.PresidentialVote[greenVote]=GVote;
        this.hasData=true;
    }
    setLibertarianVote(LVote){
        this.PresidentialVote[libertarianVote]=LVote;
        this.hasData=true;
    }
    setRepublicanVote(RVote){
        this.PresidentialVote[republicanVote]=RVote;
        this.hasData=true;
    }
    getPresidentialVote(vote){
        return this.PresidentialVote[vote];
    }
    getDemocraticVote(){
        return this.PresidentialVote[democraticVote];
    }
    getGreenVote(){
        return this.PresidentialVote[greenVote];
    }
    getLibertarianVote(){
        return this.PresidentialVote[libertarianVote];
    }
    getRepublicanVote(){
        return this.PresidentialVote[republicanVote];
    }

    // addPrecinctLayer(ID, layer){
    //     this.precinctLayers[ID] = layer;
    // }

    // removePrecinctLayer(ID){
    //     if (ID in this.precinctLayers){
    //         delete this.precinctLayers[ID];
    //     }
    // }

    // hasPrecincts(){
    //     if(Object.entries(this.precinctLayers).length === 0){
    //         return false;
    //     }else{
    //         return true;
    //     }
    // }

    getLayer(){
        return this.layer;
    }


}
