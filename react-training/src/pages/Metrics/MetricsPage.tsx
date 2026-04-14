import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from "recharts"
import { useMetrics } from '../../hooks/useMetrics'

function Metrics() {

  const { metrics } = useMetrics()
  


    if(metrics) {
      console.info(metrics,"metrics")
       return (
      <div>
      <LineChart width={400} height={400} data={metrics}>
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="cpu" stroke="#ff7300" />
      </LineChart>
    </div>
    ) } else { return '' }
  
}

export default Metrics
