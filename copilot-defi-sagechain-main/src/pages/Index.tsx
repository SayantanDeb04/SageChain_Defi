import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Brain, TrendingUp, Shield, Zap, BookOpen, Settings, BarChart3, MessageSquare, ArrowLeft, Bell, ArrowUpDown, DollarSign } from "lucide-react";
import AIChat from "@/components/AIChat";
import PortfolioOverview from "@/components/PortfolioOverview";
import SimulationPanel from "@/components/SimulationPanel";
import WalletConnector, { WalletData } from "@/components/WalletConnector";
import Dashboard from "@/components/Dashboard";
import EducationHub from "@/components/EducationHub";
import SettingsPanel from "@/components/SettingsPanel";
import CryptoTrading from "@/components/CryptoTrading";
import BorrowingLending from "@/components/BorrowingLending";

const Index = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleWalletConnect = (data: WalletData) => {
    console.log('Wallet connected:', data);
    setWalletData(data);
  };

  const handleWalletDisconnect = () => {
    console.log('Wallet disconnected in Index');
    setWalletData(null);
  };

  // The connection status is now derived directly from walletData
  const isWalletConnected = !!walletData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/819d1bc0-5b06-442d-ad39-cd9dedeee874.png" 
                    alt="SageChain Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">SageChain</h1>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-purple-300 hover:text-white relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">2</span>
                </div>
              </Button>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Multi-Chain
              </Badge>
              <WalletConnector 
                isConnected={isWalletConnected} 
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-6">
            <div className="bg-black/20 backdrop-blur-xl rounded-lg p-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap gap-2">
                {[
                  { id: 'aichat', label: 'AI Chat', icon: MessageSquare },
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'trading', label: 'Trading', icon: ArrowUpDown },
                  { id: 'borrowing', label: 'Lending', icon: DollarSign },
                  { id: 'simulate', label: 'Simulation', icon: Zap },
                  { id: 'portfolio', label: 'Portfolio', icon: TrendingUp },
                  { id: 'education', label: 'Education', icon: BookOpen },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-md transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                        : 'text-purple-300 hover:text-white hover:bg-purple-800/30'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Full Width AI Chat Mode */}
        {activeTab === 'aichat' ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab('dashboard')}
                className="text-purple-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <Card className="bg-black/40 border-purple-800/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  AI Chat Assistant - Full Mode
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Full-screen AI assistant for detailed DeFi insights and trading recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIChat />
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Regular Layout with Sidebar */
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {activeTab === 'dashboard' && <Dashboard isConnected={isWalletConnected} walletData={walletData} />}
              {activeTab === 'portfolio' && <PortfolioOverview isConnected={isWalletConnected} walletData={walletData} />}
              {activeTab === 'trading' && <CryptoTrading walletData={walletData} />}
              {activeTab === 'borrowing' && <BorrowingLending />}
              {activeTab === 'simulate' && <SimulationPanel />}
              {activeTab === 'education' && <EducationHub />}
              {activeTab === 'settings' && <SettingsPanel />}
            </div>

            {/* AI Chat Sidebar */}
            <div className="xl:col-span-1 relative z-10 mt-4">
              <AIChat />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
