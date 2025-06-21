import { useEffect, useState } from "react";
import { ethers } from "ethers";
import LendingABI from "../abis/LendingProtocol.json";

const contractAddress = "0xYourDeployedContract"; // Update after deploy

export default function LendingBorrowing() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const load = async () => {
      const prov = new ethers.BrowserProvider(window.ethereum);
      await prov.send("eth_requestAccounts", []);
      const sig = await prov.getSigner();
      const lending = new ethers.Contract(contractAddress, LendingABI, sig);
      setProvider(prov);
      setSigner(sig);
      setContract(lending);
    };
    load();
  }, []);

  const toEth = (val: string) => ethers.parseEther(val);
  const toToken = (val: string) => ethers.parseUnits(val, 18);

  async function deposit() {
    if (!contract) return;
    const tx = await contract.deposit(toToken(amount));
    await tx.wait();
    setStatus("Deposited");
  }

  async function addCollateral() {
    if (!contract) return;
    const tx = await contract.addCollateral({ value: toEth(amount) });
    await tx.wait();
    setStatus("Collateral added");
  }

  async function borrow() {
    if (!contract) return;
    const tx = await contract.borrow(toToken(amount));
    await tx.wait();
    setStatus("Borrowed");
  }

  async function repay() {
    if (!contract) return;
    const tx = await contract.repay(toToken(amount));
    await tx.wait();
    setStatus("Repaid");
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Lending & Borrowing</h2>
      <input
        className="border px-2 py-1"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="space-x-2 mt-2">
        <button onClick={deposit} className="bg-green-600 text-white px-4 py-2 rounded">Deposit</button>
        <button onClick={addCollateral} className="bg-yellow-500 text-white px-4 py-2 rounded">Add Collateral</button>
        <button onClick={borrow} className="bg-blue-500 text-white px-4 py-2 rounded">Borrow</button>
        <button onClick={repay} className="bg-red-500 text-white px-4 py-2 rounded">Repay</button>
      </div>
      <p className="text-sm text-gray-500">{status}</p>
    </div>
  );
}
