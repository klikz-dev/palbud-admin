import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function Chart({ data }) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis yAxisId='right' orientation='right' />
        <Tooltip />
        <Legend />
        <Line
          yAxisId='right'
          type='monotone'
          dataKey='pv'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
        <Line yAxisId='right' type='monotone' dataKey='uv' stroke='#82ca9d' />
      </LineChart>
    </ResponsiveContainer>
  )
}
