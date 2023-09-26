class UserModel {
    constructor(
        public user_id: number,
        public is_admin: boolean,
        public user_name: string,
        public first_name: string,
        public last_name: string,
        public password: number,
        public token :string,
        public vacations_followed:Array<string>	,

    ) { }


}



export default UserModel; 