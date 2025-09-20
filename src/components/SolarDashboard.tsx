import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Sun, 
  Zap, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Wallet, 
  Settings,
  BarChart3,
  Leaf,
  Globe
} from "lucide-react";
import heroImage from "@/assets/solar-hero.jpg";
import { ThemeToggle } from "./ThemeToggle";
import { MetricDetailModal } from "./MetricDetailModal";
import { WalletDialog } from "./WalletDialog";
import { Toaster } from "@/components/ui/toaster";

const SolarDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [modalType, setModalType] = useState<'energy' | 'revenue' | 'tokens' | null>(null);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  // Mock data for demo
  const metrics = {
    totalEnergyGenerated: 45680,
    revenuePool: 12450,
    communityTokens: 8950,
    members: 127,
    dailySavings: 340,
    efficiency: 94
  };

  const communityMembers = [
    { name: "Anita Chen", wallet: "0x4a...f92", tokens: 450, share: 4.5, revenue: 1200 },
    { name: "Marcus Rodriguez", wallet: "0x8b...d14", tokens: 320, share: 3.2, revenue: 890 },
    { name: "Sarah Johnson", wallet: "0x2c...a56", tokens: 680, share: 6.8, revenue: 1850 },
    { name: "David Kim", wallet: "0x5f...b78", tokens: 290, share: 2.9, revenue: 760 }
  ];

  return (
    <div className="min-h-screen sky-gradient">
      {/* Header */}
      <header className="glass-card border-0 mx-6 mt-6 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink rounded-lg">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Community Solar</h1>
              <p className="text-sm text-muted-foreground">Local Solar Ownership Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge 
              variant="secondary" 
              className="px-3 py-1 cursor-pointer hover:bg-secondary/80 smooth-transition"
              onClick={() => setIsWalletOpen(true)}
            >
              <Wallet className="h-3 w-3 mr-1" />
              0x4a...D9f
            </Badge>
            <ThemeToggle />
            <Button size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex gap-6 p-6">
        {/* Sidebar */}
        <aside className="w-64 space-y-2">
          <div className="glass-card p-4">
            <nav className="space-y-1">
              {[
                { icon: BarChart3, label: "Dashboard", active: true },
                { icon: DollarSign, label: "Revenue Distribution" },
                { icon: Zap, label: "Energy Savings" },
                { icon: Users, label: "Community Members" },
                { icon: Globe, label: "Smart Contracts" },
                { icon: Settings, label: "Settings" }
              ].map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left smooth-transition ${
                    item.active 
                      ? "bg-pink text-white" 
                      : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Hero Section */}
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <img 
              src={heroImage} 
              alt="Community Solar Installation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent">
              <div className="p-8 h-full flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-primary-foreground mb-2">
                  Powering Communities Together
                </h2>
                <p className="text-primary-foreground/90 text-lg mb-4">
                  Transparent, blockchain-verified solar energy sharing
                </p>
                <div className="flex gap-3">
                  <Button>
                    <Leaf className="h-4 w-4 mr-2" />
                    View Impact
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="metric-card border-0 cursor-pointer hover:scale-105 smooth-transition"
              onClick={() => setModalType('energy')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-primary animate-solar-pulse" />
                  Total Energy Generated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1 animate-counter-up">
                  {metrics.totalEnergyGenerated.toLocaleString()} kWh
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  +12% from last month
                </div>
              </CardContent>
            </Card>

            <Card 
              className="metric-card border-0 cursor-pointer hover:scale-105 smooth-transition"
              onClick={() => setModalType('revenue')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-primary animate-solar-pulse" />
                  Revenue Pool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1 animate-counter-up">
                  ${metrics.revenuePool.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  +8% from last month
                </div>
              </CardContent>
            </Card>

            <Card 
              className="metric-card border-0 cursor-pointer hover:scale-105 smooth-transition"
              onClick={() => setModalType('tokens')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary animate-solar-pulse" />
                  Community Tokens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1 animate-counter-up">
                  {metrics.communityTokens.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-3 w-3 text-primary" />
                  {metrics.members} active members
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Energy Generation Chart */}
          <Card className="glass-card border-0 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">Energy Generation</h3>
                <p className="text-muted-foreground">Daily solar energy production and savings</p>
              </div>
              <div className="flex gap-2">
                {["7d", "30d", "1y"].map((period) => (
                  <Button
                    key={period}
                    variant={selectedTimeframe === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Daily Output</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">2,340 kWh</div>
                  <Progress value={94} className="mt-2" />
                  <span className="text-xs text-muted-foreground">94% efficiency</span>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Daily Savings</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">${metrics.dailySavings}</div>
                  <Progress value={78} className="mt-2" />
                  <span className="text-xs text-muted-foreground">Above average</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Community Members Table */}
          <Card className="glass-card border-0 p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-1">Community Members</h3>
              <p className="text-muted-foreground">Transparent revenue distribution and ownership</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Member</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Wallet</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Tokens</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Share</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {communityMembers.map((member, index) => (
                    <tr key={index} className="border-b border-border/50 smooth-transition hover:bg-secondary/30">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-pink rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {member.wallet}
                        </Badge>
                      </td>
                      <td className="py-4 px-2 font-semibold text-foreground">{member.tokens}</td>
                      <td className="py-4 px-2 text-foreground">{member.share}%</td>
                      <td className="py-4 px-2">
                        <span className="font-semibold text-green-600">${member.revenue}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>

      {/* Footer */}
      <footer className="glass-card border-0 mx-6 mb-6 px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>Powered by Avalanche + Web3</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Leaf className="h-4 w-4 text-green-600" />
            <span>Transparent, Community-Owned Energy</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MetricDetailModal 
        isOpen={modalType !== null} 
        onClose={() => setModalType(null)} 
        type={modalType!} 
      />
      <WalletDialog 
        isOpen={isWalletOpen} 
        onClose={() => setIsWalletOpen(false)} 
      />
      <Toaster />
    </div>
  );
};

export default SolarDashboard;