class Vaction {
    constructor(
        public vacation_id: number,
        public vacation_description: string,
        public description_destination: string,
        public vacation_picture: string,
        public vacation_start_date: string,
        public vacation_end_date: string,
        public vacation_price: number,
        public vacation_followers: number

    ) { }
}

export default Vaction;