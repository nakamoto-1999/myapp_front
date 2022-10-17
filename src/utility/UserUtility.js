
export const isUserIdExist = (users = [] , userId) => {
    let firstIndex = 0;
    let lastIndex = users.length - 1;
    while(lastIndex - firstIndex >= 0){
        let middleIndex = Math.floor((firstIndex + lastIndex ) / 2);
        let middleUserId = users[middleIndex].userId;
        if(middleUserId === userId){
            return true;
        }
        else if(middleUserId < userId)
        {
            firstIndex = middleIndex + 1;
        }
        else
        {
            lastIndex = middleIndex - 1;
        }  
    }
    return false;
}