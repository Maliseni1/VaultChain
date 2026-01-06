"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm p-8 md:p-16">
        
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-20">
          <h1 className="text-xl font-semibold text-gray-900">VaultChain</h1>

          <button 
          onClick={() => alert("Connect Wallet")}
          className="border border-gray-300 px-4 py-2 rounded-lg text-sm text-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200">
            Connect Wallet
          </button>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">
            Secure your passwords <br /> on the blockchain
          </h2>

          <p className="text-gray-700 mb-10 text-lg">
            Encrypted credentials stored decentralised. Only you control access.
          </p>

          <button
            onClick={() => alert("Connect Wallet")}
            className="bg-black text-white px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-gray-900/20 active:scale-95"
          >
            Connect Wallet
          </button>

          <p className="text-sm text-gray-400 mt-8">
            No emails • No central servers • Fully encrypted
          </p>
        </div>

      </div>
    </div>
  );
}
