class Precinct{
    constructor(id) {
        this.id = id;
        this.layer=null;
        this.PresidentialVote={};
        this.Demographic={};
        this.hasData=false;
        this.boundary=null;
        this.neighbour=[];
        this.PrecinctPolygon={};
        this.PolygonCoord={};

    }
    setDemographic(type,value){
        this.Demographic[type]=value;
    }
    getDemographic(type){
        return this.Demographic[type];
    }
    addPrecincePolygon(id,polygon){ //a precinct may have more than one polygon
        this.PrecinctPolygon[id]=polygon;
    }
    getPrecinctPolygon(pt){
        var ifList={};
        console.log(pt.lat);

       for(var a in this.PrecinctPolygon){
           console.log(this.PrecinctPolygon[a]);
           console.log(this.PrecinctPolygon);
           // console.log(this.PrecinctPolygon[a][0].lat);
           for (var c = false, i = -1, l = this.PrecinctPolygon[a].length, j = l - 1; ++i < l; j = i)
               ((this.PrecinctPolygon[a][i].lat <= pt.lat && pt.lat < this.PrecinctPolygon[a][j].lat) || (this.PrecinctPolygon[a][j].lat <= pt.lat && pt.lat < this.PrecinctPolygon[a][i].lat))
               && (pt.lng < (this.PrecinctPolygon[a][j].lng - this.PrecinctPolygon[a][i].lng) * (pt.lat - this.PrecinctPolygon[a][i].lat) / (this.PrecinctPolygon[a][j].lat - this.PrecinctPolygon[a][i].lat) + this.PrecinctPolygon[a][i].lng)
               && (c = !c);
           console.log(c);
           ifList[a]=c;
           // return c;
       }
       console.log(ifList);
       for(var i in ifList){
           if(ifList[i]==true){
               return i;
           }
       }

    }
    removePrecincePolygon(ID){
        if (ID in this.precincts){
            delete this.PrecinctPolygon[ID];
        }
    }
    getPrecinctPolygons(){
        return this.PrecinctPolygon;
    }

    addNeighbor(neighbor){
        this.neighbour.push(neighbor);
    }
    removeNeighbor(neighbor){
        if(neighbourlist.indexOf(List[i])>=0){
            delItem(neighbor, this.neighbour);
        }
        // delItem(neighbor, this.neighbour);
    }
    getNeighbours(){
        return this.neighbour;
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
