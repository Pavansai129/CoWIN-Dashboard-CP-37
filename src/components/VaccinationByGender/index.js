import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
// Write your code here
const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <div>
      <PieChart width={730} height={250}>
        <Pie
          cx="70%"
          cy="40%"
          data={vaccinationByGender}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#fecba6" />
          <Cell name="Female" fill="#b3d23f" />
          <Cell name="Others" fill="#a44c9e" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
