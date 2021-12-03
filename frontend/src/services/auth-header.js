export default function authHeader(){
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.token)
    {
        console.log("Header",user);
        return {AuthorizationGrits: 'Grits ' + user.token};
    }
    else
    {
        return {};
    }
}