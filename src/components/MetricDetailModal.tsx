import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Calendar, Zap, DollarSign, Users } from "lucide-react";

interface MetricDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'energy' | 'revenue' | 'tokens';
}

export function MetricDetailModal({ isOpen, onClose, type }: MetricDetailModalProps) {
  const [timeframe, setTimeframe] = useState("30d");

  const energyData = [
    { name: 'Week 1', energy: 2400, efficiency: 94 },
    { name: 'Week 2', energy: 2210, efficiency: 92 },
    { name: 'Week 3', energy: 2290, efficiency: 95 },
    { name: 'Week 4', energy: 2000, efficiency: 89 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 2400, expenses: 1800 },
    { name: 'Feb', revenue: 2210, expenses: 1600 },
    { name: 'Mar', revenue: 2290, expenses: 1700 },
    { name: 'Apr', revenue: 2180, expenses: 1650 },
  ];

  const tokenDistribution = [
    { name: 'Active Members', value: 85, color: '#FD105E' },
    { name: 'Reserved Pool', value: 15, color: '#474747' },
  ];

  const getModalContent = () => {
    switch (type) {
      case 'energy':
        return {
          title: 'Energy Generation Analytics',
          icon: <Zap className="h-6 w-6 text-primary" />,
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#FD105E" 
                  strokeWidth={3}
                  dot={{ fill: '#FD105E', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ),
          stats: [
            { label: 'Peak Generation', value: '2,400 kWh', trend: '+12%' },
            { label: 'Average Efficiency', value: '92.5%', trend: '+3%' },
            { label: 'Carbon Offset', value: '1.2 tons', trend: '+15%' },
          ]
        };
      
      case 'revenue':
        return {
          title: 'Revenue Pool Analytics',
          icon: <DollarSign className="h-6 w-6 text-primary" />,
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="revenue" fill="#FD105E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#474747" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ),
          stats: [
            { label: 'Total Revenue', value: '$12,450', trend: '+8%' },
            { label: 'Operating Costs', value: '$6,750', trend: '-2%' },
            { label: 'Net Profit', value: '$5,700', trend: '+18%' },
          ]
        };
      
      case 'tokens':
        return {
          title: 'Community Token Distribution',
          icon: <Users className="h-6 w-6 text-primary" />,
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tokenDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {tokenDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ),
          stats: [
            { label: 'Active Members', value: '127', trend: '+5%' },
            { label: 'Token Holders', value: '95', trend: '+12%' },
            { label: 'Avg. Holding', value: '94 tokens', trend: '+3%' },
          ]
        };
      
      default:
        return null;
    }
  };

  const content = getModalContent();
  if (!content) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            {content.icon}
            {content.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Time period selector */}
          <div className="flex gap-2">
            {["7d", "30d", "1y"].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(period)}
              >
                {period}
              </Button>
            ))}
          </div>

          {/* Chart */}
          <div className="glass-card p-6">
            {content.chart}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.stats.map((stat, index) => (
              <div key={index} className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}