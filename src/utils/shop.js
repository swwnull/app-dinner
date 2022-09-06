const shoplists = []


export function getshoplists() {
  return shoplists
}
export function addgoods(list) {
    console.log(list)
    if(shoplists.find(x => x.id == list.id))
    {
      for (let item of shoplists) {
        if (item.id === list.id) {
          item.num = list.num;
        }
        console.log(shoplists)
    }
    }
    else{
        shoplists.push(list)
    }
    
    return shoplists
  }

  export function deletegood(list) {
    console.log(list)
    if(list.num!==0){
      for (let item of shoplists) {
        if (item.id === list.id) {
          item.num = list.num;
        }
        
    }
    }
    else{
      if(shoplists){ 
        list.num="1"
        let i=shoplists.map(item => item.id).indexOf(list.id)
        shoplists.splice(i, 1)
        
      }
      else{
        shoplists=[]
    }
    

    }
    
    return shoplists
  }

 