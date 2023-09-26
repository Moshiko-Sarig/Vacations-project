import { Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from "chart.js/auto"
import "./Stats.css";
import Vacation from "../../Models/Vaction";


interface AdminReportsState {
    reports: { vacation_id: number, description_destination: string, vacation_followers: number }[];
    isEmpty: boolean;
}

class Stats extends Component<{}, AdminReportsState>{
    constructor() {
        super({});
        this.state = ({ reports: [], isEmpty: false });
    }
   

    componentDidMount = async () => {
        try {
            const response = await axios.get<any>(`http://localhost:4000/api/vactions`);
            const allVacations: Vacation[] = response.data;
            let empty = false;
            if (allVacations.length <= 0)
                empty = true;
            this.setState({ reports: response.data, isEmpty: empty });
        }
        catch (error) {
            console.log(error);
        }
    }


    chartData = () => {
        return {
            labels: this.state.reports.map(rep => rep.description_destination),
            datasets: [
                {
                    label: "Followers Count",
                    data: this.state.reports.map(rep => rep.vacation_followers),
                    barPercentage: 0.4,
                    backgroundColor: 'aqua',
                    hoverBackgroundColor: 'green',
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 5,
                },
            ],
        }
    }


    BarChart = () => {
        return <div className="chartJS">
            <Bar data={this.chartData()} options={{ maintainAspectRatio: false }} />
        </div>
    }


    render(): JSX.Element {
        ChartJS.register(CategoryScale);
        return (
            <div className="Stats">
                <h1 className="StatsTitle">Vacation Followers</h1>
                <div>
                    {this.state.reports.length > 0 ?
                        this.BarChart()
                        :
                        null
                    }
                    {this.state.isEmpty ?
                        <h2 className="noData">No one is following any vacations !</h2>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}


export default Stats;