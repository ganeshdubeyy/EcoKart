import React from 'react'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { LuPackageSearch } from 'react-icons/lu'
import { PiUsersThreeBold } from 'react-icons/pi'
import { MdCategory } from 'react-icons/md'
import { TbSum } from 'react-icons/tb'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'

const currency = (n)=> new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

const summary = {
  totalSales: 12893540,
  totalOrders: 48210,
  totalCustomers: 18642,
  topCategory: 'Vegetables',
  avgOrderValue: 534
}

const salesData = [
  { date: 'Aug 01', revenue: 320000 },
  { date: 'Aug 05', revenue: 410000 },
  { date: 'Aug 10', revenue: 380000 },
  { date: 'Aug 15', revenue: 520000 },
  { date: 'Aug 20', revenue: 610000 },
  { date: 'Aug 25', revenue: 570000 },
  { date: 'Aug 30', revenue: 690000 },
]

// Category-wise sales aligned with EcoKart website categories
const categorySales = [
  { name: 'Atta, Rice, etc.', value: 780000 },
  { name: 'Bakery & Biscuits', value: 480000 },
  { name: 'Breakfast & Instant Food', value: 360000 },
  { name: 'Dairy', value: 620000 },
  { name: 'Fruits', value: 820000 },
  { name: 'Masala, Oil & more', value: 390000 },
  { name: 'Snacks', value: 450000 },
  { name: 'Sweet Tooth', value: 270000 },
  { name: 'Tea, Coffee & Drinks', value: 560000 },
  { name: 'Vegetables', value: 740000 },
]

// You can paste any HTTPS image URL into the image field below
const topProducts = [
  { id: 'EK-001', name: 'Amul Taaza 1L', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/5734b087-3ad9-485f-bbe2-52079cd9e35d.png', units: 1240, revenue: 496000 },
  { id: 'EK-002', name: 'Aashirvaad Atta 10kg', image: 'https://m.media-amazon.com/images/I/51vCf15JkyL.jpg', units: 860, revenue: 602000 },
  { id: 'EK-003', name: 'Maggi 12-pack', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/552b96c3-d2de-42ec-acc2-d41b8cde518c.png', units: 1720, revenue: 309600 },
  { id: 'EK-004', name: 'Fortune Sunlite Oil 5L', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/94dcff3a-8441-4251-a8e4-985a25a5c301.png', units: 540, revenue: 799500 },
  { id: 'EK-005', name: 'Sugar 5kg', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/e24164fa-4851-46a4-995f-2a3c540c63ec.png', units: 950, revenue: 427500 },
  { id: 'EK-006', name: 'Banana (Dozen)', image: 'https://www.shutterstock.com/image-photo/bunch-bananas-isolated-on-white-600nw-1722111529.jpg', units: 2200, revenue: 154000 },
]

const buyersByCity = [
  { city: 'Mumbai', buyers: 5200 },
  { city: 'Delhi', buyers: 4700 },
  { city: 'Bangalore', buyers: 4300 },
  { city: 'Hyderabad', buyers: 3500 },
  { city: 'Chennai', buyers: 3300 },
  { city: 'Pune', buyers: 2800 },
]

const buyersByAge = [
  { name: '18–25', value: 28 },
  { name: '26–35', value: 42 },
  { name: '36–50', value: 22 },
  { name: '50+', value: 8 },
]

const recentOrders = [
  { id: 'ORD-9A31', customer: 'Ankit Sharma', category: 'Dairy', amount: 1299, date: '2025-09-22' },
  { id: 'ORD-9A2F', customer: 'Priya Verma', category: 'Fruits', amount: 899, date: '2025-09-22' },
  { id: 'ORD-9A1C', customer: 'Ravi Kumar', category: 'Snacks', amount: 645, date: '2025-09-21' },
  { id: 'ORD-99FE', customer: 'Neha Singh', category: 'Vegetables', amount: 499, date: '2025-09-21' },
  { id: 'ORD-99D2', customer: 'Aarav Patel', category: 'Bakery & Biscuits', amount: 749, date: '2025-09-20' },
  { id: 'ORD-99B1', customer: 'Isha Gupta', category: 'Tea, Coffee & Drinks', amount: 1199, date: '2025-09-20' },
]

const COLORS = ['#16a34a', '#22c55e', '#84cc16', '#65a30d', '#15803d', '#4d7c0f', '#166534', '#059669', '#14b8a6', '#0ea5e9']

const Card = ({ icon, label, value, hint }) => (
  <div className='bg-white rounded-lg shadow-sm border border-green-100 p-4 hover:shadow-md transition-shadow cursor-default'>
    <div className='flex items-center gap-3'>
      <div className='text-green-700'>
        {icon}
      </div>
      <div>
        <p className='text-sm text-gray-500'>{label}</p>
        <p className='text-xl font-semibold text-gray-800'>{value}</p>
        {hint && <p className='text-xs text-gray-400 mt-1'>{hint}</p>}
      </div>
    </div>
  </div>
)

const Dashboard = () => {
  return (
    <section className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold text-green-800 mb-4'>EcoKart Dashboard</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
        <Card icon={<FaIndianRupeeSign size={28}/>} label='Total Sales' value={currency(summary.totalSales)} />
        <Card icon={<LuPackageSearch size={28}/>} label='Total Orders' value={summary.totalOrders.toLocaleString('en-IN')} />
        <Card icon={<PiUsersThreeBold size={28}/>} label='Total Customers' value={summary.totalCustomers.toLocaleString('en-IN')} />
        <Card icon={<MdCategory size={28}/>} label='Top-selling Category' value={summary.topCategory} />
        <Card icon={<TbSum size={28}/>} label='Average Order Value' value={currency(summary.avgOrderValue)} />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6'>
        <div className='bg-white rounded-lg shadow-sm border border-green-100 p-4 lg:col-span-2'>
          <h2 className='font-semibold text-gray-700 mb-3'>Sales Overview</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis tickFormatter={(v)=>`₹${(v/1000).toFixed(0)}k`} />
                <ReTooltip formatter={(v)=>currency(v)} />
                <Legend />
                <Line type='monotone' dataKey='revenue' name='Revenue' stroke='#16a34a' strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-green-100 p-4'>
          <h2 className='font-semibold text-gray-700 mb-3'>Category-wise Sales</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={categorySales}
                  dataKey='value'
                  nameKey='name'
                  innerRadius={45}
                  outerRadius={90}
                  paddingAngle={2}
                  labelLine={false}
                  label={({ percent }) => percent > 0.07 ? `${Math.round(percent * 100)}%` : ''}
                >
                  {categorySales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip formatter={(v, n)=>[currency(v), n]} />
                <Legend verticalAlign='bottom' layout='horizontal' wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6'>
        <div className='bg-white rounded-lg shadow-sm border border-green-100 p-4'>
          <h2 className='font-semibold text-gray-700 mb-3'>Customer Insights - Top Cities</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={buyersByCity}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='city' />
                <YAxis />
                <ReTooltip />
                <Legend />
                <Bar dataKey='buyers' name='Buyers' fill='#22c55e' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-green-100 p-4 lg:col-span-2'>
          <h2 className='font-semibold text-gray-700 mb-3'>Customer Insights - Age Groups</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie data={buyersByAge} dataKey='value' nameKey='name' innerRadius={50} outerRadius={80} label={(e)=>`${e.name} (${e.value}%)`}>
                  {buyersByAge.map((entry, index) => (
                    <Cell key={`age-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip formatter={(v, n)=>[`${v}%`, n]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-green-100 p-4 mt-6'>
        <h2 className='font-semibold text-gray-700 mb-3'>Top Selling Products</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-left'>
            <thead>
              <tr className='text-gray-600 text-sm'>
                <th className='py-2'>Product</th>
                <th className='py-2'>Units Sold</th>
                <th className='py-2'>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map(p => (
                <tr key={p.id} className='border-t border-gray-100 hover:bg-green-50/40'>
                  <td className='py-2 flex items-center gap-3'>
                    <img
                      src={p.image}
                      alt={p.name}
                      className='w-10 h-10 rounded object-cover border'
                      referrerPolicy='no-referrer'
                      onError={(e)=>{ e.currentTarget.src = 'https://via.placeholder.com/40?text=Img'; }}
                    />
                    <span className='font-medium text-gray-800'>{p.name}</span>
                  </td>
                  <td className='py-2'>{p.units.toLocaleString('en-IN')}</td>
                  <td className='py-2'>{currency(p.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-green-100 p-4 mt-6'>
        <h2 className='font-semibold text-gray-700 mb-3'>Recent Orders</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-left'>
            <thead>
              <tr className='text-gray-600 text-sm'>
                <th className='py-2'>Order ID</th>
                <th className='py-2'>Customer</th>
                <th className='py-2'>Category</th>
                <th className='py-2'>Amount</th>
                <th className='py-2'>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o.id} className='border-t border-gray-100 hover:bg-green-50/40'>
                  <td className='py-2'>{o.id}</td>
                  <td className='py-2'>{o.customer}</td>
                  <td className='py-2'>{o.category}</td>
                  <td className='py-2'>{currency(o.amount)}</td>
                  <td className='py-2'>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Dashboard



