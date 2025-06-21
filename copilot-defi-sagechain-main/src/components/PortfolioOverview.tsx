import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Wallet, DollarSign, PieChart, AlertTriangle } from "lucide-react";
import { WalletData } from "./WalletConnector";
import AssetAllocationChart from "./AssetAllocationChart";
import AssetTracking from "./portfolio/AssetTracking";
import PerformanceMetrics from "./portfolio/PerformanceMetrics";
import TransactionHistory from "./portfolio/TransactionHistory";
import InvestmentPositions from "./portfolio/InvestmentPositions";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useEffect, useState } from "react";

interface PortfolioOverviewProps {
  isConnected: boolean;
  walletData?: WalletData | null;
}

const PortfolioOverview = ({ isConnected, walletData }: PortfolioOverviewProps) => {
  const { totalValue, dailyChange, changePercent, assets, loading } = usePortfolioData(walletData);

  const getActiveChains = () => {
    if (!isConnected || totalValue === 0) return 0;
    return 1; // Ethereum when wallet has value
  };

  const getActivePositions = () => {
    if (!isConnected || totalValue === 0) return 0;
    return totalValue > 0 ? 1 : 0;
  };

  if (!isConnected) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-xl">
          <CardHeader className="text-center py-12">
            <Wallet className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <CardTitle className="text-white text-xl">Connect Your Wallet</CardTitle>
            <CardDescription className="text-purple-300">
              Connect your wallet to view your real-time portfolio and blockchain data
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wallet Info Header */}
      {walletData && (
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Connected Wallet (Real-Time)</p>
                <p className="text-white font-mono">{walletData.address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-300">Live Balance</p>
                <p className="text-white font-medium">{walletData.balance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Real-time Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardDescription className="text-purple-300">Total Portfolio Value (Real-Time)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">
                  ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div className={`flex items-center text-sm ${changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalValue === 0 ? (
                    <span className="text-gray-400">Empty Wallet</span>
                  ) : (
                    <>
                      {changePercent >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      {`${changePercent >= 0 ? '+' : ''}$${Math.abs(dailyChange).toFixed(2)} (${Math.abs(changePercent).toFixed(1)}%)`}
                    </>
                  )}
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardDescription className="text-purple-300">Active Chains (Real-Time)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{getActiveChains()}</div>
                <div className="text-sm text-purple-300">Networks Connected</div>
              </div>
              <div className="flex flex-col space-y-1">
                {getActiveChains() > 0 && (
                  <Badge variant="secondary" className="bg-purple-900/30 text-purple-300 text-xs">Ethereum</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardDescription className="text-purple-300">Token Holdings (Real-Time)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{getActivePositions()}</div>
                <div className="text-sm text-purple-300">Active Tokens</div>
              </div>
              <PieChart className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Asset Tracking */}
      <AssetTracking isConnected={isConnected} walletData={walletData} assets={assets} loading={loading} />

      {/* Asset Allocation Chart */}
      <AssetAllocationChart walletData={walletData} isConnected={isConnected} assets={assets} />

      {/* Real-time Performance Metrics */}
      <PerformanceMetrics isConnected={isConnected} walletData={walletData} />

      {/* Transaction History */}
      <TransactionHistory isConnected={isConnected} walletData={walletData} />

      {/* Investment Positions */}
      <InvestmentPositions isConnected={isConnected} walletData={walletData} />

      {/* Real-time Risk Alerts */}
      <Card className="bg-black/40 border-orange-800/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Real-Time Risk Alerts
          </CardTitle>
          <CardDescription className="text-orange-300">Live portfolio risk monitoring from connected MetaMask wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {totalValue === 0 ? (
              <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                <div className="flex items-center space-x-3">
                  <Wallet className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-white text-sm font-medium">Empty Wallet Detected</div>
                    <div className="text-blue-300 text-xs">No ETH balance found in connected MetaMask wallet</div>
                  </div>
                </div>
                <Badge variant="outline" className="border-blue-600 text-blue-300">
                  Live
                </Badge>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-white text-sm font-medium">Live MetaMask Data Active</div>
                    <div className="text-blue-300 text-xs">Portfolio values updating from connected MetaMask wallet</div>
                  </div>
                </div>
                <Badge variant="outline" className="border-blue-600 text-blue-300">
                  Live
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioOverview;
